import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-actions-Dr_S6PX-.js
var getAdminClient = () => {
	const supabaseUrl = "https://llweafdoytodapywjadk.supabase.co";
	const serviceKey = processModule.env.SUPABASE_SERVICE_ROLE_KEY || void 0;
	if (!serviceKey) throw new Error("Missing Supabase Service Role Key");
	return createClient(supabaseUrl, serviceKey, { auth: {
		autoRefreshToken: false,
		persistSession: false
	} });
};
async function activateStudent(registrationId) {
	try {
		const adminClient = getAdminClient();
		const { data: reg, error: fetchError } = await adminClient.from("pending_registrations").select("*").eq("id", registrationId).single();
		if (fetchError || !reg) throw new Error("Registration not found");
		if (reg.status === "activated") throw new Error("Student is already activated");
		const studentNumber = `RA-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
		const password = Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8))).map((b) => b.toString(16).padStart(2, "0")).join("");
		const dummyEmail = `${studentNumber.toLowerCase()}@student.igugulethu.local`;
		const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
			email: dummyEmail,
			password,
			email_confirm: true,
			user_metadata: {
				first_name: reg.first_name,
				last_name: reg.last_name
			}
		});
		if (authError) throw authError;
		const userId = authUser.user.id;
		const { error: roleError } = await adminClient.from("user_roles").insert({
			user_id: userId,
			role: "student"
		});
		if (roleError) throw roleError;
		const { error: studentError } = await adminClient.from("students").insert({
			user_id: userId,
			student_number: studentNumber,
			grade: reg.grade,
			school: reg.school,
			plan: reg.plan,
			subjects: reg.subjects
		});
		if (studentError) throw studentError;
		const { error: updateError } = await adminClient.from("pending_registrations").update({
			status: "activated",
			activated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", registrationId);
		if (updateError) throw updateError;
		const resendKey = "re_8VSSmhGc_MwaLXbNw7bafXK2Tnv6Ft5Ek";
		{
			const emailResponse = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${resendKey}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					from: "Igugulethu Academy <onboarding@resend.dev>",
					to: reg.email,
					subject: "Your Igugulethu Ulwazi Academy Login Credentials",
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
			if (!emailResponse.ok) console.error("Failed to send email via Resend:", await emailResponse.text());
		}
		return {
			success: true,
			studentNumber,
			password,
			originalEmail: reg.email
		};
	} catch (error) {
		console.error("Activation failed:", error);
		return {
			success: false,
			error: String(error)
		};
	}
}
async function sendPaymentReminders(recipients, messageTemplate) {
	try {
		const resendKey = "re_8VSSmhGc_MwaLXbNw7bafXK2Tnv6Ft5Ek";
		for (const student of recipients) {
			const personalizedMessage = messageTemplate.replace("{name}", student.name).replace("{amount}", student.amount);
			const emailResponse = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${resendKey}`,
					"Content-Type": "application/json"
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
          `
				})
			});
			if (!emailResponse.ok) console.error(`Failed to send to ${student.email}:`, await emailResponse.text());
		}
		return { success: true };
	} catch (error) {
		console.error("Reminder error:", error);
		return {
			success: false,
			error: String(error)
		};
	}
}
//#endregion
export { activateStudent, sendPaymentReminders };
