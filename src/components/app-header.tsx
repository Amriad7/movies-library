import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";

const AppHeader = ({ className, ...props }: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn(
        "flex items-center gap-3 sticky top-0 left-0 z-50 w-full p-4 bg-background",
        className
      )}
      {...props}
    >
      <SidebarToggle />
      <ThemeToggle />
      <div className="flex-1 flex justify-end">
        <SearchBar />
      </div>
    </header>
  );
};

export default AppHeader;
