"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";
import {
  ForkKnife,
  PencilIcon,
  UserPlus,
  ChefHat,
  HeartPulse,
  Leaf,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <div className="max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-primary rounded-4xl">
        {/* Food Pattern Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-background"></div>
          <div className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-background"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 lg:px-12 py-12 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-background leading-tight">
            Delicious Meets <br className="hidden sm:block" />
            Effortless
          </h1>
          <p className="text-xl text-background mb-8">
            AI-powered meal plans tailored to your taste, goals, and lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mealplan"
              className="px-8 py-4 bg-background text-primary font-bold rounded-full hover:bg-primary hover:text-background transition-all transform hover:scale-105 shadow-lg"
            >
              Get Your Meal Plan
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 border-2 border-background text-background font-bold rounded-full hover:bg-background hover:bg-opacity-10 transition-all"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Floating Food Icons */}
        <div className="hidden lg:block absolute bottom-20 left-20">
          <ForkKnife className="w-12 h-12 text-background opacity-80" />
        </div>
        <div className="hidden lg:block absolute top-32 right-32">
          <ChefHat className="w-12 h-12 text-background opacity-80" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Our Meal Plans?
          </h2>
          <p className="text-lg text-foreground">
            We combine nutrition science with AI to create plans that actually
            work for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-background p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <HeartPulse className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-foreground">
              Health Optimized
            </h3>
            <p className="text-foreground text-center">
              Balanced macros and micronutrients tailored to your health goals
            </p>
          </div>

          <div className="bg-background p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Leaf className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-foreground">
              Dietary Friendly
            </h3>
            <p className="text-foreground text-center">
              Vegan, keto, gluten-free? We've got you covered with specialized
              options
            </p>
          </div>

          <div className="bg-background p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ChefHat className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-foreground">
              Time Saving
            </h3>
            <p className="text-foreground text-center">
              Quick recipes with smart ingredient overlap to minimize prep time
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-foreground">
              Get your perfect meal plan in just 3 simple steps
            </p>
          </div>

          <div className="relative space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-primary text-background rounded-full h-16 w-16 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
                <UserPlus className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Create Your Profile
                </h3>
                <p className="text-foreground">
                  Tell us about your dietary preferences, allergies, health
                  goals, and cooking habits. Our AI learns your tastes to create
                  perfectly personalized plans.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-primary text-background rounded-full h-16 w-16 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
                <PencilIcon className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Customize Your Plan
                </h3>
                <p className="text-foreground">
                  Choose your plan duration, meal frequency, and preferred
                  cuisine styles. Swap out any meals you don't like with our
                  smart alternatives.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-primary text-background rounded-full h-16 w-16 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
                <ForkKnife className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Enjoy & Track
                </h3>
                <p className="text-foreground">
                  Receive your complete meal plan with recipes, shopping lists,
                  and nutrition info. Track your progress and adjust as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Eating Habits?
          </h2>
          <p className="text-xl mb-8 text-background">
            Join thousands of happy members who save time and eat better every
            day
          </p>
          <Link
            href="/mealplan"
            className="inline-block px-10 py-4 bg-background text-primary font-bold rounded-full hover:opacity-80 transition-opacity"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
