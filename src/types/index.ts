export type FileUploadModelName = 'candidateDocument' | 'candidateProfileImage';

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