import ApolloProviderWithClient from "@/components/ApolloProviderWithClient";
import LoginForm from "@/components/LoginForm";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SignedIn, SignedOut, UserProvider } from "@/hooks/use-user";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Talkforge",
  description: "A simple chat app for real and AI friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <ApolloProviderWithClient>
          <UserProvider>
            <SignedIn>
              <SidebarProvider>
                <Sidebar />
                <main>{children}</main>
              </SidebarProvider>
              <Toaster />
            </SignedIn>
            <SignedOut>
              <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
                <div className="w-full max-w-md">
                  <LoginForm />
                </div>
              </main>
            </SignedOut>
          </UserProvider>
        </ApolloProviderWithClient>
      </body>
    </html>
  );
}
