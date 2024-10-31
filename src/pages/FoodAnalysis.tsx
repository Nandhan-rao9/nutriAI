import React, { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { Camera, Utensils, Scale } from 'lucide-react';

interface NutritionData {
  name: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const FoodAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<NutritionData[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Food Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Upload a photo of your food to get instant nutritional information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:scale-[1.02]">
          <ImageUpload onAnalysis={setAnalysisResults} />
        </div>

        {analysisResults.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            {analysisResults.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center mb-4">
                  <Utensils className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-semibold">{item.nutrition.calories} kcal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-semibold">{item.nutrition.protein}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Carbs</span>
                    <span className="font-semibold">{item.nutrition.carbs}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Fat</span>
                    <span className="font-semibold">{item.nutrition.fat}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};