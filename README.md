# AI Career Advisor

This project is a sophisticated AI-powered career advisor that provides users with personalized career recommendations and detailed learning roadmaps. It leverages the Google Gemini API for its core intelligence.

## Architecture Overview

The application is built as a modern, secure web app with a React frontend and a serverless backend proxy.

- **Frontend:** A responsive React application built with TypeScript. It handles all UI rendering and user interaction.
- **Backend Proxy:** A serverless function (`/api/generate.py`) acts as a secure intermediary between the frontend and the Google Gemini API. **This is a critical security feature.**

### Why a Backend Proxy?

The Google Gemini API key is a sensitive secret. Exposing it on the client-side (in the browser's JavaScript code) would allow anyone to steal and misuse it, potentially leading to significant costs.

The backend proxy ensures the `API_KEY` remains secure on the server. The frontend makes requests to our own API endpoint (`/api/generate`), which then forwards the request to the Gemini API using the secure key.

## Getting Started

### Prerequisites

- Node.js and a package manager (npm, yarn, or pnpm)
- Access to a Google Gemini API key

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Install dependencies:**
    (This project uses import maps, so no `npm install` is needed for frontend packages).
3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
4.  **Run the development server:**
    To run the project locally, you'll need a development server that can handle the serverless function. Vercel CLI is recommended.
    ```bash
    npm install -g vercel
    vercel dev
    ```
    This will start a local server, typically on `http://localhost:3000`.

## Deployment

This application is designed for easy deployment on platforms that support serverless functions, such as Vercel or Netlify.

### Vercel Deployment

1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Import the project into your Vercel dashboard.
3.  **Configure Environment Variables:**
    In the Vercel project settings, navigate to "Environment Variables" and add your `API_KEY`.
    -   **Key:** `API_KEY`
    -   **Value:** `your_gemini_api_key_here`
    Ensure it is available to the serverless function.
4.  **Deploy:**
    Vercel will automatically detect the `vercel.json` and React frontend, building and deploying the application.

## Key Features

- **Dynamic SEO:** Page titles, descriptions, and JSON-LD schema are updated dynamically for each generated career path.
- **Indexable URLs:** Each result generates a unique, shareable URL that can be indexed by search engines.
- **Secure API Calls:** API keys are protected via a backend proxy.
- **User-Friendly Interface:** Includes loading states, error handling with retries, and a responsive design.