import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

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

    // For demo purposes, we'll create a personalized meal plan without AI
    // In production, you would add your OpenAI API key to use AI generation
    const mealPlan = createPersonalizedMealPlan(userData, dailyCalories)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json(mealPlan)
  } catch (error) {
    console.error("Error generating meal plan:", error)
    return NextResponse.json({ error: "Failed to generate meal plan" }, { status: 500 })
  }
}

function createPersonalizedMealPlan(userData: any, dailyCalories: number) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Adjust meals based on dietary restrictions and health conditions
  const isVegetarian = userData.dietaryRestrictions.includes("Vegetarian")
  const isVegan = userData.dietaryRestrictions.includes("Vegan")
  const isGlutenFree = userData.dietaryRestrictions.includes("Gluten-Free")
  const isDairyFree = userData.dietaryRestrictions.includes("Dairy-Free")
  const isKeto = userData.dietaryRestrictions.includes("Keto")
  const hasDiabetes = userData.healthConditions.includes("Diabetes")
  const hasHeartDisease = userData.healthConditions.includes("Heart Disease")

  // Adjust macros based on goals and conditions
  let proteinRatio = 0.25
  let carbRatio = 0.45
  let fatRatio = 0.3

  if (userData.goals.includes("Muscle Building")) {
    proteinRatio = 0.3
    carbRatio = 0.4
    fatRatio = 0.3
  } else if (userData.goals.includes("Weight Loss")) {
    proteinRatio = 0.3
    carbRatio = 0.35
    fatRatio = 0.35
  } else if (isKeto) {
    proteinRatio = 0.25
    carbRatio = 0.05
    fatRatio = 0.7
  }

  const mealPlans = {
    standard: {
      breakfast: [
        {
          name: "Oatmeal with Berries and Nuts",
          description: "Steel-cut oats topped with fresh blueberries, sliced almonds, and a drizzle of honey",
        },
        {
          name: "Greek Yogurt Parfait",
          description: "Greek yogurt layered with granola, fresh berries, and a touch of maple syrup",
        },
        {
          name: "Scrambled Eggs with Avocado Toast",
          description: "Fluffy scrambled eggs served with whole grain toast topped with mashed avocado",
        },
        {
          name: "Smoothie Bowl",
          description: "Blended banana and berry smoothie topped with granola, coconut flakes, and chia seeds",
        },
        {
          name: "Whole Grain Pancakes",
          description: "Fluffy whole wheat pancakes with fresh fruit and a light drizzle of pure maple syrup",
        },
      ],
      lunch: [
        {
          name: "Grilled Chicken Caesar Salad",
          description: "Romaine lettuce with grilled chicken breast, parmesan cheese, and light Caesar dressing",
        },
        {
          name: "Quinoa Buddha Bowl",
          description: "Quinoa base with roasted vegetables, chickpeas, and tahini dressing",
        },
        {
          name: "Turkey and Hummus Wrap",
          description: "Whole wheat wrap with lean turkey, hummus, vegetables, and mixed greens",
        },
        {
          name: "Lentil Soup with Whole Grain Roll",
          description: "Hearty lentil soup packed with vegetables served with a whole grain dinner roll",
        },
        {
          name: "Salmon Salad",
          description: "Mixed greens with baked salmon, cherry tomatoes, cucumber, and olive oil vinaigrette",
        },
      ],
      dinner: [
        {
          name: "Baked Salmon with Sweet Potato",
          description: "Herb-crusted salmon with roasted sweet potato and steamed broccoli",
        },
        { name: "Lean Beef Stir-Fry", description: "Lean beef strips with mixed vegetables over brown rice" },
        {
          name: "Chicken and Vegetable Curry",
          description: "Mild chicken curry with mixed vegetables served over quinoa",
        },
        { name: "Baked Cod with Quinoa", description: "Lemon-herb baked cod with quinoa pilaf and roasted asparagus" },
        {
          name: "Turkey Meatballs with Zucchini Noodles",
          description: "Lean turkey meatballs in marinara sauce over spiralized zucchini",
        },
      ],
    },
    vegetarian: {
      breakfast: [
        {
          name: "Chia Seed Pudding",
          description: "Overnight chia pudding with almond milk, vanilla, and fresh berries",
        },
        { name: "Veggie Scramble", description: "Scrambled eggs with spinach, tomatoes, and bell peppers" },
        {
          name: "Avocado Toast with Hemp Seeds",
          description: "Whole grain toast with mashed avocado, hemp seeds, and everything bagel seasoning",
        },
      ],
      lunch: [
        {
          name: "Quinoa Stuffed Bell Peppers",
          description: "Bell peppers stuffed with quinoa, black beans, corn, and cheese",
        },
        {
          name: "Caprese Salad with Chickpeas",
          description: "Fresh mozzarella, tomatoes, basil, and chickpeas with balsamic glaze",
        },
        {
          name: "Vegetable Lentil Curry",
          description: "Spiced lentil curry with mixed vegetables served over brown rice",
        },
      ],
      dinner: [
        { name: "Eggplant Parmesan", description: "Baked eggplant layered with marinara sauce and mozzarella cheese" },
        {
          name: "Black Bean and Sweet Potato Tacos",
          description: "Soft tacos with seasoned black beans, roasted sweet potato, and avocado",
        },
        {
          name: "Mushroom and Spinach Risotto",
          description: "Creamy arborio rice with sautéed mushrooms and fresh spinach",
        },
      ],
    },
    keto: {
      breakfast: [
        { name: "Keto Avocado Eggs", description: "Baked avocado halves with eggs, topped with cheese and herbs" },
        {
          name: "Bacon and Spinach Omelet",
          description: "Three-egg omelet with crispy bacon, spinach, and cheddar cheese",
        },
      ],
      lunch: [
        { name: "Keto Cobb Salad", description: "Mixed greens with grilled chicken, bacon, blue cheese, and avocado" },
        {
          name: "Zucchini Lasagna",
          description: "Layers of zucchini, ground beef, and cheese with sugar-free marinara",
        },
      ],
      dinner: [
        { name: "Butter Garlic Steak", description: "Grilled ribeye steak with garlic butter and sautéed mushrooms" },
        { name: "Keto Salmon with Asparagus", description: "Pan-seared salmon with butter-roasted asparagus" },
      ],
    },
  }

  // Select appropriate meal plan based on dietary restrictions
  let selectedMeals = mealPlans.standard
  if (isKeto) {
    selectedMeals = mealPlans.keto
  } else if (isVegetarian || isVegan) {
    selectedMeals = mealPlans.vegetarian
  }

  return days.map((day, index) => {
    const breakfastCalories = Math.round(dailyCalories * 0.25)
    const lunchCalories = Math.round(dailyCalories * 0.35)
    const dinnerCalories = Math.round(dailyCalories * 0.3)
    const snackCalories = Math.round(dailyCalories * 0.1)

    const breakfast = selectedMeals.breakfast[index % selectedMeals.breakfast.length]
    const lunch = selectedMeals.lunch[index % selectedMeals.lunch.length]
    const dinner = selectedMeals.dinner[index % selectedMeals.dinner.length]

    // Adjust snacks based on dietary restrictions
    let snackName = "Mixed Nuts and Fruit"
    let snackDescription = "A handful of almonds with an apple"

    if (isKeto) {
      snackName = "Cheese and Olives"
      snackDescription = "Aged cheddar cheese with green olives"
    } else if (isVegan) {
      snackName = "Hummus with Vegetables"
      snackDescription = "Homemade hummus with carrot and cucumber sticks"
    } else if (hasDiabetes) {
      snackName = "Greek Yogurt with Berries"
      snackDescription = "Plain Greek yogurt with a small portion of fresh berries"
    }

    return {
      day,
      meals: {
        breakfast: {
          name: breakfast.name,
          calories: breakfastCalories,
          description: breakfast.description,
        },
        lunch: {
          name: lunch.name,
          calories: lunchCalories,
          description: lunch.description,
        },
        dinner: {
          name: dinner.name,
          calories: dinnerCalories,
          description: dinner.description,
        },
        snacks: [
          {
            name: snackName,
            calories: snackCalories,
            description: snackDescription,
          },
        ],
      },
      totalCalories: breakfastCalories + lunchCalories + dinnerCalories + snackCalories,
      macros: {
        protein: Math.round((dailyCalories * proteinRatio) / 4),
        carbs: Math.round((dailyCalories * carbRatio) / 4),
        fat: Math.round((dailyCalories * fatRatio) / 9),
      },
    }
  })
}
