import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/components/react-query-client-provider";

export const metadata: Metadata = {
  title: "NutriPlan",
  description: "Meal Plan Generator Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 text-gray-900">
          <ReactQueryClientProvider>
            <Navbar />
            <main className="max-w-7xl mx-auto pt-20 p-4 min-h-screen">
              {children}
            </main>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
