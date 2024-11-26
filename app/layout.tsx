import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BEST",
  description: "BUBT Enhanced Schedule Tracker",
};

export default function RootLayout({
  children,
  flexAuto = false,
}: Readonly<{
  children: React.ReactNode;
  flexAuto?: boolean;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main
            className={`max-w-full max-h-full flex flex-col ${flexAuto ? "flex-auto" : ""}`}
          >
            <SidebarTrigger />
            <Suspense>{children} </Suspense>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
