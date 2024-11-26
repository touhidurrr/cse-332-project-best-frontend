import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookText,
  Calendar,
  Home,
  LucideRefreshCcw,
  PackageSearch,
} from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Student Routines",
    url: "/routines",
    icon: Calendar,
  },
  {
    title: "Faculty Routine",
    url: "/froutine",
    icon: Calendar,
  },
  {
    title: "Course Info",
    url: "/courses",
    icon: BookText,
  },
  {
    title: "Retake Section Finder",
    url: "/retake",
    icon: LucideRefreshCcw,
  },
  {
    title: "Room Finder",
    url: "/room-finder",
    icon: PackageSearch,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>BUBT Enhanced Schedule Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
