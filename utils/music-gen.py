# // import { useState } from 'react';
# // import { toast } from 'sonner';
# // import { generateMusicWithHuggingFace } from '@/app/api/hugging-face/route';

# // interface MusicGenOptions {
# //   prompt: string;
# //   apiKey: string;
# //   duration?: number;
# // }

# // export function useMusicGeneration() {
# //   const [isGenerating, setIsGenerating] = useState(false);
# //   const [audioUrl, setAudioUrl] = useState<string | null>(null);
# //   const [error, setError] = useState<string | null>(null);

# //   const generateMusic = async ({ prompt, apiKey, duration = 30 }: MusicGenOptions) => {
# //     if (!prompt.trim()) {
# //       toast.error("Please enter a description for your music");
# //       return;
# //     }

# //     if (!apiKey.trim()) {
# //       toast.error("Please enter your Hugging Face API key");
# //       return;
# //     }

# //     setIsGenerating(true);
# //     setError(null);

# //     try {
# //       // Basic validation of API key format
# //       if (!apiKey.startsWith('hf_')) {
# //         toast.error("Invalid API key format. Hugging Face API keys typically start with 'hf_'");
# //         setIsGenerating(false);
# //         return;
# //       }

# //       // Keep prompt very simple, focusing on music description
# //       const simplePrompt = `Generate music: ${prompt.trim().substring(0, 50)}`;
      
# //       // Make the API request
# //       const result = await generateMusicWithHuggingFace({
# //         prompt: simplePrompt,
# //         apiKey,
# //         duration,
# //       });
      
# //       setAudioUrl(result.audioUrl);
# //       toast.success("Music successfully generated!");
# //     } catch (err) {
# //       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
# //       setError(errorMessage);
# //       toast.error(errorMessage);
# //       console.error("Music generation error:", err);
# //     } finally {
# //       setIsGenerating(false);
# //     }
# //   };

# //   return { generateMusic, isGenerating, audioUrl, error };
# // }


from transformers import AutoProcessor, MusicgenForConditionalGeneration

processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

inputs = processor(
    text=["80s pop track with bassy drums and synth", "90s rock song with loud guitars and heavy drums"],
    padding=True,
    return_tensors="pt",
)

audio_values = model.generate(**inputs, max_new_tokens=256)

from IPython.display import Audio

sampling_rate = model.config.audio_encoder.sampling_rate
Audio(audio_values[0].numpy(), rate=sampling_rate)
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

model = MusicGen.get_pretrained("small")
model.set_generation_params(duration=8)  # generate 8 seconds.

descriptions = ["happy rock", "energetic EDM"]

wav = model.generate(descriptions)  # generates 2 samples.

for idx, one_wav in enumerate(wav):
    # Will save under {idx}.wav, with loudness normalization at -14 db LUFS.
    audio_write(f'{idx}', one_wav.cpu(), model.sample_rate, strategy="loudness")
@misc{copet2023simple,
      title={Simple and Controllable Music Generation}, 
      author={Jade Copet and Felix Kreuk and Itai Gat and Tal Remez and David Kant and Gabriel Synnaeve and Yossi Adi and Alexandre Défossez},
      year={2023},
      eprint={2306.05284},
      archivePrefix={arXiv},
      primaryClass={cs.SD}
}
