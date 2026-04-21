"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  TagIcon,
  HomeIcon,
  HeartIcon,
  ListVideoIcon,
  TelescopeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", link: "/", icon: HomeIcon },
  { label: "Explore", link: "/explore", icon: TelescopeIcon },
  { label: "Genres", link: "/genres", icon: TagIcon },
  { label: "Favorites", link: "/favorites", icon: HeartIcon },
  { label: "Watch List", link: "/watchlist", icon: ListVideoIcon },
];

const Header = () => {
  return (
    <header className="p-3 space-y-1 overflow-hidden text-nowrap">
      <h2 className="text-2xl text-primary font-bold">Movies Tube</h2>
      <p className="text-sm text-muted-foreground">
        Your personal movie library
      </p>
    </header>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center justify-center pt-2 text-2xl text-primary font-bold">
      M
    </div>
  );
};

export const AppSidebar = () => {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {state === "expanded" ? <Header /> : <Logo />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.link}>
                    <Link href={item.link}>
                      {<item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
