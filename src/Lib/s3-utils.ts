import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './aws-config';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToS3 = async (
  file: File,
  folder: string = 'uploads'
): Promise<string> => {
  try {
   
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

  
    const buffer = await file.arrayBuffer();

    
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    await s3Client.send(command);

   
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};