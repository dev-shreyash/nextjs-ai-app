import type { NextAuthConfig } from "next-auth";
// 1. Updated to the modern Next-Auth v5 provider import paths
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { dbConnect } from "@/lib/dbConnector";
import UserModel, { BankDetailsModel } from "@/model/user.model";

// 2. TypeScript Module Augmentation to natively support custom session & token properties
declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      bankDetails?: {
        name: string;
        accountNumber: string;
        ifscCode: string;
      };
    } & any; // Keeps flexibility for base fields like email/image
  }

  interface User {
    _id?: any;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    bankDetails?: {
      name: string;
      accountNumber: string;
      ifscCode: string;
    };
  }
}

// 3. Changed type schema profile to look for NextAuthConfig exclusively
export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier},
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email or username');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          console.error('Error in authorize:', err);
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;

        // Fetch bank details and add them to the token
        const bankDetails = await BankDetailsModel.findOne({ user: user._id });
        if (bankDetails) {
          token.bankDetails = {
            name: bankDetails.name,
            accountNumber: bankDetails.accountNumber,
            ifscCode: bankDetails.ifscCode,
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;

        // Include bank details in the session object
        if (token.bankDetails) {
          session.user.bankDetails = token.bankDetails;
        }
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
