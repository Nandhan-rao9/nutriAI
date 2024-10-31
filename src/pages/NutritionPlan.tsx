import React, { useState } from 'react';
import { Brain, Target, Apple, AlertCircle } from 'lucide-react';
import { FileDropZone } from '../components/FileDropZone';

interface UserPreferences {
  goal: string;
  dietType: string;
  restrictions: string[];
  activityLevel: string;
}

export const NutritionPlan = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    goal: '',
    dietType: '',
    restrictions: [],
    activityLevel: '',
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    // Here you would typically process the file
    // For example, reading its contents and sending to the backend
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload-plan', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Handle the response data as needed
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/recommendations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const goals = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Better Health'];
  const dietTypes = ['Balanced', 'Low-Carb', 'High-Protein', 'Vegetarian', 'Vegan'];
  const activityLevels = ['Sedentary', 'Light', 'Moderate', 'Very Active', 'Athlete'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Nutrition Plan
          </h1>
          <p className="text-lg text-gray-600">
            Let's create a custom plan that fits your lifestyle and goals
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">What's your main goal?</h2>
              <div className="grid grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      setPreferences({ ...preferences, goal });
                      setStep(2);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:border-green-500 hover:shadow-md ${
                      preferences.goal === goal ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <Target className="w-6 h-6 text-green-600 mb-2" />
                    <span className="font-medium">{goal}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">
                  Have a current meal plan? Upload it here
                </h3>
                <FileDropZone onFileUpload={handleFileUpload} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Select your preferred diet type</h2>
              <div className="grid grid-cols-2 gap-4">
                {dietTypes.map((diet) => (
                  <button
                    key={diet}
                    onClick={() => {
                      setPreferences({ ...preferences, dietType: diet });
                      setStep(3);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:border-green-500 hover:shadow-md ${
                      preferences.dietType === diet ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <Apple className="w-6 h-6 text-green-600 mb-2" />
                    <span className="font-medium">{diet}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">What's your activity level?</h2>
              <div className="grid grid-cols-2 gap-4">
                {activityLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setPreferences({ ...preferences, activityLevel: level });
                      handleSubmit();
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:border-green-500 hover:shadow-md ${
                      preferences.activityLevel === level ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <Brain className="w-6 h-6 text-green-600 mb-2" />
                    <span className="font-medium">{level}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-12 animate-pulse">
              <Brain className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
              <p className="text-lg text-gray-600">Generating your personalized plan...</p>
            </div>
          )}

          {plan && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Your Personalized Recommendations</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {plan.recommendations}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};