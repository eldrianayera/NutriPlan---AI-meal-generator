"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
        headers: {
          "Content-Type": "application/json",
        },
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
    const payload: MealPlanInput = {
      dietType,
      calories,
      allergies,
      cuisine,
      snacks,
      days: 7,
    };
    mutation.mutate(payload);
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getMealPlanForDay = (day: string): DailyMealPlan | undefined => {
    if (!mutation.data?.mealPlan) return undefined;
    return mutation.data.mealPlan[day];
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Form Section - Card */}
        <div className="w-full lg:w-1/3 bg-primary text-background p-6 rounded-xl shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Meal Plan Generator</h1>
            <p className="mt-2">Create your perfect weekly meal plan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="dietType" className="block font-medium">
                Diet Type
              </label>
              <input
                type="text"
                id="dietType"
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-background text-foreground border border-foreground/20"
                placeholder="Vegetarian, Keto, etc."
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="calories" className="block font-medium">
                Daily Calories
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="calories"
                  min="500"
                  max="5000"
                  step="100"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span>500</span>
                  <span className="font-medium">{calories}</span>
                  <span>5000</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="allergies" className="block font-medium">
                Allergies/Restrictions
              </label>
              <input
                type="text"
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-3 rounded-lg bg-background text-foreground border border-foreground/20"
                placeholder="Nuts, Dairy, etc."
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cuisine" className="block font-medium">
                Preferred Cuisine
              </label>
              <input
                type="text"
                id="cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-3 rounded-lg bg-background text-foreground border border-foreground/20"
                placeholder="Italian, Asian, etc."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="snacks"
                checked={snacks}
                onChange={(e) => setSnacks(e.target.checked)}
                className="w-5 h-5 rounded border-foreground/30"
              />
              <label htmlFor="snacks" className="ml-3">
                Include Snacks
              </label>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full p-3 rounded-lg font-bold bg-background text-primary transition-transform hover:scale-[1.02] ${
                mutation.isPending ? "opacity-70" : ""
              }`}
            >
              {mutation.isPending ? "Generating..." : "Generate Meal Plan"}
            </button>
          </form>

          {mutation.isError && (
            <div className="mt-4 p-3 rounded-lg bg-background text-foreground">
              {mutation.error.message}
            </div>
          )}
        </div>

        {/* Results Section - Card */}
        <div className="w-full lg:w-2/3 bg-background border border-foreground/10 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Your Weekly Plan
            </h2>

            {mutation.isSuccess && mutation.data.mealPlan ? (
              <div className="space-y-5">
                {daysOfWeek.map((day) => {
                  const mealPlan = getMealPlanForDay(day);
                  return (
                    <div
                      key={day}
                      className="border border-foreground/10 rounded-lg p-5"
                    >
                      <h3 className="text-xl font-bold text-primary mb-3">
                        {day}
                      </h3>
                      {mealPlan ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mealPlan.Breakfast && (
                            <div className="p-3 border border-foreground/10 rounded-lg">
                              <h4 className="font-medium mb-1">Breakfast</h4>
                              <p>{mealPlan.Breakfast}</p>
                            </div>
                          )}
                          {mealPlan.Lunch && (
                            <div className="p-3 border border-foreground/10 rounded-lg">
                              <h4 className="font-medium mb-1">Lunch</h4>
                              <p>{mealPlan.Lunch}</p>
                            </div>
                          )}
                          {mealPlan.Dinner && (
                            <div className="p-3 border border-foreground/10 rounded-lg">
                              <h4 className="font-medium mb-1">Dinner</h4>
                              <p>{mealPlan.Dinner}</p>
                            </div>
                          )}
                          {mealPlan.Snacks && (
                            <div className="p-3 border border-foreground/10 rounded-lg">
                              <h4 className="font-medium mb-1">Snacks</h4>
                              <p>{mealPlan.Snacks}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground/70">
                          No meals planned for this day
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : mutation.isPending ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Creating your personalized meal plan...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-foreground/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4"
                >
                  <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"></path>
                  <path d="M12 19H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-5"></path>
                  <path d="m9 10 2 2 4-4"></path>
                </svg>
                <p>Your generated meal plan will appear here</p>
                <p className="text-sm mt-2">
                  Fill out the form and click "Generate Meal Plan"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
