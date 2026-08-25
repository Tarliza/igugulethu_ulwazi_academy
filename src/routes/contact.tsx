
import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, MessageSquare, ExternalLink, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">GET IN TOUCH</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">We&apos;d Love to Hear From You</h1>
          <p className="text-sm text-muted-foreground">
            Have questions about our tutoring programs, class schedules, or enrolment? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Direct Contact Cards */}
          <div className="space-y-5">
            {/* WhatsApp Direct Card */}
            <Card className="border border-green-500/30 bg-green-500/5 shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-base text-foreground">Chat via WhatsApp</h3>
                  <p className="text-xs text-muted-foreground">Direct contact line for fast responses from Mr. Moiane.</p>
                  <a
                    href="https://wa.me/27671486015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 hover:text-green-700 pt-1"
                  >
                    <span>+27 67 148 6015</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="border shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-base text-foreground">Email Inquiries</h3>
                  <p className="text-xs text-muted-foreground">Send us detailed questions, proof of payments, or requests.</p>
                  <a
                    href="mailto:moiane158@gmail.com"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline pt-1"
                  >
                    <span>moiane158@gmail.com</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="border shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-bold shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-base text-foreground">Academy Location</h3>
                  <p className="text-sm font-semibold text-foreground">Johannesburg South, Gauteng, RSA</p>
                  <p className="text-xs text-muted-foreground">Providing in-person study camps and nationwide online tutoring.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Send Us a Direct Message</CardTitle>
              <CardDescription className="text-xs">Fill in your inquiry and we will get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg">Message Sent!</h4>
                  <p className="text-xs text-muted-foreground">Thank you. An academy representative will contact you shortly.</p>
                  <Button variant="outline" size="sm" onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-4 text-sm">
                  <div className="space-y-1.5">
                    <Label>Your Full Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sipho Sithole" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email Address</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="How can we assist you with tutoring?" rows={4} required />
                  </div>
                  <Button type="submit" className="w-full font-bold">Submit Message</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

export default ContactPage;
