import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

export const ImageUpload = ({ onAnalysis }: { onAnalysis: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/analyze-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onAnalysis(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {preview ? (
            <div className="relative w-full h-full">
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <Loader className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
      </label>
    </div>
  );
};