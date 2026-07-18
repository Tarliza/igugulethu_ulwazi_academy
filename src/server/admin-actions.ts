import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase Admin client securely
// This bypasses normal security policies, so it MUST ONLY run on the server
const getAdminClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceKey) throw new Error("Missing Supabase Service Role Key");
  
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export async function activateStudent(registrationId: string) {
  try {
    const adminClient = getAdminClient();

    // Fetch the pending registration details
    const { data: reg, error: fetchError } = await adminClient
      .from('pending_registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (fetchError || !reg) throw new Error("Registration not found");
    if (reg.status === 'activated') throw new Error("Student is already activated");

    // 1. Generate ID & Password
    const year = new Date().getFullYear(); // e.g., 2026
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    const studentNumber = `RA-${year}-${randomNum}`;
    
    // Secure 16-character random password
    const password = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // 2. Create Auth User
    const dummyEmail = `${studentNumber.toLowerCase()}@student.igugulethu.local`;
    const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
      email: dummyEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        first_name: reg.first_name,
        last_name: reg.last_name,
      }
    });

    if (authError) throw authError;
    const userId = authUser.user.id;

    // 3. Assign Role
    const { error: roleError } = await adminClient.from('user_roles').insert({
      user_id: userId,
      role: 'student'
    });
    if (roleError) throw roleError;

    // 4. Create Student Record
    const { error: studentError } = await adminClient.from('students').insert({
      user_id: userId,
      student_number: studentNumber,
      grade: reg.grade,
      school: reg.school,
      plan: reg.plan,
      subjects: reg.subjects
    });
    if (studentError) throw studentError;

    // 5. Mark as Active
    const { error: updateError } = await adminClient.from('pending_registrations').update({
      status: 'activated',
      activated_at: new Date().toISOString()
    }).eq('id', registrationId);
    if (updateError) throw updateError;

    // 6. Send the Physical Email
    const resendKey = import.meta.env.VITE_RESEND_API_KEY;
    if (resendKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Igugulethu Academy <onboarding@resend.dev>',
          to: reg.email,
          subject: 'Your Igugulethu Ulwazi Academy Login Credentials',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a2b4b;">
              <h2 style="color: #d97706;">Welcome to Igugulethu Ulwazi Academy!</h2>
              <p>Hi ${reg.first_name},</p>
              <p>Your registration has been approved and your student profile is now active. You can now access your learning materials.</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Student Number:</strong> ${studentNumber}</p>
                <p style="margin: 0;"><strong>Temporary Password:</strong> ${password}</p>
              </div>
              <p>Please log in using your Student Number at our portal. <em>Remember to change your password after your first login!</em></p>
              <br/>
              <p>Best regards,<br/><strong>The Academy Team</strong></p>
            </div>
          `
        })
      });

      if (!emailResponse.ok) {
        console.error("Failed to send email via Resend:", await emailResponse.text());
      }
    }

    // Success! Return the credentials so the UI can show them too
    return { 
      success: true, 
      studentNumber, 
      password, 
      originalEmail: reg.email 
    };

  } catch (error) {
    console.error("Activation failed:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendPaymentReminders(
  recipients: { email: string; name: string; amount: string }[],
  messageTemplate: string,
) {
  try {
    const resendKey = import.meta.env.VITE_RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
    if (!resendKey) throw new Error("Missing Resend API Key");

    for (const student of recipients) {
      const personalizedMessage = messageTemplate
        .replace("{name}", student.name)
        .replace("{amount}", student.amount);

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Igugulethu Academy <onboarding@resend.dev>",
          to: student.email,
          subject: "Payment Reminder - Igugulethu Ulwazi Academy",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a2b4b;">
              <h2 style="color: #d97706;">Account Update</h2>
              <p style="line-height: 1.6;">${personalizedMessage.replace(/\n/g, "<br/>")}</p>
              <br/>
              <p>Best regards,<br/><strong>The Academy Team</strong></p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error(`Failed to send to ${student.email}:`, await emailResponse.text());
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Reminder error:", error);
    return { success: false, error: String(error) };
  }
}