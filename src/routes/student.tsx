
import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

export function StudentLayout() {
  return <Outlet />;
}

export default StudentLayout;
