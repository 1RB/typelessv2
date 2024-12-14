import SignIn from "@/components/sign-in";
import TwitterPost from "@/components/twitter-post";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export default async function Page() {
  const header = await headers();
  const session = await auth.api.getSession({
    headers: header,
  });
  // console.log("session: " + JSON.stringify(session, null, 2))
  // console.log("header: " + JSON.stringify(header, null, 2))

    if (!session) {
      return (
        <div className="flex h-screen-minus-nav-footer flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
          <p className="mb-4">You need to be logged in to view this page</p>
          <SignIn />
        </div>
      )
  }
  

  return <TwitterPost />

  
}
