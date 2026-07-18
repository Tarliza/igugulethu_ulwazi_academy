import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Users,
  CreditCard,
  BookOpen,
  Clock,
  UserPlus,
  Upload,
  Bell,
  Receipt,
  MessageSquare,
  CalendarClock,
  ArrowRight,
  Send,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/client";

const activateStudentAccount = createServerFn({ method: "POST" })
  .validator(z.object({ registrationId: z.string() }))
  .handler(async ({ data }) => {
    const { activateStudent } = await import("@/server/admin-actions");
    return activateStudent(data.registrationId);
  });

const sendReminderEmails = createServerFn({ method: "POST" })
  .validator(
    z.object({
      recipients: z.array(
        z.object({ email: z.string(), name: z.string(), amount: z.string() }),
      ),
      messageTemplate: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { sendPaymentReminders } = await import("@/server/admin-actions");
    return sendPaymentReminders(data.recipients, data.messageTemplate);
  });

export const Route = createFileRoute("/staff/")({
  component: StaffDashboard,
});

type OverdueStudent = {
  id: string;
  name: string;
  email: string;
  plan: string;
  amount: string;
  daysOverdue: number;
};

// Replace with Supabase query for students with outstanding subscriptions.
const overdueStudents: OverdueStudent[] = [
  {
    id: "test-1",
    name: "Gabriel Moiane",
    email: "moiane158@gmail.com",
    plan: "Grade 12 Premium",
    amount: "ZAR 450",
    daysOverdue: 3,
  },
];

type FeedItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
};

// Replace with Supabase queries once data flows in.
const proofOfPayments: FeedItem[] = [];
const newMessages: FeedItem[] = [];
const bookingRequests: FeedItem[] = [];

function StaffDashboard() {
  const [reminderOpen, setReminderOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [stats, setStats] = useState({ totalStudents: 0, pendingRegs: 0 });
  const [pendingFeed, setPendingFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const { count: studentCount } = await supabase
          .from("students")
          .select("*", { count: "exact", head: true });

        const { count: pendingCount, data: pendingData } = await supabase
          .from("pending_registrations")
          .select("*", { count: "exact" })
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(3);

        setStats({
          totalStudents: studentCount || 0,
          pendingRegs: pendingCount || 0,
        });

        if (pendingData) {
          setPendingFeed(
            pendingData.map((reg: any) => ({
              id: reg.id,
              title: `${reg.first_name} ${reg.last_name}`,
              subtitle: reg.email,
              time: new Date(reg.created_at || reg.submitted_at || Date.now()).toLocaleDateString(),
            })),
          );
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    }

    void fetchDashboardStats();
  }, []);

  const dynamicKpis = [
    {
      label: "Total Enrolled Learners",
      value: stats.totalStudents.toString(),
      meta: stats.totalStudents === 1 ? "1 active student" : `${stats.totalStudents} active students`,
      icon: Users,
      tone: "navy" as const,
    },
    {
      label: "Pending Registrations",
      value: stats.pendingRegs.toString(),
      meta: stats.pendingRegs === 1 ? "1 waiting for activation" : `${stats.pendingRegs} waiting for activation`,
      icon: Clock,
      tone: "amber" as const,
    },
    { label: "Outstanding Payments", value: "ZAR 0", meta: "Module coming soon", icon: CreditCard, tone: "amber" as const },
    { label: "Active Resources", value: "0", meta: "Module coming soon", icon: BookOpen, tone: "navy" as const },
  ];

  return (
    <div className="space-y-6">
      <PaymentReminderDialog open={reminderOpen} onOpenChange={setReminderOpen} />
      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dynamicKpis.map((k) => (
          <div
            key={k.label}
            className={`relative overflow-hidden rounded-3xl bg-card p-6 shadow-card ${
              k.tone === "navy" ? "border-l-4 border-brand-navy" : "border-l-4 border-brand-amber"
            }`}
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-2xl ${
                k.tone === "navy" ? "bg-brand-navy text-white" : "bg-brand-amber text-brand-navy"
              }`}
            >
              <k.icon className="h-5 w-5" />
            </div>
            <div className="mt-6 text-sm text-muted-foreground">{k.label}</div>
            <div className="mt-1 font-display text-3xl font-extrabold text-brand-navy">
              {k.value}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{k.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-lg font-extrabold text-brand-navy">Recent Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Proof of payments, new student messages, and booking requests will appear here as they come in.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <ActivityFeed
              icon={UserPlus}
              title="Pending Registrations"
              emptyText="No pending registrations right now."
              linkTo="/staff/verifications"
              linkLabel="Review all"
              items={pendingFeed}
            />
            <ActivityFeed
              icon={MessageSquare}
              title="New Messages"
              emptyText="No new messages from students."
              linkTo="/staff/messages"
              linkLabel="Open inbox"
              items={newMessages}
            />
            <ActivityFeed
              icon={CalendarClock}
              title="Booking Requests"
              emptyText="No pending booking requests."
              linkTo="/staff/bookings"
              linkLabel="View calendar"
              items={bookingRequests}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-extrabold text-brand-navy">Quick Actions</h2>
          <div className="mt-4 space-y-2.5">
            <button
              onClick={() => setAddStudentOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-brand-navy transition hover:bg-muted"
            >
              <UserPlus className="h-4 w-4" /> Add New Student
              <span className="ml-auto text-[10px] font-normal uppercase text-muted-foreground">
                emails credentials
              </span>
            </button>
            <Link
              to="/staff/resources"
              className="flex w-full items-center gap-3 rounded-xl bg-brand-amber-soft px-4 py-3 text-sm font-medium text-brand-navy transition hover:brightness-95"
            >
              <Upload className="h-4 w-4" /> Upload Resource
            </Link>
            <button
              onClick={() => setReminderOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-brand-navy transition hover:bg-muted"
            >
              <Bell className="h-4 w-4" /> Send Payment Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityFeed({
  icon: Icon,
  title,
  emptyText,
  linkTo,
  linkLabel,
  items,
}: {
  icon: typeof Receipt;
  title: string;
  emptyText: string;
  linkTo: string;
  linkLabel: string;
  items: FeedItem[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-brand-cream/40 p-4">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-amber-soft text-brand-navy">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-sm font-semibold text-brand-navy">{title}</div>
      </div>

      <div className="mt-3 flex-1">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">{emptyText}</p>
        ) : (
          <ul className="space-y-2">
            {items.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-border bg-background px-3 py-2 text-xs"
              >
                <div className="font-medium text-brand-navy">{item.title}</div>
                <div className="text-muted-foreground">{item.subtitle}</div>
                <div className="mt-0.5 text-[10px] uppercase text-muted-foreground">{item.time}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to={linkTo}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:underline"
      >
        {linkLabel} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function PaymentReminderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [channels, setChannels] = useState<{ email: boolean; sms: boolean }>({
    email: true,
    sms: false,
  });
  const [message, setMessage] = useState(
    "Hi {name}, this is a friendly reminder that your Igugulethu Ulwazi Academy subscription payment of {amount} is overdue. Please upload your proof of payment via the student portal. Thank you!",
  );
  const [sending, setSending] = useState(false);

  const allSelected =
    overdueStudents.length > 0 && selected.length === overdueStudents.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : overdueStudents.map((s) => s.id));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSend = async () => {
    if (selected.length === 0) {
      toast.error("Select at least one student to remind.");
      return;
    }
    if (!channels.email && !channels.sms) {
      toast.error("Choose at least one channel (email or SMS).");
      return;
    }

    setSending(true);

    try {
      const recipients = overdueStudents
        .filter((student) => selected.includes(student.id))
        .map((student) => ({ email: student.email, name: student.name, amount: student.amount }));

      if (channels.email) {
        const result = await sendReminderEmails({
          data: { recipients, messageTemplate: message },
        });

        if (!result.success) throw new Error(result.error);
      }

      if (channels.sms) {
        console.log("SMS feature coming soon");
      }

      toast.success(
        `Reminder sent successfully to ${selected.length} student${selected.length === 1 ? "" : "s"}.`,
      );
      onOpenChange(false);
      setSelected([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reminders. Check console.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-brand-navy">
            Send Payment Reminders
          </DialogTitle>
          <DialogDescription>
            Notify students with outstanding subscription payments. Personalise the
            message with <code>{"{name}"}</code> and <code>{"{amount}"}</code>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-sm font-semibold text-brand-navy">
                Students with outstanding payments
              </Label>
              {overdueStudents.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-xs font-medium text-brand-navy hover:underline"
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </button>
              )}
            </div>

            <div className="max-h-56 overflow-y-auto rounded-xl border border-border bg-background">
              {overdueStudents.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No students currently have outstanding payments. Reminders will
                  appear here as subscriptions become overdue.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {overdueStudents.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm"
                    >
                      <Checkbox
                        checked={selected.includes(s.id)}
                        onCheckedChange={() => toggleOne(s.id)}
                        id={`stu-${s.id}`}
                      />
                      <label
                        htmlFor={`stu-${s.id}`}
                        className="flex flex-1 cursor-pointer items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-medium text-brand-navy">{s.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {s.plan} • {s.email}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-brand-navy">
                            {s.amount}
                          </div>
                          <div className="text-xs text-destructive">
                            {s.daysOverdue}d overdue
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-navy">
              Delivery channels
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  channels.email
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-border bg-background text-brand-navy"
                }`}
              >
                <Checkbox
                  checked={channels.email}
                  onCheckedChange={(v) =>
                    setChannels((c) => ({ ...c, email: !!v }))
                  }
                  className="sr-only"
                />
                <Mail className="h-4 w-4" /> Email
              </label>
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  channels.sms
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-border bg-background text-brand-navy"
                }`}
              >
                <Checkbox
                  checked={channels.sms}
                  onCheckedChange={(v) =>
                    setChannels((c) => ({ ...c, sms: !!v }))
                  }
                  className="sr-only"
                />
                <MessageCircle className="h-4 w-4" /> SMS
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="reminder-msg" className="text-sm font-semibold text-brand-navy">
              Message template
            </Label>
            <Textarea
              id="reminder-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={sending}
            className="bg-brand-navy text-white hover:bg-brand-navy-deep"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending
              ? "Sending…"
              : `Send reminder${selected.length === 1 ? "" : "s"}${selected.length ? ` (${selected.length})` : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddStudentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [creds, setCreds] = useState<{
    studentNumber: string;
    password: string;
    subjects: string[];
  } | null>(null);
  const [sending, setSending] = useState(false);

  const reset = () => {
    setFullName("");
    setEmail("");
    setCreds(null);
    setSending(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please enter the student's name and email.");
      return;
    }

    setSending(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data: pending, error: pendingError } = await supabase
        .from("pending_registrations")
        .select("id, email, subjects, status")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (pendingError) {
        throw pendingError;
      }

      if (!pending) {
        toast.error("No pending registration was found for that email.");
        setSending(false);
        return;
      }

      if (pending.status === "activated") {
        toast.error("That registration has already been activated.");
        setSending(false);
        return;
      }

      const result = await activateStudentAccount({
        data: { registrationId: pending.id },
      });

      if (!result.success || !result.studentNumber || !result.password) {
        throw new Error(result.error ?? "Student activation failed.");
      }

      setCreds({
        studentNumber: result.studentNumber,
        password: result.password,
        subjects: pending.subjects ?? [],
      });
      toast.success(
        `Student account activated for ${normalizedEmail}. ${Math.max((pending.subjects ?? []).length, 0)} subject${(pending.subjects ?? []).length === 1 ? "" : "s"} attached to the profile.`,
      );
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Student activation failed.");
    } finally {
      setSending(false);
    }
  };

  const copy = (label: string, value: string) => {
    navigator.clipboard?.writeText(value);
    toast.success(`${label} copied.`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-brand-navy">Add New Student</DialogTitle>
          <DialogDescription>
            Activates a pending registration, creates the student account, and returns
            the login details for the student.
          </DialogDescription>
        </DialogHeader>

        {!creds ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Full name</Label>
              <Input
                id="new-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Thandiwe Ndlovu"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Student email</Label>
              <Input
                id="new-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />
              <p className="text-xs text-muted-foreground">
                Login credentials will be sent to this address.
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={sending}
                className="bg-brand-navy text-white hover:bg-brand-navy-deep"
              >
                <Send className="mr-2 h-4 w-4" />
                {sending ? "Generating…" : "Generate & Email"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-brand-cream/40 p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Student number
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="font-mono text-lg font-bold text-brand-navy">
                  {creds.studentNumber}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy("Student number", creds.studentNumber)}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-brand-cream/40 p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Temporary password
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="font-mono text-lg font-bold text-brand-navy">
                  {creds.password}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy("Password", creds.password)}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-brand-cream/40 p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Subjects of interest
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {creds.subjects.length > 0 ? (
                  creds.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold text-brand-navy"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No pending registration found for this email — no subjects attached.
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              These credentials have been emailed to <strong>{email}</strong>. The
              student will be prompted to change the password on first login.
            </p>
            <DialogFooter>
              <Button
                onClick={() => handleClose(false)}
                className="bg-brand-navy text-white hover:bg-brand-navy-deep"
              >
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
