import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarToggle } from "./sidebar-toggle";

const AppHeader = () => {
  return (
    <header className="flex items-center gap-3 fixed z-100 w-full p-4 bg-background border-b S">
      <SidebarToggle />
      <ThemeToggle />
    </header>
  );
};

export default AppHeader;
