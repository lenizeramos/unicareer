import { OpenAI } from 'openai';
import { ResumeData } from '@/types/resume';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(text: string): Promise<ResumeData> {
  const prompt = `Extract the following information from this resume:
  - First name
  - Last name
  - Skills (as an array)
  - Professional summary/bio
  - Website/portfolio URL (if any)
  - Education history (array of objects with: institution, degree, fieldOfStudy, country, startDate, endDate)
  - Work experience (array of objects with: company, position, country, startDate, endDate, description)
  - Languages (array of objects with: name, level [BEGINNER/INTERMEDIATE/ADVANCED/NATIVE])

  Format the response as a JSON object with these fields: 
  firstName, lastName, skills, bio, website, education, workExperience, languages.
  
  For dates, use ISO format (YYYY-MM-DD).
  For language levels, use only: BEGINNER, INTERMEDIATE, ADVANCED, or NATIVE.
  
  Resume text:
  ${text}`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional resume parser. Extract only the requested information and format it as clean JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
  });

  const content = completion.choices[0].message.content || '{}';
  // Remove markdown formatting if present
  const jsonContent = content.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(jsonContent) as ResumeData;
}