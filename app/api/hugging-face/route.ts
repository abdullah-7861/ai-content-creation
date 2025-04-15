// export interface MusicGenerationParams {
//     prompt: string;
//     apiKey: string;
//   }
  
//   export async function generateMusicWithHuggingFace({
//     prompt,
//     apiKey
//   }: MusicGenerationParams): Promise<{ audioUrl: string }> {
//     try {
//       // Validate API key
//       if (!apiKey || apiKey.trim() === '') {
//         throw new Error('Invalid API key: API key cannot be empty');
//       }
  
//       console.log('Sending request to Hugging Face API with prompt:', prompt);
  
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/facebook/musicgen-small",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             inputs: prompt,
//           }),
//         }
//       );
  
//       // Error handling
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Hugging Face API response:', response.status, errorText);
        
//         if (response.status === 401) {
//           throw new Error('Authentication failed: Please check your API key');
//         } else if (response.status === 500) {
//           throw new Error('Hugging Face server error: Try again with a simpler prompt');
//         } else if (response.status === 503) {
//           throw new Error('Service unavailable: The model may be overloaded');
//         } else {
//           throw new Error(`API error ${response.status}: ${errorText}`);
//         }
//       }
  
//       // Convert response to audio URL
//       const blob = await response.blob();
//       const audioUrl = URL.createObjectURL(blob);
      
//       return { audioUrl };
//     } catch (error) {
//       console.error("Error generating music:", error);
//       throw error;
//     }
//   }