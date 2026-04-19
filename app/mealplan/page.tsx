"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  ChefHat,
  Sparkles,
  Flame,
  Leaf,
  AlertCircle,
  UtensilsCrossed,
  Coffee,
  Sun,
  Moon,
  Apple,
  Loader2,
} from "lucide-react";

interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}

interface WeeklyMealPlan {
  [day: string]: DailyMealPlan;
}

interface MealPlanResponse {
  mealPlan?: WeeklyMealPlan;
  error?: string;
}

interface MealPlanInput {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: boolean;
  days?: number;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const mealConfig = {
  Breakfast: {
    icon: Coffee,
    label: "Breakfast",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    dot: "bg-amber-400",
  },
  Lunch: {
    icon: Sun,
    label: "Lunch",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    dot: "bg-orange-400",
  },
  Dinner: {
    icon: Moon,
    label: "Dinner",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    dot: "bg-indigo-400",
  },
  Snacks: {
    icon: Apple,
    label: "Snacks",
    color: "text-brand-600",
    bg: "bg-brand-50",
    border: "border-brand-100",
    dot: "bg-brand-400",
  },
};

export default function MealPlanDashboard() {
  const [dietType, setDietType] = useState("");
  const [calories, setCalories] = useState<number>(2000);
  const [allergies, setAllergies] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [snacks, setSnacks] = useState(false);

  const mutation = useMutation<MealPlanResponse, Error, MealPlanInput>({
    mutationFn: async (payload: MealPlanInput) => {
      const response = await fetch("/api/generate-mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData: MealPlanResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate meal plan.");
      }
      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ dietType, calories, allergies, cuisine, snacks, days: 7 });
  };

  const getMealPlanForDay = (day: string): DailyMealPlan | undefined =>
    mutation.data?.mealPlan?.[day];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ─── Sidebar Form ─── */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-gradient-to-b from-brand-700 to-brand-900 rounded-3xl shadow-2xl shadow-brand-900/30 overflow-hidden sticky top-24">
              {/* Form header */}
              <div className="px-6 pt-7 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-lg font-bold text-white">Meal Generator</h1>
                </div>
                <p className="text-brand-300 text-sm">
                  Fill in your preferences to get started
                </p>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                {/* Diet Type */}
                <div>
                  <label className="block text-xs font-semibold text-brand-300 uppercase tracking-widest mb-2">
                    Diet Type
                  </label>
                  <input
                    type="text"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    required
                    placeholder="Vegetarian, Keto, Paleo…"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/35 border border-white/15 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400/50 text-sm transition"
                  />
                </div>

                {/* Calories */}
                <div>
                  <label className="block text-xs font-semibold text-brand-300 uppercase tracking-widest mb-2">
                    Daily Calories
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <Flame className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <span className="text-2xl font-black text-white">{calories}</span>
                    <span className="text-brand-400 text-sm">kcal</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-brand-400 mt-1">
                    <span>500</span>
                    <span>5000</span>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-xs font-semibold text-brand-300 uppercase tracking-widest mb-2">
                    Allergies / Restrictions
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Nuts, Dairy, Gluten…"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/35 border border-white/15 focus:outline-none focus:ring-2 focus:ring-brand-400/50 text-sm transition"
                  />
                </div>

                {/* Cuisine */}
                <div>
                  <label className="block text-xs font-semibold text-brand-300 uppercase tracking-widest mb-2">
                    Preferred Cuisine
                  </label>
                  <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Italian, Asian, Mediterranean…"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/35 border border-white/15 focus:outline-none focus:ring-2 focus:ring-brand-400/50 text-sm transition"
                  />
                </div>

                {/* Snacks toggle */}
                <div className="flex items-center justify-between py-3 px-4 bg-white/10 rounded-xl border border-white/15">
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-brand-300" />
                    <span className="text-sm font-medium text-white">
                      Include Snacks
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={snacks}
                      onChange={(e) => setSnacks(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-brand-400 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-brand-400 to-brand-500 text-white font-bold rounded-xl hover:from-brand-300 hover:to-brand-400 shadow-lg shadow-brand-900/30 hover:shadow-brand-900/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Meal Plan
                    </>
                  )}
                </button>
              </form>

              {/* Error */}
              {mutation.isError && (
                <div className="mx-6 mb-6 p-3 bg-red-500/20 border border-red-400/30 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-red-300 text-sm">
                    {mutation.error.message}
                  </span>
                </div>
              )}
            </div>
          </aside>

          {/* ─── Results ─── */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/30">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Your Weekly Plan
                </h2>
                <p className="text-slate-500 text-sm">
                  {mutation.isSuccess
                    ? "Your personalized meal plan is ready"
                    : "Fill out the form to generate your plan"}
                </p>
              </div>
            </div>

            {mutation.isPending ? (
              /* Loading state */
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-24 px-4">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-brand-500" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Creating your meal plan…
                </h3>
                <p className="text-slate-500 text-sm text-center max-w-xs">
                  Our AI is crafting a personalized week of delicious meals for you.
                </p>
              </div>
            ) : mutation.isSuccess && mutation.data.mealPlan ? (
              /* Meal plan grid */
              <div className="space-y-4">
                {daysOfWeek.map((day) => {
                  const mealPlan = getMealPlanForDay(day);
                  return (
                    <div
                      key={day}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                      {/* Day header */}
                      <div className="px-5 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-400" />
                        <h3 className="font-bold text-slate-900">{day}</h3>
                      </div>

                      {mealPlan ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-0 divide-x divide-slate-100">
                          {(
                            ["Breakfast", "Lunch", "Dinner", "Snacks"] as const
                          ).map((mealKey) => {
                            const meal = mealPlan[mealKey];
                            const config = mealConfig[mealKey];
                            const Icon = config.icon;
                            if (!meal) return null;
                            return (
                              <div key={mealKey} className="p-4">
                                <div
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${config.bg} ${config.border} border mb-2`}
                                >
                                  <Icon
                                    className={`w-3 h-3 ${config.color}`}
                                  />
                                  <span
                                    className={`text-xs font-semibold ${config.color}`}
                                  >
                                    {config.label}
                                  </span>
                                </div>
                                <p className="text-slate-700 text-sm leading-snug">
                                  {meal}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="px-5 py-4 text-slate-400 text-sm italic">
                          No meals planned for this day
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <UtensilsCrossed className="w-9 h-9 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  No meal plan yet
                </h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Fill in your preferences on the left and click{" "}
                  <span className="font-semibold text-brand-600">
                    Generate Meal Plan
                  </span>{" "}
                  to get started.
                </p>
                <div className="mt-8 flex gap-4 flex-wrap justify-center">
                  {["Vegan", "Keto", "Mediterranean", "Paleo"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-semibold rounded-full border border-brand-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
