// It's safe to use the API key here from environment variables.

const constructMainPrompt = (userInput: UserInput): string => {
  const currencyCode = getCurrencyForCountry(userInput.location);
  return `
You are an expert AI career advisor. Your task is to create a personalized career guide based on the user's profile.

Analyze the user's input to recommend up to 3 optimal career paths, providing a brief rationale for each. The first one should be the top recommendation.

For ONLY the top recommended career path, generate a detailed learning roadmap. Present this roadmap in 2-3 distinct phases, such as "Phase 1: Foundational Skills (First 3-6 Months)" and "Phase 2: Specialization & Portfolio Building (Next 6-12 Months)". For each phase, provide a list of recommended courses. Each course must be an object with fields: "title", "platform", "rationale", "estimated_cost", "duration", and "link".
IMPORTANT: Generate all "estimated_cost" values in ${currencyCode}. The "duration" should be a concise string like "Approx. 4 weeks" or "10-12 hours".

Additionally, generate a 'faq' section with 3-4 questions and answers relevant to the top career path. These should cover common queries like salary expectations for the user's region, daily responsibilities, or future career outlook.

Output the entire response as a single, valid, structured JSON object. Do not wrap it in markdown fences.

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
  }
}