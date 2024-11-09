import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

export const UserProfileForm: React.FC<Props> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    activityLevel: 'moderate',
    gender: 'male'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile(p => ({ ...p, age: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => setProfile(p => ({ ...p, weight: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            value={profile.height}
            onChange={(e) => setProfile(p => ({ ...p, height: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            value={profile.activityLevel}
            onChange={(e) => setProfile(p => ({ ...p, activityLevel: e.target.value as UserProfile['activityLevel'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="very-active">Very Active</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};