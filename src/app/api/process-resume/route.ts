import { NextResponse } from 'next/server';
import { s3Client } from '@/Lib/aws-config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { extractTextFromPDF } from '@/app/services/pdf';
import { analyzeResume } from '@/app/services/openai';
import { createUserAndCandidate } from '@/Lib/usersService';
import prisma from '@/Lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const extractedText = await extractTextFromPDF(fileBuffer);
    const extractedData = await analyzeResume(extractedText);

    // First try to find the user and candidate
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { candidate: true }
    });

    // If no candidate exists, create both user and candidate
    if (!user?.candidate) {
      // Get user email from Clerk
      const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }).then((res) => res.json());

      const result = await createUserAndCandidate({
        id: userId,
        userId: userId,
        role: 'CANDIDATE',
        email: clerkUser.email_addresses[0]?.email_address || '',
        firstName: extractedData.firstName,
        lastName: extractedData.lastName,
        skills: extractedData.skills,
        bio: extractedData.bio,
        website: extractedData.website,
        image_url: clerkUser.image_url || '',
      });
      user = await prisma.user.findUnique({
        where: { id: result.user.id },
        include: { candidate: true }
      });
    }

    if (!user || !user.candidate) {
      return NextResponse.json({ error: 'Failed to create or find candidate' }, { status: 500 });
    }

    const fileKey = `candidateDocument/${userId}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3Client.send(uploadCommand);

    // Save document with the candidate ID
    await prisma.candidateDocument.create({
      data: {
        candidateId: user.candidate.id,
        fileKey,
        fileType: file.type,
        fileName: file.name,
      },
    });

    return NextResponse.json({
      fileKey,
      extractedData,
      success: true
    });

  } catch (error) {
    console.error('Resume processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
} 