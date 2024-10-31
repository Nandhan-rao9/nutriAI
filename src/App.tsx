import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { FoodAnalysis } from './pages/FoodAnalysis';
import { NutritionPlan } from './pages/NutritionPlan';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/food-analysis" element={<FoodAnalysis />} />
          <Route path="/nutrition-plan" element={<NutritionPlan />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;