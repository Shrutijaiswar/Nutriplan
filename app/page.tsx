"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@/components/user-profile"
import { MealPlanGenerator } from "@/components/meal-plan-generator"
import { MealPlanDisplay } from "@/components/meal-plan-display"
import { Utensils, User, Brain, Heart } from "lucide-react"

export interface UserData {
  age: number
  weight: number
  height: number
  gender: string
  activityLevel: string
  healthConditions: string[]
  dietaryRestrictions: string[]
  goals: string[]
}

export interface MealPlan {
  day: string
  meals: {
    breakfast: { name: string; calories: number; description: string }
    lunch: { name: string; calories: number; description: string }
    dinner: { name: string; calories: number; description: string }
    snacks: { name: string; calories: number; description: string }[]
  }
  totalCalories: number
  macros: { protein: number; carbs: number; fat: number }
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "profile" | "generate" | "results">("welcome")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [mealPlan, setMealPlan] = useState<MealPlan[] | null>(null)

  const handleProfileComplete = (data: UserData) => {
    setUserData(data)
    setCurrentStep("generate")
  }

  const handleMealPlanGenerated = (plan: MealPlan[]) => {
    setMealPlan(plan)
    setCurrentStep("results")
  }

  if (currentStep === "profile") {
    return <UserProfile onComplete={handleProfileComplete} />
  }

  if (currentStep === "generate") {
    return (
      <MealPlanGenerator
        userData={userData!}
        onMealPlanGenerated={handleMealPlanGenerated}
        onBack={() => setCurrentStep("profile")}
      />
    )
  }

  if (currentStep === "results") {
    return (
      <MealPlanDisplay
        mealPlan={mealPlan!}
        userData={userData!}
        onGenerateNew={() => setCurrentStep("generate")}
        onEditProfile={() => setCurrentStep("profile")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full mr-3">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI NutriPlan</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized meal planning powered by AI, tailored to your body needs and health conditions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>Advanced AI analyzes your profile to create optimal meal plans</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Health-Focused</CardTitle>
              <CardDescription>Considers your health conditions and dietary restrictions</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Personalized</CardTitle>
              <CardDescription>Customized based on your age, weight, activity level, and goals</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main CTA */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Started with Your Personalized Meal Plan</CardTitle>
            <CardDescription className="text-lg">
              Tell us about yourself and let our AI create the perfect nutrition plan for you
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setCurrentStep("profile")}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              Create My Meal Plan
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What You'll Get</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              7-Day Meal Plans
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Calorie Tracking
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Macro Breakdown
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Health Condition Support
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Dietary Restrictions
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Shopping Lists
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
