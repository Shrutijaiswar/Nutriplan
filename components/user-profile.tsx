"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserData } from "@/app/page"
import { ArrowLeft, User } from "lucide-react"

interface UserProfileProps {
  onComplete: (data: UserData) => void
}

export function UserProfile({ onComplete }: UserProfileProps) {
  const [formData, setFormData] = useState<Partial<UserData>>({
    healthConditions: [],
    dietaryRestrictions: [],
    goals: [],
  })

  const healthConditions = [
    "Diabetes",
    "High Blood Pressure",
    "High Cholesterol",
    "Heart Disease",
    "Kidney Disease",
    "Liver Disease",
    "Thyroid Issues",
    "PCOS",
    "Celiac Disease",
    "IBS",
    "Food Allergies",
    "None",
  ]

  const dietaryRestrictions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Low-Sodium",
    "Low-Sugar",
    "Keto",
    "Paleo",
    "Mediterranean",
    "None",
  ]

  const goals = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Building",
    "Maintenance",
    "Improved Energy",
    "Better Digestion",
    "Heart Health",
    "Blood Sugar Control",
  ]

  const handleConditionChange = (condition: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: checked
        ? [...(prev.healthConditions || []), condition]
        : (prev.healthConditions || []).filter((c) => c !== condition),
    }))
  }

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...(prev.dietaryRestrictions || []), restriction]
        : (prev.dietaryRestrictions || []).filter((r) => r !== restriction),
    }))
  }

  const handleGoalChange = (goal: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      goals: checked ? [...(prev.goals || []), goal] : (prev.goals || []).filter((g) => g !== goal),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.age && formData.weight && formData.height && formData.gender && formData.activityLevel) {
      onComplete(formData as UserData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => window.location.reload()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="bg-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h1>
          <p className="text-gray-600">This information helps us create your personalized meal plan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your physical characteristics and activity level</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={formData.weight || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={formData.height || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, height: Number.parseInt(e.target.value) }))}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Activity Level</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, activityLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (very hard exercise, physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Health Conditions</CardTitle>
              <CardDescription>Select any health conditions that may affect your nutrition needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {healthConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.healthConditions?.includes(condition)}
                      onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                    />
                    <Label htmlFor={condition} className="text-sm">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dietary Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences & Restrictions</CardTitle>
              <CardDescription>Select your dietary preferences and any restrictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {dietaryRestrictions.map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={restriction}
                      checked={formData.dietaryRestrictions?.includes(restriction)}
                      onCheckedChange={(checked) => handleRestrictionChange(restriction, checked as boolean)}
                    />
                    <Label htmlFor={restriction} className="text-sm">
                      {restriction}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Health & Fitness Goals</CardTitle>
              <CardDescription>What are you hoping to achieve with your meal plan?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.goals?.includes(goal)}
                      onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                    />
                    <Label htmlFor={goal} className="text-sm">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700 px-8">
              Generate My Meal Plan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
