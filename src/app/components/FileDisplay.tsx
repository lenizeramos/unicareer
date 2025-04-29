"use client";

import { useState, useEffect } from "react";
import { FileDisplayProps } from "@/types";
import Image from "next/image";

export default function FileDisplay({
  modelName,
  userId,
  className = "",
  width = 200,
  height = 200,
  fallbackImage,
}: FileDisplayProps) {
  const [fileData, setFileData] = useState<{
    fileKey: string;
    fileType: string;
    fileName: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(
          `/api/get-file?modelName=${modelName}&userId=${userId}`
        );

        if (response.status === 404) {
          setFileData(null);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch file");
        const data = await response.json();
        setFileData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
        /* console.clear() */
      }
    };

    if (userId) {
      fetchFile();
    } else {
      setLoading(false);
    }
  }, [userId, modelName]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loading ? (
        <div className="animate-pulse">Loading...</div>
      ) : fileData && fileData.fileType.startsWith("image/") ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${fileData.fileKey}`}
          alt={fileData.fileName}
          width={width}
          height={height}
          className={className + " object-cover"}
          onError={(e) => console.error("Image failed to load:", e)}
        />
      ) : fallbackImage ? (
        <Image
          src={fallbackImage}
          alt="Profile Image"
          width={width}
          height={height}
          className="object-cover"
        />
      ) : (
        <div>No file found</div>
      )}
    </div>
  );
}
