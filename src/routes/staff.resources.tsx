import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FolderOpen, Upload, Plus, Download, Trash2 } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/staff/resources")({
  component: ResourcesPage,
});

function ResourcesPage() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  
  // Form State
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Load resources when page opens
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching resources:", error);
    } else {
      setResources(data || []);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !subject) {
      toast.error("Please fill in all required fields and select a file.");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload file to Supabase Storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${subject}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Save resource details to the database table
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          title,
          subject,
          description,
          file_path: filePath,
        });

      if (dbError) throw dbError;

      toast.success("Resource uploaded successfully!");
      setOpen(false);
      
      // Reset form and refresh the list
      setTitle("");
      setSubject("");
      setDescription("");
      setFile(null);
      fetchResources();

    } catch (err) {
      console.error(err);
      toast.error("Failed to upload resource. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      // 1. Delete from storage bucket
      await supabase.storage.from('resources').remove([filePath]);
      
      // 2. Delete from database
      await supabase.from('resources').delete().eq('id', id);
      
      toast.success("Resource deleted.");
      fetchResources();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resource.");
    }
  };

  const downloadFile = async (filePath: string, title: string) => {
    const { data, error } = await supabase.storage
      .from('resources')
      .createSignedUrl(filePath, 60); // Link valid for 60 seconds

    if (error || !data) {
      toast.error("Could not generate download link.");
      return;
    }

    // Open link in new tab to trigger download
    window.open(data.signedUrl, '_blank');
  };

  return (
    <PageCard
      title="Learning Resources"
      description="Notes, past papers, and worksheets shared with your students."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-brand-navy">Add New Resource</DialogTitle>
              <DialogDescription>Upload a file and assign it to a subject.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleUpload}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grade 11 Trigonometry Notes" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject} required>
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
                <Label htmlFor="desc">Description</Label>
                <Textarea 
                  id="desc" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary of the resource" 
                  rows={3} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-brand-cream/40 p-4">
                  <Upload className="h-5 w-5 text-brand-navy" />
                  <Input 
                    id="file" 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border-0 bg-transparent p-0 shadow-none" 
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={uploading}
                  className="bg-brand-navy text-white hover:bg-brand-navy-deep"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      
      {resources.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No resources uploaded"
          description="Upload notes, past papers, or worksheets — they will appear here for your students."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => (
            <div key={res.id} className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-2.5 py-0.5 text-xs font-semibold uppercase text-brand-navy">
                    {res.subject}
                  </span>
                  <button onClick={() => handleDelete(res.id, res.file_path)} className="text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-brand-navy">{res.title}</h3>
                {res.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{res.description}</p>
                )}
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Uploaded {new Date(res.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 w-full"
                onClick={() => downloadFile(res.file_path, res.title)}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </PageCard>
  );
}