import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/lib/mongo";
 
export const auth = betterAuth({
    database: mongodbAdapter(db),
    socialProviders: {
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        },
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!
        }
    },
    user: {
        deleteUser: {
            enabled: true
        }
    },
});