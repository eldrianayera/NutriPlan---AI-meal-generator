// app/profile/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { availablePlans } from "@/lib/plans";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Crown,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Loader2,
  Sparkles,
  User,
  Mail,
} from "lucide-react";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await fetch("/api/profile/subscription-status");
      const text = await res.text();
      return JSON.parse(text);
    },
  });

  const currentPlan = availablePlans.find(
    (plan) =>
      plan.interval === subscription?.subscription?.subscriptionTier
  );

  const changePlanMutation = useMutation<any, Error, string>({
    mutationFn: async (newPlan: string) => {
      const res = await fetch("/api/profile/change-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPlan }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to change subscription plan.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Subscription plan updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const unsubscribeMutation = useMutation<any, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/profile/unsubscribe", { method: "POST" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to unsubscribe.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      router.push("/subscribe");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleConfirmChangePlan = () => {
    if (selectedPlan) {
      changePlanMutation.mutate(selectedPlan);
      setSelectedPlan("");
    }
  };

  const handleChangePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(e.target.value);
  };

  const handleUnsubscribe = () => {
    if (
      confirm(
        "Are you sure you want to unsubscribe? You will lose access to premium features."
      )
    ) {
      unsubscribeMutation.mutate();
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const isActive = subscription?.subscription?.subscriptionActive;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <Toaster position="top-center" />

      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your account and subscription
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ─── Left: User Info ─── */}
          <div className="lg:col-span-1 space-y-4">
            {/* Avatar card */}
            <div className="bg-gradient-to-b from-brand-700 to-brand-900 rounded-3xl p-6 text-center shadow-xl shadow-brand-900/20">
              <div className="relative inline-block mb-4">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={90}
                    height={90}
                    className="rounded-full ring-4 ring-white/20"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center ring-4 ring-white/20">
                    <span className="text-3xl font-black text-white">
                      {user.firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-400 rounded-full flex items-center justify-center ring-2 ring-brand-800">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-brand-300 text-sm">
                <Mail className="w-3.5 h-3.5" />
                {user.primaryEmailAddress?.emailAddress}
              </div>
            </div>

            {/* Status card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest text-xs">
                  Subscription Status
                </span>
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading…
                </div>
              ) : isActive ? (
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
                  <span className="font-semibold text-brand-700">Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="font-semibold text-slate-400">Inactive</span>
                </div>
              )}
            </div>
          </div>

          {/* ─── Right: Subscription Management ─── */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
              </div>
            ) : isError ? (
              <div className="bg-white rounded-2xl border border-red-100 p-6">
                <p className="text-red-500 text-sm">{error?.message}</p>
              </div>
            ) : subscription ? (
              <>
                {/* Current Plan */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900">Current Plan</h3>
                  </div>
                  <div className="p-6">
                    {currentPlan ? (
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl font-extrabold text-slate-900">
                              {currentPlan.name}
                            </span>
                            {isActive ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-100">
                                <CheckCircle className="w-3 h-3" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                                <XCircle className="w-3 h-3" />
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-slate-500 text-sm">
                            ${currentPlan.amount}{" "}
                            <span className="text-slate-400">
                              / {currentPlan.interval}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {currentPlan.features.map((f, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full border border-brand-100"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-sm italic">
                        No active plan found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Change Plan */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-brand-500" />
                    <h3 className="font-bold text-slate-900">Change Plan</h3>
                  </div>
                  <div className="p-6">
                    <div className="relative mb-4">
                      <select
                        onChange={handleChangePlan}
                        defaultValue={currentPlan?.interval || ""}
                        disabled={changePlanMutation.isPending}
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 disabled:opacity-50 transition"
                      >
                        <option value="" disabled>
                          Select a new plan
                        </option>
                        {availablePlans.map((plan, i) => (
                          <option key={i} value={plan.interval}>
                            {plan.name} — ${plan.amount} / {plan.interval}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <button
                      onClick={handleConfirmChangePlan}
                      disabled={!selectedPlan || changePlanMutation.isPending}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl text-sm hover:from-brand-400 hover:to-brand-500 shadow-md shadow-brand-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      {changePlanMutation.isPending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Updating…
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h3 className="font-bold text-slate-900">Danger Zone</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-500 text-sm mb-4">
                      Once you unsubscribe, you&apos;ll immediately lose access
                      to premium features and your meal plan data.
                    </p>
                    <button
                      onClick={handleUnsubscribe}
                      disabled={unsubscribeMutation.isPending}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm shadow-md shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {unsubscribeMutation.isPending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Unsubscribing…
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          Unsubscribe
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                <Crown className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">
                  You are not subscribed to any plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
