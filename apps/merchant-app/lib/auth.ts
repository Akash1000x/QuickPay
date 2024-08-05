import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      console.log("hi signin");
      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
        update: {
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
      });

      return true;
    },
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
