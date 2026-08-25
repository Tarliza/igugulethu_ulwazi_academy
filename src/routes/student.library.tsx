
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getResources, Resource } from "@/lib/student-storage";
import { BookOpen, Download, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/student/library")({
  component: StudentLibraryPage,
});

export function StudentLibraryPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setResources(getResources());
  }, []);

  const filtered = resources.filter(
    (r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PortalShell role="student" title="Learning Resource Library">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Study Notes, Past Papers & Worksheets</h2>
          <p className="text-sm text-muted-foreground">Download documents uploaded by the academy staff.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search study notes or past papers by title or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No learning resources uploaded yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your tutors will publish downloadable revision sheets, past examination papers, and formulas here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((res) => (
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
