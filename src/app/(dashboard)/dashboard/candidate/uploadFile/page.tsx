'use client';

import FileUpload from "@/app/components/FileUpload";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UploadFile() {
    const { userId: clerkUserId } = useAuth();
    const [candidateId, setCandidateId] = useState<string>("");

    useEffect(() => {
        const getCandidateId = async () => {
            if (!clerkUserId) return;
            
            try {
                const response = await fetch('/api/get-candidate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ clerkId: clerkUserId }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
                
                setCandidateId(data.candidateId);
            } catch (error) {
                console.error('Failed to fetch candidate ID:', error);
            }
        };

        getCandidateId();
    }, [clerkUserId]);

    if (!candidateId) return <div>Loading...</div>;

    return (
        <FileUpload 
            allowedFileTypes={['application/pdf']}
            apiRoute="/api/upload"
            modelName="candidateDocument"
            fieldName="fileKey"
            userId={candidateId}
            uploadText="Upload your resume"
            maxSizeMB={5}
        />
    );
}