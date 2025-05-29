import { OpenAI } from 'openai';
import prisma from '@/Lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisResult {
  score: number;
  feedback: string;
  recommendation: string;
}

export async function analyzeCandidateForJob(candidateId: string, jobId: string): Promise<AnalysisResult> {
  const [candidate, job] = await Promise.all([
    prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        workExperience: true,
        education: true,
        languages: true,
      },
    }),
    prisma.job.findUnique({
      where: { id: jobId },
    }),
  ]);

  if (!candidate || !job) {
    throw new Error('Candidate or job not found');
  }

  const prompt = `Analyze this candidate's fit for the job position:

Job Requirements:
- Title: ${job.title}
- Required Skills: ${job.skills.join(', ')}
- Experience Level: ${job.level}
- Job Type: ${job.type}
${job.whoYouAre ? `- Who You Are: ${job.whoYouAre}` : ''}
${job.niceToHave ? `- Nice to Have: ${job.niceToHave}` : ''}

Candidate Profile:
- Skills: ${candidate.skills.join(', ')}
- Work Experience: ${candidate.workExperience.map(exp => 
    `${exp.position} at ${exp.company} (${exp.startDate.toISOString().split('T')[0]} to ${
      exp.endDate ? exp.endDate.toISOString().split('T')[0] : 'Present'
    })`
  ).join('; ')}
- Education: ${candidate.education.map(edu => 
    `${edu.degree} in ${edu.fieldOfStudy || 'N/A'} from ${edu.institution}`
  ).join('; ')}
- Languages: ${candidate.languages.map(lang => 
    `${lang.name} (${lang.level})`
  ).join(', ')}

Provide a JSON response with:
1. A score from 0-100 based on how well the candidate matches the job requirements
2. A brief feedback explaining the score
3. A recommendation (HIGHLY_RECOMMENDED, RECOMMENDED, or NOT_RECOMMENDED)`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert HR analyst. Evaluate the candidate's fit for the job position."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  
  await prisma.compatibilityScore.upsert({
    where: {
      jobId_candidateId: {
        jobId,
        candidateId,
      },
    },
    update: {
      score: result.score,
      feedback: result.feedback,
      recommendation: result.recommendation,
    },
    create: {
      jobId,
      candidateId,
      score: result.score,
      feedback: result.feedback,
      recommendation: result.recommendation,
    },
  });

  return result;
}

export async function batchAnalyzeCandidates(jobId: string, candidateIds: string[], batchSize = 5) {
  const results = [];
  
  for (let i = 0; i < candidateIds.length; i += batchSize) {
    const batch = candidateIds.slice(i, i + batchSize);
    const batchPromises = batch.map(candidateId => 
      analyzeCandidateForJob(candidateId, jobId)
        .catch(error => ({
          candidateId,
          error: error.message,
        }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    if (i + batchSize < candidateIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
} 