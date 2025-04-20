import { NextResponse } from 'next/server';
import { s3Client } from '@/Lib/aws-config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { extractTextFromPDF } from '@/app/services/pdf';
import { analyzeResume } from '@/app/services/openai';
import { createUserAndCandidate } from '@/Lib/client/usersService';
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
        education: extractedData.education,
        workExperience: extractedData.workExperience,
        languages: extractedData.languages,
      });
      user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { 
          candidate: {
            include: {
              education: true,
              workExperience: true,
              languages: true
            }
          } 
        }
      });
    } else {
      // Update existing candidate with new information
      await prisma.$transaction(async (prisma) => {
        // Update main candidate info
        await prisma.candidate.update({
          where: { id: user!.candidate!.id },
          data: {
            firstName: extractedData.firstName,
            lastName: extractedData.lastName,
            skills: extractedData.skills,
            bio: extractedData.bio,
            website: extractedData.website,
          },
        });

        await prisma.education.deleteMany({ where: { candidateId: user!.candidate!.id } });
        await prisma.workExperience.deleteMany({ where: { candidateId: user!.candidate!.id } });
        await prisma.language.deleteMany({ where: { candidateId: user!.candidate!.id } });
console.log("extractedData.education", extractedData.education)
        if (extractedData.education?.length) {
          await prisma.education.createMany({
            data: extractedData.education.map(edu => ({
              institution: edu.institution,
              degree: edu.degree,
              fieldOfStudy: edu.fieldOfStudy || "",
              country: edu.country,
              description: edu.description || "",
              candidateId: user!.candidate!.id,
              startDate: new Date(edu.startDate),
              endDate: edu.endDate && edu.endDate !== 'Present' ? new Date(edu.endDate) : null,
              current: edu.endDate === 'Present'
            }))
          });
        }

        if (extractedData.workExperience?.length) {
          await prisma.workExperience.createMany({
            data: extractedData.workExperience.map(exp => ({
              company: exp.company,
              position: exp.position,
              country: exp.country,
              description: exp.description,
              candidateId: user!.candidate!.id,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate && exp.endDate !== 'Present' ? new Date(exp.endDate) : null,
              current: exp.endDate === 'Present'
            }))
          });
        }

        if (extractedData.languages?.length) {
          await prisma.language.createMany({
            data: extractedData.languages.map(lang => ({
              ...lang,
              candidateId: user!.candidate!.id,
            })),
          });
        }
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