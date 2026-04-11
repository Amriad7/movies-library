import { cn } from "@/lib/utils";
import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const Section = ({
  title,
  children,
  filled,
  scrollable,
}: {
  title: string;
  children?: React.ReactNode;
  filled?: boolean;
  scrollable?: boolean;
}) => {
  return (
    <section className="space-y-6 w-full">
      <h3 className="font-bold text-sidebar-primary-foreground">{title}</h3>
      <div
        className={cn(
          "text-muted-foreground font-light leading-loose rounded-lg ",
          filled && "bg-muted p-8"
        )}
      >
        {scrollable ? (
          <ScrollArea className="pt-2 pb-6">
            {children}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default Section;
