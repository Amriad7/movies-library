import { cn } from "@/lib/utils";
import React from "react";

const Section = ({
  title,
  children,
  filled,
}: {
  title: string;
  children?: React.ReactNode;
  filled?: boolean;
}) => {
  return (
    <section className="space-y-6 w-full">
      <h3 className="font-bold text-sidebar-primary-foreground">{title}</h3>
      <div
        className={cn(
          "text-muted-foreground font-light leading-loose rounded-lg",
          filled && "bg-muted p-8"
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
