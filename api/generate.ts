// It's safe to use the API key here from environment variables.

const constructMainPrompt = (userInput: UserInput): string => {
  const currencyCode = getCurrencyForCountry(userInput.location);
  return `
You are an expert AI career advisor. Your task is to create a personalized career guide based on the user's profile.

Analyze the user's input to recommend up to 3 optimal career paths, providing a brief rationale for each. The first one should be the top recommendation.

For ONLY the top recommended career path, generate a detailed learning roadmap. Present this roadmap in 2-3 distinct phases, such as "Phase 1: Foundational Skills (First 3-6 Months)" and "Phase 2: Specialization & Portfolio Building (Next 6-12 Months)". For each phase, provide a list of recommended courses. Each course must be an object with fields: "title", "platform", "rationale", "estimated_cost", "duration", and "link".
IMPORTANT: Generate all "estimated_cost" values in ${currencyCode}. The "duration" should be a concise string like "Approx. 4 weeks" or "10-12 hours".

Additionally, generate a 'faq' section with 3-4 questions and answers relevant to the top career path. These should cover common queries like salary expectations for the user's region, daily responsibilities, or future career outlook.

Finally, provide content for ads, affiliate resources, and a premium subscription offer. For the subscription offer, generate a personalized title and description including the top career path. The features should be AI-centric and realistic.

Output the entire response as a single, valid, structured JSON object. Do not wrap it in markdown fences.

The JSON schema must be:
{
  "career_recommendations": [{ "career": "string", "rationale": "string", "learning_phases": [{ "phase_title": "string", "courses": [{"title": "string", "platform": "string", "rationale": "string", "estimated_cost": "string", "duration": "string", "link": "string"}] }] }],
  "ads_and_affiliates": { "ad_sense_content": "string", "affiliate_resources": [{"name": "string", "link": "string"}] },
  "subscription_features": { "title": "string", "description": "string", "features": ["string"] },
  "faq": [{ "question": "string", "answer": "string" }]
}
Note: The "learning_phases" array should only be populated for the first career recommendation in this initial response.

User's data:
- Education: ${userInput.education}
- Skills: ${userInput.skills}
- Experience: ${userInput.experience}
- Interests and Goals: ${userInput.interests}
- Preferred Location: ${userInput.location}
- Other Factors: ${userInput.otherFactors}

Generate the JSON output.
  `;
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!process.env.API_KEY) {
    return new Response(JSON.stringify({ error: 'API_KEY environment variable not set on the server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const userInput: UserInput = await request.json();
    const prompt = constructMainPrompt(userInput);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
    });

    // The response.text from the SDK is already a clean JSON string when responseMimeType is set