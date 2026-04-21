import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { cn } from "@/lib/utils";

const AppHeader = ({ className, ...props }: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn(
        "flex items-center gap-3 fixed z-50 w-full p-4 bg-background",
        className
      )}
      {...props}
    >
      <SidebarToggle />
      <ThemeToggle />
    </header>
  );
};

export default AppHeader;
