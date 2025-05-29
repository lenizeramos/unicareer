import { useState } from "react";
import { FileUploadProps } from "@/types";

export default function FileUpload({
  allowedFileTypes = ["application/pdf"],
  uploadText = "Upload your file",
  uploadingText = "Uploading...",
  successText = "File uploaded successfully!",
  apiRoute = "/api/upload",
  modelName,
  fieldName,
  maxSizeMB = 5,
  userId,
  userEmail,
  onUploadComplete,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileKey, setFileKey] = useState<string>("");
  const [presignedUrl, setPresignedUrl] = useState<string>("");

  const getPresignedUrl = async (fileKey: string) => {
    try {
      const response = await fetch("/api/get-presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileKey }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setPresignedUrl(data.signedUrl);
    } catch (error) {
      console.error("Error getting signed URL:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

    
      if (!allowedFileTypes.includes(file.type)) {
        throw new Error(
          `Please upload one of these formats: ${allowedFileTypes
            .map((type) => type.split("/")[1])
            .join(", ")}`
        );
      }

     
      if (file.size > maxSizeMB * 1024 * 1024) {
        throw new Error(`File size should be less than ${maxSizeMB}MB`);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("modelName", modelName);
      formData.append("fieldName", fieldName);
      formData.append("userId", userId);
      if (userEmail) {
        formData.append("userEmail", userEmail);
      }

      const response = await fetch(apiRoute, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setFileKey(data.fileKey);
      await getPresignedUrl(data.fileKey);

      
      if (onUploadComplete) {
        onUploadComplete(data.fileKey, file);
      }
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Upload failed: " + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="md:text-xl mb-4 font-monomakh text-center">{uploadText}</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-[90%] xs:h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 font-shafarik">
            <div className="flex flex-col items-center justify-center pt-5">
              {isUploading ? (
                <p className="text-sm text-gray-400 font-shafarik">{uploadingText}</p>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-3 px-2 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 font-shafarik text-justify">
                    {uploadText}
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="opacity-0"
              accept={allowedFileTypes.join(",")}
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        {fileKey && presignedUrl && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-green-600 mb-2 font-shafarik">{successText}</p>
            <a
              href={presignedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline font-shafarik"
            >
              View uploaded file
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
