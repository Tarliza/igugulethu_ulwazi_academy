import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MessageSquare, Check, Mail, MailOpen } from "lucide-react";
import { supabase } from "@/integrations/client";
import { toast } from "sonner";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff/messages")({
  component: StaffMessages,
});

function StaffMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages as soon as the page loads
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false }); // Newest first
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // 1. Update in the database
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      // 2. Update locally so the UI changes instantly without a page refresh
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
      toast.success("Message marked as read.");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to mark message as read.");
    }
  };

  return (
    <PageCard
      title="Messages"
      description="Direct conversations between staff and students."
    >
      {!loading && messages.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Incoming student messages will appear here so you can reply from one place."
        />
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col gap-4 rounded-xl border p-5 transition-all sm:flex-row sm:items-start ${
                msg.is_read 
                  ? "border-border bg-card opacity-70" 
                  : "border-brand-navy/40 bg-brand-cream/20 shadow-sm"
              }`}
            >
              <div className="mt-1 hidden sm:block">
                {msg.is_read ? (
                  <MailOpen className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Mail className="h-5 w-5 text-brand-navy" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`font-semibold ${msg.is_read ? "text-muted-foreground" : "text-brand-navy"}`}>
                    {msg.subject}
                  </h3>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  From: <a href={`mailto:${msg.sender_email}`} className="hover:underline hover:text-brand-navy">{msg.sender_email}</a>
                </div>
                <p className={`mt-2 text-sm ${msg.is_read ? "text-muted-foreground" : "text-foreground"}`}>
                  {msg.content}
                </p>
              </div>

              {!msg.is_read && (
                <div className="pt-2 sm:pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => markAsRead(msg.id)}
                    className="w-full sm:w-auto hover:bg-brand-navy hover:text-white"
                  >
                    <Check className="mr-2 h-4 w-4" /> Mark as Read
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageCard>
  );
}