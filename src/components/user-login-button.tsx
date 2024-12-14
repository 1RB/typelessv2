import { headers } from "next/headers"
import { auth } from "@/lib/auth";

import { ModeToggle } from "./mode-toggle"
import { UserAccount } from "./user"
import { Button } from "./ui/button"

export default async function UserLoginBtn() {
  const session = await auth.api.getSession({
    headers: await headers()
})

  return (
    <div className="ml-auto flex gap-2">
      {session ? (
        <UserAccount />
      ) : (
        <>
          <Button variant="outline" asChild>
            <a href="/login">Login</a>
          </Button>
          <ModeToggle />
        </>
      )}
    </div>
  )
}
