import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent, getResourcesForStudent, getResourceDownloadUrl, Resource, Student } from "@/lib/student-storage";
import { BookOpen, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/student/library")({
  component: StudentLibraryPage,
});

export function StudentLibraryPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = () => {
      const current = getCurrentStudent();
      setStudent(current);
      setResources(current ? getResourcesForStudent(current.subjects) : []);
      setLoading(false);
    };
    refresh();
    window.addEventListener("academy-data-updated", refresh);
    return () => window.removeEventListener("academy-data-updated", refresh);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return resources;
    return resources.filter((resource) =>
      resource.title.toLowerCase().includes(term) ||
      resource.subject.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term)
    );
  }, [resources, query]);

  const handleDownload = async (resource: Resource) => {
    setDownloadError("");
    setDownloadingId(resource.id);
    try {
      const url = await getResourceDownloadUrl(resource);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "Could not create a secure download link.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <PortalShell role="student" title="Learning Resource Library">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Study Notes, Past Papers & Worksheets</h2>
          <p className="text-sm text-muted-foreground">Only resources for your enrolled subjects and resources marked “All Subjects” are shown.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input aria-label="Search enrolled-subject resources" placeholder="Search by title, subject, or description…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 bg-background" />
        </div>

        {downloadError && <p role="alert" className="text-sm font-semibold text-destructive">{downloadError}</p>}

        {loading ? (
          <Card className="text-center py-12 border-dashed"><CardContent><p className="text-sm text-muted-foreground">Loading your enrolled-subject resources…</p></CardContent></Card>
        ) : !student ? (
          <Card className="text-center py-12 border-dashed"><CardContent><p className="text-sm text-muted-foreground">Your student record could not be loaded. Please sign in again.</p></CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground"><BookOpen className="h-6 w-6" /></div>
              <h3 className="font-semibold text-lg">{resources.length === 0 ? "No resources for your enrolled subjects yet" : "No matching resources"}</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{resources.length === 0 ? "Staff-uploaded resources will appear here when they match your subjects." : "Try another search term."}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource) => (
              <Card key={resource.id} className="shadow-sm border hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="text-xs mb-1 bg-primary/10 text-primary">{resource.subject}</Badge>
                  <CardTitle className="text-base font-bold">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <p className="text-muted-foreground line-clamp-3">{resource.description || "No description provided."}</p>
                  <div className="pt-2 border-t flex items-center justify-between gap-2">
                    <span className="text-[11px] text-muted-foreground truncate">{resource.fileName}</span>
                    <Button size="sm" variant="outline" className="text-xs gap-1 shrink-0" onClick={() => void handleDownload(resource)} disabled={downloadingId === resource.id}>
                      <Download className="h-3 w-3" /> {downloadingId === resource.id ? "Preparing…" : "Download"}
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
