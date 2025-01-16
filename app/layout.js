import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickLink - Get Url of your type",
  description: "Customize Url Generater",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="main fixed top-0 -z-10 w-screen h-svh bg-gradient-to-bl from-[#f6f4f2] from-50% to-[#c7ab97] to-50%"></div>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
