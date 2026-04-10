"use client";

import { Button } from "./ui/button";
import { EqualIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="secondary" size="icon" onClick={toggleSidebar}>
      <EqualIcon />
    </Button>
  );
};
