"use client";

import Link from "next/link";
import {
  ForkKnife,
  PencilLine,
  UserPlus,
  ChefHat,
  HeartPulse,
  Leaf,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Clock,
  Zap,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Meal Plans Generated" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "7 sec", label: "Average Generation Time" },
  { value: "200+", label: "Cuisine Styles" },
];

const benefits = [
  {
    icon: HeartPulse,
    title: "Health Optimized",
    description:
      "Balanced macros and micronutrients tailored precisely to your health goals and body type.",
    color: "from-rose-400 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    icon: Leaf,
    title: "Dietary Friendly",
    description:
      "Vegan, keto, paleo, gluten-free — every restriction handled with delicious alternatives.",
    color: "from-brand-400 to-brand-600",
    bg: "bg-brand-50",
    text: "text-brand-600",
  },
  {
    icon: Clock,
    title: "Time Saving",
    description:
      "Quick recipes with smart ingredient overlap to minimize shopping and prep time.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Tell us about your dietary preferences, allergies, health goals, and cooking habits. Our AI learns your tastes to build perfectly personalized plans.",
  },
  {
    number: "02",
    icon: PencilLine,
    title: "Customize Your Plan",
    description:
      "Choose your plan duration, meal frequency, calorie targets, and preferred cuisine styles. Swap out any meals you don't like with smart alternatives.",
  },
  {
    number: "03",
    icon: ForkKnife,
    title: "Enjoy & Track",
    description:
      "Receive your complete meal plan with recipes, shopping lists, and full nutrition info. Track your progress and regenerate whenever you need.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero ─── */}
      <section className="relative bg-brand-950 animated-gradient grid-pattern min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 pb-32 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Floating icons */}
        <div className="hidden lg:flex absolute top-24 left-24 animate-float">
          <div className="glass-card rounded-2xl p-3 shadow-lg">
            <ChefHat className="w-7 h-7 text-brand-300" />
          </div>
        </div>
        <div className="hidden lg:flex absolute top-32 right-24 animate-float-delayed">
          <div className="glass-card rounded-2xl p-3 shadow-lg">
            <Sparkles className="w-7 h-7 text-brand-300" />
          </div>
        </div>
        <div className="hidden lg:flex absolute bottom-32 left-32 animate-float-delayed">
          <div className="glass-card rounded-2xl p-3 shadow-lg">
            <Leaf className="w-7 h-7 text-brand-300" />
          </div>
        </div>
        <div className="hidden lg:flex absolute bottom-24 right-32 animate-float">
          <div className="glass-card rounded-2xl p-3 shadow-lg">
            <HeartPulse className="w-7 h-7 text-brand-300" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-brand-300 text-sm font-semibold mb-8 border border-brand-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by AI · Personalized for You
          </div>

          <h1 className="text-glow text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Eat Smarter,{" "}
            <span className="gradient-text">Live Better</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered meal plans tailored to your taste, dietary needs, and
            lifestyle — generated in seconds, enjoyed for a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mealplan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-400 to-brand-600 text-white font-bold rounded-2xl hover:from-brand-300 hover:to-brand-500 shadow-xl shadow-brand-500/40 hover:shadow-brand-400/60 transition-all text-base"
            >
              Generate My Meal Plan
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-card text-white font-semibold rounded-2xl hover:bg-white/15 transition-all text-base"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 mt-16 w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl px-4 py-5 text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 53.3C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 rounded-full text-brand-600 text-sm font-semibold mb-4 border border-brand-100">
              <Zap className="w-3.5 h-3.5" />
              Why NutriPlan
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Nutrition that works{" "}
              <span className="gradient-text">for you</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              We combine nutrition science with AI to create plans that actually
              fit your life — not the other way around.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group relative p-8 rounded-3xl border border-slate-100 bg-white hover:border-brand-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <b.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {b.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 rounded-full text-brand-600 text-sm font-semibold mb-4 border border-brand-100">
              <Check className="w-3.5 h-3.5" />
              Simple Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              From zero to meal plan{" "}
              <span className="gradient-text">in minutes</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Three simple steps is all it takes to start eating better today.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center mb-6 shadow-xl shadow-brand-500/30">
                    <step.icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center">
                      <span className="text-xs font-black text-brand-600">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Testimonials ─── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full text-amber-600 text-sm font-semibold mb-4 border border-amber-100">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Loved by thousands
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Real people, real results
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah K.",
              role: "Fitness Enthusiast",
              quote:
                "NutriPlan completely changed how I approach meals. My macros are finally on point and I spend 30% less time in the kitchen.",
              stars: 5,
            },
            {
              name: "Marcus T.",
              role: "Busy Professional",
              quote:
                "I had zero time to plan meals. With NutriPlan I get a full week's plan in seconds. The keto options are fantastic.",
              stars: 5,
            },
            {
              name: "Priya M.",
              role: "Vegan Chef",
              quote:
                "Finally an AI that truly understands plant-based cooking. The variety and flavor combinations are impressive.",
              stars: 5,
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:border-brand-100 transition-all"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4 bg-brand-950 animated-gradient grid-pattern relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-glow text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Ready to transform{" "}
            <span className="gradient-text">your diet?</span>
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Join over 50,000 members who eat smarter, save time, and feel
            better — starting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mealplan"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-brand-400 to-brand-600 text-white font-bold rounded-2xl hover:from-brand-300 hover:to-brand-500 shadow-xl shadow-brand-500/40 transition-all text-base"
            >
              Get Started — It&apos;s Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 glass-card text-white font-semibold rounded-2xl hover:bg-white/15 transition-all text-base"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 py-10 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold">
            Nutri<span className="text-brand-400">Plan</span>
          </span>
        </div>
        <p className="text-brand-700 text-sm">
          © {new Date().getFullYear()} NutriPlan. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
