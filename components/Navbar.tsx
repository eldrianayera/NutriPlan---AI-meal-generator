"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Leaf, LogOut, UtensilsCrossed } from "lucide-react";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50" />
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Nutri<span className="text-brand-600">Plan</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <Link
              href="/mealplan"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 font-medium text-sm transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              My Meal Plan
            </Link>

            {/* Avatar + Sign Out */}
            <div className="flex items-center gap-2 ml-2">
              <Link href="/profile">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-brand-200 hover:ring-brand-400 transition-all"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center ring-2 ring-brand-200 hover:ring-brand-400 transition-all">
                    <span className="text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </Link>

              <SignOutButton>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-all">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>

          <SignedOut>
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 font-medium text-sm transition-all"
            >
              Home
            </Link>
            <Link
              href="/subscribe"
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 font-medium text-sm transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/sign-up"
              className="ml-1 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold text-sm hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/30 hover:shadow-brand-500/50 transition-all"
            >
              Get Started
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
