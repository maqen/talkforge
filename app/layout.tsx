import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ApolloProviderWithClient from "@/components/ApolloProviderWithClient";

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
        <ApolloProviderWithClient>{children}</ApolloProviderWithClient>
      </body>
    </html>
  );
}
