import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageCard } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/book")({
  component: BookClass,
});

function BookClass() {
  return (
    <PageCard
      title="Book a Class"
      description="Request a 1-on-1 or small-group session with your tutor."
    >
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <Label>Subject</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physical Sciences</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="acc">Accounting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Session type</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1v1">1-on-1</SelectItem>
              <SelectItem value="group">Small group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Preferred date</Label>
          <Input id="date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Preferred time</Label>
          <Input id="time" type="time" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="topic">Topic / notes</Label>
          <Textarea id="topic" rows={3} placeholder="What would you like to focus on?" />
        </div>
        <div className="sm:col-span-2">
          <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
            <CalendarPlus className="mr-2 h-4 w-4" /> Request booking
          </Button>
        </div>
      </form>
    </PageCard>
  );
}
