"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import { Image as ImageIcon, MoreHorizontal, PlusCircle } from "lucide-react"

// import { TwitterApi } from "twitter-api-v2"

import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"

type Tweet = {
  id: number
  content: string
}

const MAX_CHARS = 280

export default function TwitterPost() {
  const {
    data: session,
    isPending, //loading state
    error //error object
  } = authClient.useSession();
  
  console.log("session", session)

  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      content:
        "Hello, world! 👋\n\nThis is a sample tweet!\n\nYou can write your own tweets below...",
    },
    {
      id: 2,
      content:
        'Here\'s some tips: \nYou can use the "Add post below" button to add more tweets! \nYou can use the "Move up" and "Move down" buttons to reorder your tweets! \nYou can use the "Delete tweet" button to remove a tweet!',
    },
  ])
  const [activeTweet, setActiveTweet] = useState<number | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const [hoveredProgress, setHoveredProgress] = useState<number | null>(null)
  const tweetRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({})
  const { toast } = useToast()

  useEffect(() => {
    tweets.forEach((tweet) => {
      const tweetElement = tweetRefs.current[tweet.id]
      if (tweetElement) {
        tweetElement.style.height = "auto"
        tweetElement.style.height = `${tweetElement.scrollHeight}px`
      }
    })
  }, [tweets])

  const addTweet = (afterId: number) => {
    const newTweet = {
      id: Math.max(...tweets.map((t) => t.id)) + 1,
      content: "",
    }
    const index = tweets.findIndex((t) => t.id === afterId)
    setTweets([
      ...tweets.slice(0, index + 1),
      newTweet,
      ...tweets.slice(index + 1),
    ])
    setActiveTweet(newTweet.id)
  }

  const updateTweet = (id: number, content: string) => {
    setTweets(
      tweets.map((tweet) => (tweet.id === id ? { ...tweet, content } : tweet))
    )
  }

  const moveTweet = (id: number, direction: "up" | "down") => {
    const index = tweets.findIndex((tweet) => tweet.id === id)
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < tweets.length - 1)
    ) {
      const newTweets = [...tweets]
      const [removed] = newTweets.splice(index, 1)
      newTweets.splice(direction === "up" ? index - 1 : index + 1, 0, removed)
      setTweets(newTweets)
    }
  }

  const deleteTweet = (id: number) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id))
    if (activeTweet === id) {
      setActiveTweet(null)
    }
  }

  const handleTweetChange = (id: number, content: string) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id
          ? {
              ...tweet,
              content,
            }
          : tweet
      )
    )
  }

  const postToTwitter = async () => {
    setIsPosting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPosting(false)
    toast({
      title: "Tweets posted!",
      description: `${tweets.length} tweets have been posted to Twitter!`,
    })
  }

  const Toolbar = ({ tweet, index }: { tweet: Tweet; index: number }) => {
    const charCount = tweet.content.length
    const charsLeft = MAX_CHARS - charCount
    const progress = (charCount / MAX_CHARS) * 100
    const isOverLimit = charCount > MAX_CHARS
    const isNearLimit = charsLeft < 20
    const showToolbar = activeTweet === tweet.id || isOverLimit

    let progressColor = "text-zinc-600"
    if (isOverLimit) {
      progressColor = "text-red-500"
    } else if (isNearLimit) {
      progressColor = "text-yellow-500"
    }

    const circleSize =
      (isOverLimit && charsLeft > -20) || isNearLimit ? "w-7 h-7" : "w-4 h-4"

    return (
      <div
        className={`mt-2 flex items-center space-x-2 transition-opacity duration-200 ${showToolbar ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`relative ${circleSize} group cursor-pointer`}
          onMouseEnter={() => setHoveredProgress(tweet.id)}
          onMouseLeave={() => setHoveredProgress(null)}
        >
          {charsLeft > -20 && (
            <svg className="h-full w-full" viewBox="0 0 24 24">
              <circle
                className="text-gray-300"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="10"
                cx="12"
                cy="12"
              />
              <circle
                className={progressColor}
                strokeWidth="2"
                strokeDasharray={64}
                strokeDashoffset={!isOverLimit ? 64 - (progress / 100) * 64 : 0}
                strokeLinecap="butt"
                stroke="currentColor"
                fill="transparent"
                r="10"
                cx="12"
                cy="12"
              />
            </svg>
          )}
          <span
            className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${progressColor}`}
          >
            {charsLeft < 20 ? charsLeft : ""}
          </span>
          <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 transform rounded bg-primary-foreground px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {charCount}/{MAX_CHARS}
          </div>
        </div>
        {showToolbar && (
          <>
            <span className="text-sm">#{index + 1}</span>
            <Button
              onClick={() => addTweet(tweet.id)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Add post below"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Add media"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={async () => {
          setIsPosting(true)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          setIsPosting(false)
          toast({
            title: "Tweets posted!",
            description: `${tweets.length} tweets have been posted to Twitter!`,
          })
        }}
        disabled={
          isPosting || tweets.some((tweet) => tweet.content.length > MAX_CHARS)
        }
        className="rounded px-4 py-2 font-bold"
      >
        {isPosting ? (
          <span className="flex items-center">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-primary-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Posting...
          </span>
        ) : (
          <span className="flex items-center">Post Tweets</span>
        )}
      </Button>
      <div className="mx-auto w-full max-w-[568px] p-4">
        {tweets.map((tweet, index) => (
          <div key={tweet.id} className="relative mb-4">
            <div className="flex">
              <div className="relative mr-4">
                <Avatar className="h-10 w-10">
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
                {index < tweets.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 top-12 w-0.5 -translate-x-1/2 transform bg-muted-foreground" />
                )}
              </div>
              <div className="relative flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">{session?.user?.name}</span>
                    <span className="ml-2 text-muted-foreground">
                      @{session?.user?.email}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => moveTweet(tweet.id, "up")}
                      >
                        Move up
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => moveTweet(tweet.id, "down")}
                      >
                        Move down
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteTweet(tweet.id)}>
                        Delete tweet
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <textarea
                  ref={(el) => {
                    tweetRefs.current[tweet.id] = el
                  }}
                  value={tweet.content}
                  onChange={(e) => handleTweetChange(tweet.id, e.target.value)}
                  onFocus={() => setActiveTweet(tweet.id)}
                  className="mt-2 w-full resize-none overflow-hidden bg-transparent outline-none"
                  style={{ minHeight: "60px" }}
                />
                <Toolbar tweet={tweet} index={index} />
                {/* <div className="mt-2 flex items-center justify-end text-muted-foreground">
                {activeTweet === tweet.id && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">
                      {tweet.content.length}/{MAX_CHARS}
                    </span>
                  </div>
                )} 
              </div>
                 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
