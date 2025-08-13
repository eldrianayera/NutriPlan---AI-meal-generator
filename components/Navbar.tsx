"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="fixed top-0 left-0 w-full bg-background p-4 z-50">
        Loading...
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-background border-b border-foreground/10 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-primary">MealPlanner</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Authentication Buttons */}
          <SignedIn>
            <Link
              href="/mealplan"
              className="font-medium hover:text-primary transition-colors"
            >
              My Meal Plan
            </Link>

            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              {user?.imageUrl ? (
                <Link href="/profile">
                  <Image
                    src={user.imageUrl}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full border border-foreground/20"
                  />
                </Link>
              ) : (
                <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
                  <span className="text-lg">
                    {user?.firstName?.charAt(0) || "U"}
                  </span>
                </div>
              )}

              {/* Sign Out Button */}
              <SignOutButton>
                <button className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/subscribe"
                className="font-medium hover:text-primary transition-colors"
              >
                Subscribe
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
