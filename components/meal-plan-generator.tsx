"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { UserData, MealPlan } from "@/app/page"
import { ArrowLeft, Brain, Loader2 } from "lucide-react"

interface MealPlanGeneratorProps {
  userData: UserData
  onMealPlanGenerated: (plan: MealPlan[]) => void
  onBack: () => void
}

export function MealPlanGenerator({ userData, onMealPlanGenerated, onBack }: MealPlanGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const generateMealPlan = async () => {
    setIsGenerating(true)
    setProgress(0)
    setCurrentStep("Analyzing your profile...")

    try {
      // Simulate progress updates
      const steps = [
        "Analyzing your profile...",
        "Calculating nutritional needs...",
        "Considering health conditions...",
        "Selecting appropriate foods...",
        "Creating balanced meals...",
        "Finalizing your meal plan...",
      ]

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i])
        setProgress((i + 1) * 16.67)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const response = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate meal plan")
      }

      const mealPlan = await response.json()
      setProgress(100)
      setCurrentStep("Complete!")

      setTimeout(() => {
        onMealPlanGenerated(mealPlan)
      }, 500)
    } catch (error) {
      console.error("Error generating meal plan:", error)
      setCurrentStep("Error generating meal plan. Please try again.")
      setIsGenerating(false)
    }
  }

  // Calculate BMR and daily calories
  const calculateBMR = () => {
    const { weight, height, age, gender } = userData
    let bmr: number

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    }

    return Math.round(bmr * activityMultipliers[userData.activityLevel as keyof typeof activityMultipliers])
  }

  const dailyCalories = calculateBMR()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="bg-purple-500 p-3 rounded-full w-fit mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Meal Plan Generation</h1>
          <p className="text-gray-600">Our AI is creating your personalized nutrition plan</p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Profile Summary</CardTitle>
            <CardDescription>Based on the information you provided</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Info</h3>
              <p className="text-sm text-gray-600">Age: {userData.age} years</p>
              <p className="text-sm text-gray-600">Weight: {userData.weight} kg</p>
              <p className="text-sm text-gray-600">Height: {userData.height} cm</p>
              <p className="text-sm text-gray-600">Activity: {userData.activityLevel}</p>
              <p className="text-sm text-gray-600 font-medium mt-2">Daily Calorie Target: {dailyCalories} calories</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Health Considerations</h3>
              <div className="space-y-1">
                {userData.healthConditions.length > 0 && (
                  <p className="text-sm text-gray-600">Health: {userData.healthConditions.join(", ")}</p>
                )}
                {userData.dietaryRestrictions.length > 0 && (
                  <p className="text-sm text-gray-600">Diet: {userData.dietaryRestrictions.join(", ")}</p>
                )}
                {userData.goals.length > 0 && (
                  <p className="text-sm text-gray-600">Goals: {userData.goals.join(", ")}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Status */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            {!isGenerating ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to Generate Your Meal Plan</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Demo Mode:</strong> This app creates personalized meal plans based on your profile. In
                    production, this would use AI to generate even more customized recommendations.
                  </p>
                </div>
                <p className="text-gray-600 mb-6">
                  Our system will analyze your profile and create a personalized 7-day meal plan tailored to your
                  specific needs and goals.
                </p>
                <Button onClick={generateMealPlan} size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Brain className="h-5 w-5 mr-2" />
                  Generate My Meal Plan
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
                <h3 className="text-xl font-semibold">Generating Your Meal Plan</h3>
                <p className="text-gray-600">{currentStep}</p>
                <div className="max-w-md mx-auto">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Personalized Nutrition</h4>
              <p className="text-sm text-gray-600">Tailored to your body composition and goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Health-Conscious</h4>
              <p className="text-sm text-gray-600">Considers your medical conditions and restrictions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Balanced Meals</h4>
              <p className="text-sm text-gray-600">Optimal macro and micronutrient distribution</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
