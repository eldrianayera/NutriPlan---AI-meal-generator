import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/components/react-query-client-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NutriPlan — AI-Powered Meal Planning",
  description: "Personalized meal plans powered by AI. Eat smarter, live better.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={plusJakartaSans.variable}>
        <body
          className="bg-white text-slate-900 antialiased"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <ReactQueryClientProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
