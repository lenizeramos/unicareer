export type FileUploadModelName = 'candidateDocument' | 'userProfileImage' | 'companyProfileImage';

export interface FileUploadProps {
    allowedFileTypes: string[];
    uploadText: string;
    uploadingText?: string;
    successText?: string;
    apiRoute: string;
    modelName: FileUploadModelName;
    fieldName: string;
    maxSizeMB?: number;
    userId: string;
  }

  export interface Payment {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface FileDisplayProps {
    modelName: 'candidateDocument' | 'userProfileImage' | 'companyProfileImage';
    userId: string;
    className?: string;
    width?: number;
    height?: number;
  }