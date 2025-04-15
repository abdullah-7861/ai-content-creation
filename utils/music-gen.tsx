// import { useState } from 'react';
// import { toast } from 'sonner';
// import { generateMusicWithHuggingFace } from '@/app/api/hugging-face/route';

// interface MusicGenOptions {
//   prompt: string;
//   apiKey: string;
//   duration?: number;
// }

// export function useMusicGeneration() {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const generateMusic = async ({ prompt, apiKey, duration = 30 }: MusicGenOptions) => {
//     if (!prompt.trim()) {
//       toast.error("Please enter a description for your music");
//       return;
//     }

//     if (!apiKey.trim()) {
//       toast.error("Please enter your Hugging Face API key");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       // Basic validation of API key format
//       if (!apiKey.startsWith('hf_')) {
//         toast.error("Invalid API key format. Hugging Face API keys typically start with 'hf_'");
//         setIsGenerating(false);
//         return;
//       }

//       // Keep prompt very simple, focusing on music description
//       const simplePrompt = `Generate music: ${prompt.trim().substring(0, 50)}`;
      
//       // Make the API request
//       const result = await generateMusicWithHuggingFace({
//         prompt: simplePrompt,
//         apiKey,
//         duration,
//       });
      
//       setAudioUrl(result.audioUrl);
//       toast.success("Music successfully generated!");
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
//       setError(errorMessage);
//       toast.error(errorMessage);
//       console.error("Music generation error:", err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return { generateMusic, isGenerating, audioUrl, error };
// }