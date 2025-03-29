'use client';

import { useState, useEffect } from 'react';
import { FileDisplayProps } from '@/types';
import Image from 'next/image';

export default function FileDisplay({ 
  modelName, 
  userId, 
  className = '', 
  width = 200, 
  height = 200 
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
        const response = await fetch(`/api/get-file?modelName=${modelName}&userId=${userId}`);
        
        if (!response.ok) throw new Error('Failed to fetch file');
        const data = await response.json();
        setFileData(data);
      } catch (error) {
        console.error('Error fetching file:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFile();
    } else {
    }

  }, [userId, modelName]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loading ? (
        <div className="animate-pulse">Loading...</div>
      ) : !fileData ? (
        <div>No file found</div>
      ) : fileData.fileType.startsWith('image/') ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${fileData.fileKey}`}
          alt={fileData.fileName}
          width={width}
          height={height}
          className="object-cover"
          onError={(e) => console.error('Image failed to load:', e)}
        />
      ) : (
        <a
          href={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${fileData.fileKey}`}
          download={fileData.fileName}
          className="inline-block p-4 border rounded-lg hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download {fileData.fileName}
          </span>
        </a>
      )}
    </div>
  );
} 