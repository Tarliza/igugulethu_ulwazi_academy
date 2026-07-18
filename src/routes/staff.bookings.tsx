import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarDays, Plus, CheckCircle, XCircle, Trash2, Clock } from "lucide-react";
import { supabase } from "@/integrations/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/staff/bookings")({
  component: BookingsPage,
});

function BookingsPage() {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const bookingsTable = supabase.from("bookings" as any);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await bookingsTable
        .select('*')
        .order('session_date', { ascending: true })
        .order('session_time', { ascending: true });
      
      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // We use 'Staff Event' as the email to differentiate staff-created events from student requests
      const { error } = await bookingsTable.insert({
          subject: title + (notes ? ` - ${notes}` : ''),
          session_date: date,
          session_time: time,
          student_email: 'Staff Event',
          status: 'confirmed' // Staff events are confirmed by default
        });

      if (error) throw error;

      toast.success("Event added successfully!");
      setOpen(false);
      
      // Reset form
      setTitle(""); setDate(""); setTime(""); setNotes("");
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await bookingsTable
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Booking ${newStatus}.`);
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this event?")) return;
    
    try {
      const { error } = await bookingsTable
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success("Event deleted.");
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event.");
    }
  };

  // Helper to format status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Confirmed</span>;
      case 'cancelled':
        return <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">Cancelled</span>;
      default:
        return <span className="rounded-full bg-brand-amber/20 px-2.5 py-0.5 text-xs font-semibold text-brand-navy">Pending</span>;
    }
  };

  return (
    <PageCard
      title="Bookings & Calendar"
      description="Scheduled classes, tutor sessions, and school events."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-brand-navy">Add Calendar Event</DialogTitle>
              <DialogDescription>Schedule a new class, meeting, or school event.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddEvent}>
              <div className="space-y-2">
                <Label htmlFor="title">Event title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grade 11 Maths – Trig Revision" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional agenda or link" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-brand-navy text-white hover:bg-brand-navy-deep">
                  {saving ? "Saving..." : "Save event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      {!loading && bookings.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No bookings yet"
          description="Upcoming class bookings and requests from students will appear here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  {getStatusBadge(booking.status)}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {booking.session_time.substring(0, 5)}
                  </div>
                </div>
                
                <h3 className="font-semibold text-brand-navy line-clamp-2">{booking.subject}</h3>
                
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {new Date(booking.session_date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>

                {booking.student_email !== 'Staff Event' && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Requested by:<br/>
                    <span className="font-medium text-brand-navy">{booking.student_email}</span>
                  </p>
                )}
              </div>
              
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                {booking.status === 'pending' && (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 border-green-200 text-green-700 hover:bg-green-50" onClick={() => updateStatus(booking.id, 'confirmed')}>
                      <CheckCircle className="mr-1 h-4 w-4" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-red-200 text-red-700 hover:bg-red-50" onClick={() => updateStatus(booking.id, 'cancelled')}>
                      <XCircle className="mr-1 h-4 w-4" /> Decline
                    </Button>
                  </>
                )}
                {booking.status !== 'pending' && (
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteBooking(booking.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove Event
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageCard>
  );
}