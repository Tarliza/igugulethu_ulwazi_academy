
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getResources, addResource, deleteResource, Resource, ACADEMY_SUBJECTS } from "@/lib/student-storage";
import { BookOpen, Plus, Download, FileText, UploadCloud, Trash2 } from "lucide-react";

export const Route = createFileRoute("/staff/resources")({
  component: StaffResourcesPage,
});

export function StaffResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<string>("Mathematics");
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
      uploadedBy: "Academy Staff",
    });

    setTitle("");
    setDescription("");
    setFileName("");
    setOpenModal(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteResource(id);
    loadData();
  };

  return (
    <PortalShell role="staff" title="Learning Resource Center">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Learning Resource Center</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upload revision worksheets, study notes, and past examination papers. Files automatically publish to enrolled learners.
            </p>
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 font-bold">
                <Plus className="h-4 w-4" /> Upload Learning Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Learning Material</DialogTitle>
                <DialogDescription className="text-xs">
                  Select subject from the offered list to publish notes to learners.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-3 py-2 text-xs">
                <div className="space-y-1">
                  <Label>Subject (Select from offered curriculum) *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>
                      {ACADEMY_SUBJECTS.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Document / Worksheet Title *</Label>
                  <Input placeholder="e.g. Grade 11 Mathematics Term 1 Revision" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Description / Topics Covered</Label>
                  <Textarea placeholder="Short overview of contents..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </div>
                <div className="space-y-1">
                  <Label>Upload File (PDF or Document)</Label>
                  <Input type="file" onChange={(e) => e.target.files && setFileName(e.target.files[0].name)} />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full font-bold">Publish to Enrolled Students</Button>
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
                Click &quot;Upload Learning Resource&quot; to share worksheets and notes with your students.
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
                    <span className="text-[11px] text-muted-foreground truncate max-w-[160px]">{res.fileName}</span>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" className="text-xs gap-1">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(res.id)} className="text-red-600 hover:bg-red-50 p-2">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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

export default StaffResourcesPage;
