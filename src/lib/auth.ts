import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (!user?.email) {
        console.error("No email in user object");
        return false;
      }

      try {
        // Check if user exists, if not create them (Google OAuth only)
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (!existingUser) {
          // Create new user from Google OAuth data
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || user.email?.split('@')[0],
              image: user.image,
              emailVerified: account?.provider === "google" ? new Date() : null,
            }
          });
          user.id = newUser.id;
          console.log(`Created new user from ${account?.provider}:`, newUser.id);
        } else {
          user.id = existingUser.id;
          console.log(`Found existing user for ${account?.provider}:`, existingUser.id);
          
          // Update user data if needed
          if (account?.provider === "google" && !existingUser.emailVerified) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { emailVerified: new Date() }
            });
          }
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
      }
      if (account) {
        token.provider = account.provider;
      }
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { hasPaid: true },
        });
        token.hasPaid = dbUser?.hasPaid || false;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.picture as string;
        session.user.hasPaid = token.hasPaid as boolean;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false, // Disable debug warnings
};