import { NextResponse } from 'next/server';
import prisma from '@/Lib/prisma';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modelName = searchParams.get('modelName');
    const userId = searchParams.get('userId');

    if (!modelName || !userId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    let file;
    switch (modelName) {
      case 'candidateDocument':
        file = await prisma.candidateDocument.findFirst({
          where: { candidateId: userId },
          orderBy: { createdAt: 'desc' }
        });
        break;
      case 'userProfileImage':
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { candidate: true }
        });
        
        if (!user?.candidate?.id) {
          return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const userProfileImage = await prisma.userProfileImage.findFirst({
          where: { userId: user.candidate.id },
          orderBy: { createdAt: 'desc' }
        });
        
        file = userProfileImage;
        break;
      case 'companyProfileImage':
        file = await prisma.userProfileImage.findFirst({
          where: { userId: userId },
          orderBy: { createdAt: 'desc' }
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid model name' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json(file);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 