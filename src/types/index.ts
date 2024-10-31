export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NutritionPlan {
  id: string;
  userId: string;
  meals: Meal[];
  goals: string[];
  restrictions: string[];
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}