import { useState } from "react";
import FileUpload from "./FileUpload";
import Loader from "./Loader";
import { ResumeData } from "@/types/resume";

interface ResumeUploadStepProps {
  onUpload: (data: ResumeData) => void;
  onSkip: () => void;
  userId: string;
  userEmail: string;
}

export default function ResumeUploadStep({
  onUpload,
  onSkip,
  userId,
  userEmail,
}: ResumeUploadStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (fileKey: string, file: File) => {
    try {
      if (!userId || !userEmail) {
        throw new Error("Missing userId or userEmail");
      }

      setIsProcessing(true);
      setError(null);

      if (!fileKey || !file) {
        console.error("No file or fileKey provided to handleUploadComplete");
        throw new Error("No file provided");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("userEmail", userEmail);

      const response = await fetch("/api/process-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUpload(result.extractedData);
      } else {
        throw new Error(
          result.error.message || result.error || "Failed to process resume"
        );
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to process resume"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upload Your Resume
      </h2>

      {isProcessing ? (
        <Loader />
      ) : (
        <FileUpload
          allowedFileTypes={["application/pdf"]}
          uploadText="Drop your resume here or click to browse. We will analyze it with AI and extract your data."
          uploadingText="Processing your resume..."
          successText="Resume uploaded successfully!"
          apiRoute="/api/process-resume"
          modelName="candidateDocument"
          fieldName="file"
          maxSizeMB={5}
          userId={userId}
          userEmail={userEmail}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            onSkip();
          }}
          className="text-gray-600 hover:text-gray-800 underline"
          disabled={isProcessing}
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}
