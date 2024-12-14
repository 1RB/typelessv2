"use client"

import { MessageSquare } from 'lucide-react'
import { useRouter } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Tweet {
  id: string
  content: string
}

export function NavTweets({ tweets }: { tweets: Tweet[] }) {
  const router = useRouter()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Previous Tweets</SidebarGroupLabel>
      <SidebarMenu>
        {tweets.map((tweet) => (
          <SidebarMenuItem key={tweet.id}>
            <SidebarMenuButton
              onClick={() => router.push(`/dashboard/${tweet.id}`)}
              tooltip={tweet.content}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="truncate">{tweet.content}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}