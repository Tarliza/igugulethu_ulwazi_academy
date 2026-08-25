
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getResources, addResource, Resource } from "@/lib/student-storage";
import { BookOpen, Plus, Download, FileText, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/staff/resources")({
  component: StaffResourcesPage,
});

export function StaffResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const loadData = () => {
    setResources(getResources());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addResource({
      title,
      subject,
      description,
      fileName: fileName || (title.toLowerCase().replace(/\s+/g, "_") + ".pdf"),
    });

    setTitle("");
    setDescription("");
    setFileName("");
    setOpenModal(false);
    loadData();
  };

  return (
    <PortalShell role="staff">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Learning Resource Center</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upload and organize revision materials, study notes, past exam papers, and worksheets for students.
            </p>
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 shrink-0">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Learning Material</DialogTitle>
                <DialogDescription>Upload a document and assign it to a subject.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-3 py-2">
                <div className="space-y-1">
                  <Label>Title *</Label>
                  <Input placeholder="e.g. Grade 11 Mathematics Term 1 Revision" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Subject</Label>
                  <Input placeholder="e.g. Mathematics" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea placeholder="Overview of document..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>File Upload (PDF or Document)</Label>
                  <Input type="file" onChange={(e) => e.target.files && setFileName(e.target.files[0].name)} />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full">Publish to Student Library</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {resources.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No learning resources uploaded yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Click &quot;Add Resource&quot; to upload notes or past papers for your enrolled students.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((res) => (
              <Card key={res.id} className="shadow-sm border hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="outline" className="text-xs mb-1 bg-primary/10 text-primary">{res.subject}</Badge>
                      <CardTitle className="text-base font-bold">{res.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <p className="text-muted-foreground line-clamp-2">{res.description || "Comprehensive student revision worksheet."}</p>
                  <div className="pt-2 border-t flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{res.fileName}</span>
                    <Button size="sm" variant="outline" className="text-xs gap-1">
                      <Download className="h-3 w-3" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
