"use client";

import React, { useState } from "react";
import { generateVideo } from "@/server/generateVideo";
import { useRouter } from "next/navigation";

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    setVideoUrl("");

    try {
      const result = await generateVideo(prompt);
      console.log("Generated video result:", result);
      setVideoUrl(result);
    } catch (err: any) {
      console.error("Video generation error:", err);
      setError(err.message || "Something went wrong while generating video");
    } finally {
      setIsGenerating(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">
        Video Genesis
      </h1>

      <textarea
        className="w-full border p-3 rounded mb-4 resize-none"
        placeholder="Describe your video idea..."
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="my-2">
        Prompt Suggestions:
        <ul className="list-disc ml-6 text-sm text-gray-600">
          <li>an astronaut riding a horse in space</li>
          <li>cyberpunk city street at night</li>
          <li>golden sunset over a mountain lake</li>
        </ul>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "🎬 Generate Video"}
      </button>

      {error && (
        <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
      )}

      {videoUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📽️ Generated Video</h2>
          <video
            controls
            src={videoUrl}
            className="w-full rounded-lg shadow"
            poster="/placeholder.png"
          >
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-500 mt-1">
            Right-click to download or save the video.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
