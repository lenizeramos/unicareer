import { NextResponse } from 'next/server';
import prisma from '@/Lib/prisma';

export async function POST(request: Request) {
  try {
    const { clerkId } = await request.json();
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Clerk ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { candidate: true }
    });

    if (!user?.candidate?.id) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ candidateId: user.candidate.id });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch candidate ID' },
      { status: 500 }
    );
  }
} 