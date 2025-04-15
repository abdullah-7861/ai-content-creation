"use client";

import React, { useState } from "react";
import { generateMusic } from "@/server/api";

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    setAudioUrl("");

    try {
      const result = await generateMusic(prompt);

      console.log("Received music generation result:", result);

      // Check if the response has the audio URL
      //@ts-ignore

      setAudioUrl(result);
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Something went wrong while generating music");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">
        Audio Genesis
      </h1>

      <textarea
        className="w-full border p-3 rounded mb-4 resize-none"
        placeholder="Describe your music idea..."
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <p className="my-2">
        Prompt Suggestions: 
        <ul>"128 BPM tech house drum loop"</ul>
        <ul>"funky synth solo"</ul>
        <ul>"Soft Piano music"</ul>
        <ul>"90's rap"</ul>
        
      </p>
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "🎵 Generate Music"}
      </button>

      {error && (
        <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
      )}

      {audioUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">🎧 Generated Music</h2>
          <audio controls src={audioUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
          <p className="text-sm text-gray-500 mt-1">
            You can download the audio by right-clicking and choosing "Save
            Audio As..."
          </p>
        </div>
      )}
    </div>
  );
}
