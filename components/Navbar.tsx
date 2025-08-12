"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function () {
  //
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <nav>
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
      </div>

      {/* User Signed In Logic */}
      <SignedIn>
        <Link href="/mealplan">Mealplan</Link>
        {user?.imageUrl ? (
          <Link href="/profile">
            <Image
              src={user.imageUrl}
              alt={user.username ? user.username : "profile picture"}
              width={40}
              height={40}
            />
          </Link>
        ) : (
          <div></div>
        )}
      </SignedIn>

      {/* User Signed In Logic */}
      <SignedOut>
        <Link href="/sign-up">Sign in</Link>
      </SignedOut>

      <div></div>
    </nav>
  );
}
