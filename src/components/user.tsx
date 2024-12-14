import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

// import { Session } from "next-auth"


import { Icons } from "./icons"
import { ContextMenuModeToggle } from "./mode-toggle"
// import { LogOutButton } from "./sign-in-out-buttons"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export async function UserAccount() {
  const session = await auth.api.getSession({
    headers: await headers()
})
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
          src={session?.user?.image ?? undefined}
          alt={session?.user?.name ?? undefined}
          />
          <AvatarFallback>
            {session?.user?.name
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {"Logged in as: " + session?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> 
        <DropdownMenuSeparator />
        */}
        <DropdownMenuGroup>
          <Link href="/dashboard" passHref>
            <DropdownMenuItem asChild>
              <div>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Change Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <ContextMenuModeToggle />
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {/* <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="https://github.com/1rb/typeless" passHref>
          <DropdownMenuItem asChild>
            <div>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <LogOutButton /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
