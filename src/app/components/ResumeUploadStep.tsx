import { useState } from 'react';
import FileUpload from './FileUpload';
import Loader from './Loader';
import { ResumeData } from '@/types/resume';

interface ResumeUploadStepProps {
  onUpload: (data: ResumeData) => void;
  onSkip: () => void;
  userId: string;
}

export default function ResumeUploadStep({ onUpload, onSkip, userId }: ResumeUploadStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (fileKey: string, file: File) => {
    try {
      setIsProcessing(true);
      setError(null);

      if (!fileKey || !file) {
        console.error('No file or fileKey provided to handleUploadComplete');
        throw new Error('No file provided');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fetch('/api/process-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUpload(result.extractedData);
      } else {
        throw new Error(result.error.message || result.error || 'Failed to process resume');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to process resume');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Resume</h2>
      
      {isProcessing ? (
        <Loader />
      ) : (
        <FileUpload
          allowedFileTypes={['application/pdf']}
          uploadText="Drop your resume here or click to browse. We will analyze it with AI and extract your data."
          uploadingText="Processing your resume..."
          successText="Resume uploaded successfully!"
          apiRoute="/api/process-resume"
          modelName="candidateDocument"
          fieldName="resume"
          maxSizeMB={5}
          userId={userId}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onSkip}
          className="text-gray-600 hover:text-gray-800 underline"
          disabled={isProcessing}
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}