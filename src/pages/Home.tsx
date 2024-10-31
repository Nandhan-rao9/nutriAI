import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Camera, MessageSquare, Apple } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Personal</span>
            <span className="block text-green-600">AI Nutrition Assistant</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get personalized nutrition advice, analyze your meals, and chat with our AI expert to achieve your health goals.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/nutrition-plan" className="feature-card">
              <Brain className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">AI Nutrition Plan</h3>
              <p className="mt-2 text-gray-500">Get a personalized nutrition plan based on your goals and preferences</p>
            </Link>

            <Link to="/food-analysis" className="feature-card">
              <Camera className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Food Analysis</h3>
              <p className="mt-2 text-gray-500">Upload food photos for instant nutritional information</p>
            </Link>

            <Link to="/chat" className="feature-card">
              <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Expert Chat</h3>
              <p className="mt-2 text-gray-500">Chat with our AI nutritionist for personalized advice</p>
            </Link>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <Apple className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Why Choose NutriAI?</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Personalized</h3>
                <p className="mt-2 text-gray-500">Tailored nutrition advice based on your unique needs</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI-Powered</h3>
                <p className="mt-2 text-gray-500">Advanced AI technology for accurate recommendations</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easy to Use</h3>
                <p className="mt-2 text-gray-500">Simple interface for tracking your nutrition journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};