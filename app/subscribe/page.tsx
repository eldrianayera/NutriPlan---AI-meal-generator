// app/subscribe/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { availablePlans } from "@/lib/plans";
import toast, { Toaster } from "react-hot-toast";
import { Check, Sparkles, Zap, Shield, Star } from "lucide-react";

type SubscribeResponse = { url: string };
type SubscribeError = { error: string };

const subscribeToPlan = async ({
  planType,
  userId,
  email,
}: {
  planType: string;
  userId: string;
  email: string;
}): Promise<SubscribeResponse> => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planType, userId, email }),
  });

  if (!res.ok) {
    const errorData: SubscribeError = await res.json();
    throw new Error(errorData.error || "Something went wrong.");
  }

  return res.json();
};

const planIcons = [Zap, Sparkles, Star];
const planAccents = [
  {
    gradient: "from-slate-100 to-slate-50",
    border: "border-slate-200",
    btn: "bg-slate-900 hover:bg-slate-700 text-white",
    isDark: false,
    ring: "",
  },
  {
    gradient: "from-brand-600 to-brand-800",
    border: "border-brand-500",
    btn: "bg-white hover:bg-brand-50 text-brand-700",
    isDark: true,
    ring: "ring-4 ring-brand-400/30",
  },
  {
    gradient: "from-slate-800 to-slate-900",
    border: "border-slate-700",
    btn: "bg-brand-500 hover:bg-brand-400 text-white",
    isDark: true,
    ring: "",
  },
];

export default function SubscribePage() {
  const { user } = useUser();
  const router = useRouter();

  const userId = user?.id;
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  const mutation = useMutation<SubscribeResponse, Error, { planType: string }>({
    mutationFn: async ({ planType }) => {
      if (!userId) throw new Error("User not signed in.");
      return subscribeToPlan({ planType, userId, email });
    },
    onMutate: () => {
      toast.loading("Processing your subscription...", { id: "subscribe" });
    },
    onSuccess: (data) => {
      toast.success("Redirecting to checkout!", { id: "subscribe" });
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.", {
        id: "subscribe",
      });
    },
  });

  const handleSubscribe = (planType: string) => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }
    mutation.mutate({ planType });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-brand-950 animated-gradient grid-pattern py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-brand-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-brand-300 text-sm font-semibold mb-6 border border-brand-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-glow text-5xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Choose your <span className="gradient-text">plan</span>
          </h1>
          <p className="text-lg text-white/65 max-w-lg mx-auto">
            Start with a week, commit to a month, or save big with a year.
            Cancel anytime, no questions asked.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 pb-24">
        {/* Test Mode Banner */}
        <div className="max-w-xl mx-auto mb-8 relative z-10">
          <div className="flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            <span className="mt-0.5">⚠️</span>
            <div>
              <span className="font-semibold">Test mode — </span>
              use card{" "}
              <span className="font-mono font-semibold">
                4242 4242 4242 4242
              </span>
              , any future expiry, and any 3-digit CVC.
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center max-w-[90%] m-auto">
          {availablePlans.map((plan, i) => {
            const accent = planAccents[i];
            const Icon = planIcons[i];
            const isPopular = plan.isPopular;

            return (
              <div
                key={i}
                className={`
                  relative rounded-3xl border transition-all duration-300
                  ${accent.ring}
                  ${accent.border}
                  ${isPopular ? "scale-105 shadow-2xl shadow-brand-500/30 z-10 mt-5" : "shadow-lg hover:shadow-xl"}
                `}
              >
                {/* Popular badge — outside overflow-hidden so it never gets clipped */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-5 py-1.5 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full text-xs font-bold text-white shadow-lg shadow-brand-500/40 tracking-wide uppercase whitespace-nowrap">
                      ✦ Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br ${accent.gradient} rounded-3xl p-8 ${accent.isDark ? "text-white" : "text-slate-900"}`}
                >
                  {/* Icon + Plan name */}
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        accent.isDark
                          ? "bg-white/15"
                          : "bg-gradient-to-br from-brand-400 to-brand-600"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-bold ${accent.isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-2 flex items-end gap-1">
                    <span
                      className={`text-5xl font-black tracking-tight ${accent.isDark ? "text-white" : "text-slate-900"}`}
                    >
                      ${plan.amount}
                    </span>
                    <span
                      className={`text-base font-semibold mb-2 ${accent.isDark ? "text-white/60" : "text-slate-500"}`}
                    >
                      /{plan.interval}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-6 leading-relaxed ${accent.isDark ? "text-white/65" : "text-slate-500"}`}
                  >
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            accent.isDark ? "bg-white/20" : "bg-brand-100"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${accent.isDark ? "text-white" : "text-brand-600"}`}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${accent.isDark ? "text-white/80" : "text-slate-700"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSubscribe(plan.interval)}
                    disabled={mutation.isPending}
                    className={`
                      w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all
                      ${accent.btn}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      hover:scale-[1.02] active:scale-[0.98]
                      shadow-md
                    `}
                  >
                    {mutation.isPending ? "Processing..." : `Get ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-500" />
            Secure Stripe Checkout
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-500" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            Instant access after payment
          </div>
        </div>
      </div>
    </div>
  );
}
