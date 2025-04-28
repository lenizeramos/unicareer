import { OpenAI } from "openai";
import { ResumeData } from "@/types/resume";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(text: string): Promise<ResumeData> {
  const prompt = `Extract the following information from this resume:
  - First name
  - Last name
  - Skills (array of strings)
  - Professional summary/bio
  - Address details (inside a "user" object):
    - streetAddress
    - city
    - province (state/region)
    - country ("Canada")
    - postalCode
    - website (URL)
    - linkedIn (URL)
    - twitter (URL)
  - Education history (array of objects with: institution, degree, fieldOfStudy, country, startDate, endDate)
  - Work experience (array of objects with: company, position, country, startDate, endDate, description)
  - Languages (array of objects with: name, level [BEGINNER, INTERMEDIATE, ADVANCED, NATIVE])

Format the result strictly as a **single JSON object** using **double-quoted** property names only. Use this model:

{
  "firstName": "",
  "lastName": "",
  "skills": [],
  "bio": "",
  "user": {
    "streetAddress": "",
    "city": "",
    "province": "",
    "country": "Canada",
    "postalCode": "",
    "website": "",
    "linkedIn": "",
    "twitter": ""
  },
  "education": [],
  "workExperience": [],
  "languages": []
}

**Important rules**:
- If a non-date field is missing, fill it with an empty string "".
- If a date field is missing, fill it with null.
- Dates must be in ISO format (YYYY-MM-DD).
- Language names must be spoken languages only (e.g., English, Spanish, Portuguese).
- Language levels must be exactly: BEGINNER, INTERMEDIATE, ADVANCED, or NATIVE.
- Do not invent or guess missing information. Only extract what's explicitly present.

Resume text:
  ${text}`;

  console.log(text);
  console.log(prompt);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional resume parser. Extract only the requested information and format it as clean JSON with double-quoted property names.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });
  const content = completion.choices[0].message.content || "{}";

  const parsed = JSON.parse(content, (key, value) => {
    if (isDateString(value)) {
      return new Date(value);
    }
    return value;
  });

  return parsed as ResumeData;
}

function isDateString(value: string): boolean {
  if (typeof value !== "string") return false;
  const parsed = Date.parse(value);
  return !isNaN(parsed);
}
