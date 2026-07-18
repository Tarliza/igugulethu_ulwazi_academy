import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, BookOpen, Award } from "lucide-react";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <EmptyCard
          icon={CalendarDays}
          title="Today's Schedule"
          description="No sessions scheduled yet. Your upcoming classes will appear here once your tutors publish the timetable."
        />
        <EmptyCard
          icon={BookOpen}
          title="Continue Learning"
          description="No lessons started yet. Once you begin a course, your progress will show up here."
        />
      </div>

      <div className="space-y-5">
        <EmptyCard
          icon={Award}
          title="Recent Grades"
          description="No grades recorded. Complete a quiz or assignment to see your results here."
          compact
        />
      </div>
    </div>
  );
}

function EmptyCard({
  icon: Icon,
  title,
  description,
  compact,
}: {
  icon: typeof CalendarDays;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg font-extrabold text-brand-navy">{title}</h2>
      <div
        className={`mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-brand-cream/40 text-center ${
          compact ? "p-6" : "p-10"
        }`}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-amber-soft text-brand-navy">
          <Icon className="h-5 w-5" />
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
