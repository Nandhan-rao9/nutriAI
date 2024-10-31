import React, { useCallback, useState } from 'react';
import { Upload, File, X, Loader } from 'lucide-react';

interface FileDropZoneProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFileUpload,
  accept = '.pdf,.doc,.docx,.txt',
  maxSize = 5242880, // 5MB
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    setError('');

    if (!file.type && !file.name.includes('.')) {
      setError('Please upload a valid file');
      return false;
    }

    if (file.size > maxSize) {
      setError(`File size should be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!allowedTypes.includes(fileExtension)) {
      setError('Please upload a supported file type');
      return false;
    }

    return true;
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile) return;

      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        setLoading(true);
        try {
          await onFileUpload(droppedFile);
        } finally {
          setLoading(false);
        }
      }
    },
    [onFileUpload, maxSize, accept]
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setLoading(true);
      try {
        await onFileUpload(selectedFile);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging
            ? 'border-green-500 bg-green-50'
            : error
            ? 'border-red-300'
            : 'border-gray-300'
        } transition-colors duration-300`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept={accept}
          id="file-upload"
        />
        
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader className="w-10 h-10 text-green-500 animate-spin" />
              <p className="mt-2 text-sm text-gray-500">Processing file...</p>
            </div>
          ) : file ? (
            <div className="flex items-center space-x-2">
              <File className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-600">{file.name}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFile();
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, DOCX, TXT up to 5MB
              </p>
            </div>
          )}
        </label>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};