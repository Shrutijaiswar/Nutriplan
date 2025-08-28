"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { MealPlan, UserData } from "@/app/page"
import { ArrowLeft, Calendar, Target, Utensils, ShoppingCart, Download } from "lucide-react"

interface MealPlanDisplayProps {
  mealPlan: MealPlan[]
  userData: UserData
  onGenerateNew: () => void
  onEditProfile: () => void
}

export function MealPlanDisplay({ mealPlan, userData, onGenerateNew, onEditProfile }: MealPlanDisplayProps) {
  const [selectedDay, setSelectedDay] = useState(0)

  const totalWeeklyCalories = mealPlan.reduce((sum, day) => sum + day.totalCalories, 0)
  const avgDailyCalories = Math.round(totalWeeklyCalories / 7)

  const generateShoppingList = () => {
    // This would generate a shopping list based on the meal plan
    alert("Shopping list feature coming soon!")
  }

  const downloadMealPlan = () => {
    // This would generate a PDF or export the meal plan
    alert("Download feature coming soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onEditProfile}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateShoppingList}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shopping List
            </Button>
            <Button variant="outline" onClick={downloadMealPlan}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={onGenerateNew} className="bg-green-600 hover:bg-green-700">
              Generate New Plan
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="bg-green-500 p-3 rounded-full w-fit mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Meal Plan</h1>
          <p className="text-gray-600">7-day nutrition plan tailored to your needs</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Daily Target</h3>
              <p className="text-2xl font-bold text-blue-600">{avgDailyCalories}</p>
              <p className="text-sm text-gray-600">calories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">P</span>
              </div>
              <h3 className="font-semibold">Protein</h3>
              <p className="text-2xl font-bold text-red-600">
                {Math.round(mealPlan.reduce((sum, day) => sum + day.macros.protein, 0) / 7)}g
              </p>
              <p className="text-sm text-gray-600">daily avg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">C</span>
              </div>
              <h3 className="font-semibold">Carbs</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {Math.round(mealPlan.reduce((sum, day) => sum + day.macros.carbs, 0) / 7)}g
              </p>
              <p className="text-sm text-gray-600">daily avg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">F</span>
              </div>
              <h3 className="font-semibold">Fat</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(mealPlan.reduce((sum, day) => sum + day.macros.fat, 0) / 7)}g
              </p>
              <p className="text-sm text-gray-600">daily avg</p>
            </CardContent>
          </Card>
        </div>

        {/* Meal Plan Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="h-5 w-5 mr-2" />
              Weekly Meal Plan
            </CardTitle>
            <CardDescription>Click on each day to view detailed meal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedDay.toString()} onValueChange={(value) => setSelectedDay(Number.parseInt(value))}>
              <TabsList className="grid w-full grid-cols-7">
                {mealPlan.map((day, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="text-xs">
                    {day.day}
                  </TabsTrigger>
                ))}
              </TabsList>

              {mealPlan.map((day, index) => (
                <TabsContent key={index} value={index.toString()} className="mt-6">
                  <div className="space-y-6">
                    {/* Day Summary */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="text-xl font-bold">{day.day}</h3>
                        <p className="text-gray-600">Total: {day.totalCalories} calories</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="secondary">P: {day.macros.protein}g</Badge>
                        <Badge variant="secondary">C: {day.macros.carbs}g</Badge>
                        <Badge variant="secondary">F: {day.macros.fat}g</Badge>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Breakfast */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">🌅 Breakfast</CardTitle>
                          <CardDescription>{day.meals.breakfast.calories} calories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2">{day.meals.breakfast.name}</h4>
                          <p className="text-sm text-gray-600">{day.meals.breakfast.description}</p>
                        </CardContent>
                      </Card>

                      {/* Lunch */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">☀️ Lunch</CardTitle>
                          <CardDescription>{day.meals.lunch.calories} calories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2">{day.meals.lunch.name}</h4>
                          <p className="text-sm text-gray-600">{day.meals.lunch.description}</p>
                        </CardContent>
                      </Card>

                      {/* Dinner */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">🌙 Dinner</CardTitle>
                          <CardDescription>{day.meals.dinner.calories} calories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2">{day.meals.dinner.name}</h4>
                          <p className="text-sm text-gray-600">{day.meals.dinner.description}</p>
                        </CardContent>
                      </Card>

                      {/* Snacks */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">🍎 Snacks</CardTitle>
                          <CardDescription>
                            {day.meals.snacks.reduce((sum, snack) => sum + snack.calories, 0)} calories
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {day.meals.snacks.map((snack, snackIndex) => (
                              <div key={snackIndex}>
                                <h4 className="font-semibold text-sm">{snack.name}</h4>
                                <p className="text-xs text-gray-600">{snack.description}</p>
                                <p className="text-xs text-gray-500">{snack.calories} cal</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Health Considerations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Health Considerations</CardTitle>
            <CardDescription>This meal plan was designed with your specific needs in mind</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Health Conditions</h4>
                <div className="flex flex-wrap gap-1">
                  {userData.healthConditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dietary Restrictions</h4>
                <div className="flex flex-wrap gap-1">
                  {userData.dietaryRestrictions.map((restriction, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Goals</h4>
                <div className="flex flex-wrap gap-1">
                  {userData.goals.map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
