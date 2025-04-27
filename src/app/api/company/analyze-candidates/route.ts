import { NextResponse } from 'next/server';
import { batchAnalyzeCandidates } from '@/app/services/candidateAnalysis';

export async function POST(request: Request) {
  try {
    const { jobId, candidateIds } = await request.json();
    await batchAnalyzeCandidates(jobId, candidateIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error analyzing candidates:', error);
    return NextResponse.json({ error: 'Failed to analyze candidates' }, { status: 500 });
  }
} 