export interface ResumeData {
  id?: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio?: string;
  website?: string;
}

export interface ResumeUploadResponse {
  fileKey: string;
  extractedData: ResumeData;
}

export interface ResumeProcessingError {
    message: string;
    code: 'UPLOAD_ERROR' | 'EXTRACTION_ERROR' | 'ANALYSIS_ERROR' | 'PROCESSING_ERROR';
  }