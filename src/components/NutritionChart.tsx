import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NutritionalInfo } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  actual: NutritionalInfo;
  target: NutritionalInfo;
}

export const NutritionChart: React.FC<Props> = ({ actual, target }) => {
  const data = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat','iron','zinc','calcium'],
    datasets: [
      {
        label: 'Actual',
        data: [actual.calories, actual.protein, actual.carbs, actual.fat,actual.fiber,actual.minerals.calcium,actual.minerals.iron,actual.minerals.potassium],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Target',
        data: [target.calories, target.protein, target.carbs, target.fat,target.fiber,target.minerals.calcium,target.minerals.iron,target.minerals.potassium],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Nutritional Progress',
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <Bar options={options} data={data} />
    </div>
  );
};