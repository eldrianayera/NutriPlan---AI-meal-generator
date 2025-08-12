import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { error: "User not found in Clerk" },
        { status: 404 }
      );
    }

    const email = clerkUser?.emailAddresses[0].emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "User does not have an email address" },
        { status: 400 }
      );
    }

    const exsitingProfile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });

    if (exsitingProfile) {
      return NextResponse.json({
        message: "User with this email already exist",
      });
    }

    await prisma.profile.create({
      data: {
        userId: clerkUser.id,
        email,
        subscriptionTier: null,
        stripeSubscriptionId: null,
        subscriptionActive: false,
      },
    });

    return NextResponse.json(
      { message: "Profile created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create profile error:", error);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
