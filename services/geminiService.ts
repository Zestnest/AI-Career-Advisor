import type { UserInput, CareerAdviceResponse } from '../types';

/**
 * Calls the secure backend proxy to get career advice.
 * The backend proxy will then call the Gemini API.
 * This prevents exposing the API key on the client-side.
 * @param userInput - The user's profile data.
 * @returns A promise that resolves to the CareerAdviceResponse.
 */
export const generateCareerAdvice = async (userInput: UserInput): Promise<CareerAdviceResponse> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response.' }));
        // Provide a more user-friendly error message
        const message = errorData.error || `Request failed with status: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    return data as CareerAdviceResponse;

  } catch (error) {
    console.error("Error calling backend service:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get a response from the server: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the server.");
  }
};