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
  
  For dates, use ISO-8601 DateTime. For example, 2020-07-10 15:00:00.000
  For language name, use only spoken laguage like English, Spanish, Portuguese, etc. 
  For language levels, use only: BEGINNER, INTERMEDIATE, ADVANCED, or NATIVE.

  Missing fields that are not date should be replaced to empty string ""
  Missing date fields should be replaced to null
  
  Resume text:
  ${text}`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional resume parser. Extract only the requested information and format it as clean JSON with double-quoted property names."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" }
  });
  const content = completion.choices[0].message.content || '{}';

  const parsed = JSON.parse(content, (key, value) => {
    if (isIsoDateString(value)) {
      return new Date(value);
    }
    return value;
  });

  return parsed as ResumeData;
}


function isIsoDateString(value: string): boolean {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value);
}

