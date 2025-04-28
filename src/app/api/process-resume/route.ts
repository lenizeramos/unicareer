import { NextResponse } from 'next/server';
import { s3Client } from '@/Lib/aws-config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { extractTextFromPDF } from '@/app/services/pdf';
import { analyzeResume } from '@/app/services/openai';
import prisma from '@/Lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const userEmail = formData.get('userEmail') as string;

    if (!file || !userId || !userEmail) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        debug: { hasFile: !!file, userId, userEmail }
      }, { status: 400 });
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { clerkId: userId },
          { email: userEmail }
        ]
      },
      include: { candidate: true }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: userEmail,
          role: 'CANDIDATE',
          candidate: {
            create: {
              firstName: '',
              lastName: '',
              skills: []
            }
          }
        },
        include: { candidate: true }
      });
    }

    if (!user || !user.candidate) {
      return NextResponse.json({ error: 'Failed to create or find candidate' }, { status: 500 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const extractedText = await extractTextFromPDF(fileBuffer);
    const extractedData = await analyzeResume(extractedText);

    if (user?.candidate) {
      await prisma.$transaction(async (prisma) => {
        await prisma.candidate.update({
          where: { id: user!.candidate!.id },
          data: {
            firstName: extractedData.firstName,
            lastName: extractedData.lastName,
            skills: extractedData.skills,
            bio: extractedData.bio,
          },
        });

        await prisma.education.deleteMany({ where: { candidateId: user!.candidate!.id } });
        await prisma.workExperience.deleteMany({ where: { candidateId: user!.candidate!.id } });
        await prisma.language.deleteMany({ where: { candidateId: user!.candidate!.id } });
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

    const fileKey = `candidateDocument/${userId}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3Client.send(uploadCommand);

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