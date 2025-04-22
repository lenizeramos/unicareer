import { NextResponse } from 'next/server';
import { s3Client } from '@/Lib/aws-config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploadModelName } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/Lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const modelName = formData.get('modelName') as FileUploadModelName;
    const fieldName = formData.get('fieldName') as string;
    const userId = formData.get('userId') as string;

    if (!file || !modelName || !fieldName || !userId) {
      return NextResponse.json({ 
        error: 'Missing required fields: file, modelName, fieldName, and userId are required' 
      }, { status: 400 });
    }

    if (modelName === 'candidateDocument' && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed for documents' }, { status: 400 });
    }

    if (modelName === 'companyProfileImage' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      return NextResponse.json({ error: 'Only JPEG, PNG and JPG files are allowed for profile images' }, { status: 400 });
    }

    if (modelName === 'userProfileImage' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      return NextResponse.json({ error: 'Only JPEG, PNG and JPG files are allowed for profile images' }, { status: 400 });
    }

    if (!(modelName in prisma)) {
      return NextResponse.json({ 
        error: 'Invalid model name' 
      }, { status: 400 });
    }

    const fileName = `${modelName}/${userId}/${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3Client.send(command);

    try {
        switch (modelName) {
            case 'candidateDocument':
                await prisma.candidateDocument.create({
                    data: {
                        candidateId: userId,
                        fileKey: fileName,
                        fileType: file.type,
                        fileName: file.name
                    },
                });
                break;
            case 'userProfileImage':
                await prisma.userProfileImage.create({
                    data: {
                        userId: userId,
                        fileKey: fileName,
                        fileType: file.type,
                        fileName: file.name
                    },
                });
                break;
            case 'companyProfileImage':
                const existingCompanyImage = await prisma.companyProfileImage.findFirst({
                    where: {
                        companyId: userId
                    }
                });

                if (existingCompanyImage) {
                    await prisma.companyProfileImage.update({
                        where: {
                            id: existingCompanyImage.id
                        },
                        data: {
                            fileKey: fileName,
                            fileType: file.type,
                            fileName: file.name
                        },
                    });
                } else {
                    await prisma.companyProfileImage.create({
                        data: {
                            companyId: userId,
                            fileKey: fileName,
                            fileType: file.type,
                            fileName: file.name
                        },
                    });
                }
                break;
            default:
                await (prisma[modelName] as any).create({
                    data: {
                        userId,
                        [fieldName]: fileName,
                        fileType: file.type,
                    },
                });
                break;
        }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to store file reference in database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      fileKey: fileName,
      message: 'Upload successful'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error as Error).message }, 
      { status: 500 }
    );
  }
} 