import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
import { db } from "./database";
import * as schema from "@hack-life/db/schema";

export const auth = betterAuth({
   database: drizzleAdapter(db, {

      provider: "sqlite",

      schema: schema,
   }),
   trustedOrigins: [
      process.env.CORS_ORIGIN || "",
      "lifehack-app://",
   ],
   emailAndPassword: {
      enabled: true,
   },
   advanced: {
      defaultCookieAttributes: {
         sameSite: "none",
         secure: true,
         httpOnly: true,
      },
   },
   plugins: [expo()],
});



