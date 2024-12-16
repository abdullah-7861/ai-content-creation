import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use a public environment variable
  dangerouslyAllowBrowser: true, // Enable client-side usage
});

export default openai;

