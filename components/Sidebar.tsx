"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LogOut,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { Button } from "./ui/button";
import { useUsersQuery } from "@/graphql/generated";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  const { data } = useUsersQuery({
    variables: {
      where: {
        id: {
          ne: user?.id,
        },
      },
    },
  });
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <MessagesSquare className="h-4 w-4" />
          <h2 className="text-xl font-semibold tracking-tight">Talkforge</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data?.users.map((user) => (
                <SidebarMenuItem key={user.username}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/${user.id}`}
                  >
                    <Link href={`/${user.id}`}>
                      <MessageCircle className="h-4 w-4" />
                      <span>@{user.username}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
