import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ApolloProviderWithClient from "@/components/ApolloProviderWithClient";
import { Toaster } from "@/components/ui/sonner";
import LoginForm from "@/components/LoginForm";
import { SignedIn, SignedOut, UserProvider } from "@/hooks/use-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} antialiased font-sans`}>
        <ApolloProviderWithClient>
          <UserProvider>
            <SignedIn>
              {children}
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
