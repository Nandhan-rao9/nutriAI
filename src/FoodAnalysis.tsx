import React, { useState, useEffect } from 'react';
import { Camera, Apple, AlertCircle, BarChart2, User, CloudCog } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { NutritionChart } from './components/NutritionChart';
import { UserProfileForm } from './components/UserProfileForm';
import { calculateDailyNeeds, calculateMacroTargets } from './utils/calculations';
import axios from 'axios';


interface NutritionData {
  name: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    minerals: {
      calcium: number;
      iron: number;
      potassium: number;
    };
    vitamins: {
      a: number;
      e: number;
      c: number;
      d: number;
    };
  };
}

export const FoodAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<NutritionData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currentFood, setCurrentFood] = useState<NutritionData[]>([]);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
        // Create a new FormData object and append the image file
        const formData = new FormData();
        formData.append('image', file);

        // Send a POST request to the Flask backend's /analyze-image endpoint
        const response = await axios.post('http://127.0.0.1:5000/analyze-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Handle the results and update the component's state
        const results = response.data;
        setCurrentFood(results);  // Set the analyzed food data
        setErrorMessage(null);    // Clear any previous error message
    } catch (error) {
        console.error('Error analyzing image:', error);
        setErrorMessage('Error analyzing image');  // Show an error message on failure
    }
    setIsAnalyzing(false);
  };

  const getCurrentNutrition = () : NutritionalInfo => {
    return currentFood.reduce((acc, food) => ({
      calories: acc.calories + food.nutrition.calories,
      protein: acc.protein + food.nutrition.protein,
      carbs: acc.carbs + food.nutrition.carbs,
      fat: acc.fat + food.nutrition.fat,
      fiber: acc.fiber + food.nutrition.fiber,
      vitamins: {
        a: acc.vitamins.a + food.nutrition.vitamins.a,
        c: acc.vitamins.c + food.nutrition.vitamins.c,
        d: acc.vitamins.d + food.nutrition.vitamins.d,
        e: acc.vitamins.e + food.nutrition.vitamins.e,
      },
      minerals: {
        iron: acc.minerals.iron + food.nutrition.minerals.iron,
        calcium: acc.minerals.calcium + food.nutrition.minerals.calcium,
        potassium: acc.minerals.potassium + food.nutrition.minerals.potassium,
      }
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      vitamins: { a: 0, c: 0, d: 0, e: 0 },
      minerals: { iron: 0, calcium: 0, potassium: 0 }
    });
  };

  const calculateTargets = (profile: UserProfile): NutritionalInfo => {
    const dailyCalories = calculateDailyNeeds(profile);
    const macros = calculateMacroTargets(dailyCalories);
    
    return {
      calories: dailyCalories,
      ...macros,
      fiber: 30,
      vitamins: { a: 900, c: 90, d: 20, e: 15 },
      minerals: { iron: 18, calcium: 1000, potassium: 3500 }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">NutriTrack</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Your Profile</h2>
              </div>
              <UserProfileForm onSubmit={setUserProfile} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Camera className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Food Analysis</h2>
              </div>
              <ImageUpload onImageUpload={handleImageUpload} />
              {isAnalyzing && (
                <div className="mt-4 text-center text-gray-600">
                  Analyzing your food...
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {userProfile && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Nutrition Overview</h2>
                </div>
                <NutritionChart
                  actual={getCurrentNutrition()}
                  target={calculateTargets(userProfile)}
                />
              </div>
            )}

            {currentFood.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Detected Foods</h2>
                {currentFood.map((food, index) => (
                  <div key={index} className="border-b border-gray-200 py-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{food.name}</h3>
                      <span className="text-sm text-gray-500">
                        {(food.confidence * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>Calories: {food.nutrition.calories}kcal</div>
                      <div>Protein: {food.nutrition.protein}g</div>
                      <div>Carbs: {food.nutrition.carbs}g</div>
                      <div>Fat: {food.nutrition.fat}g</div>
                      <div>Calcium: {food.nutrition.minerals.calcium}g</div>
                      <div>Iron: {food.nutrition.minerals.iron}g</div>
                      <div>Potassium: {food.nutrition.minerals.potassium}g</div>
                      <div>Vitamin A: {food.nutrition.vitamins.a}g</div>
                      <div>Vitamin E: {food.nutrition.vitamins.e}g</div>
                      <div>Vitamin C: {food.nutrition.vitamins.c}g</div>
                      <div>Vitamin D: {food.nutrition.vitamins.d}g</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
