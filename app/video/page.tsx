
import { getGenLimit } from "../api/generate-limit/route";
import FreeCounter from "../music-gen/_components/FreeCounter";
import VideoGenerator from "./_components/videoGenerator";

const VideoPage = async () => {
  const userGenerationLimit = await getGenLimit();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <header className="mb-8 mt-10">
        <h1 className="text-5xl font-bold text-white tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
            Video Genesis
          </span>
        </h1>
        <p className="text-lg text-indigo-200 text-center max-w-xl">
          Describe a scene and let AI turn it into a moving video.
        </p>
      </header>

      <main className="w-full max-w-xl">
        <VideoGenerator />
      </main>

      <footer className="mt-12 text-center text-sm text-indigo-300">
      <FreeCounter userGenerationLimit={userGenerationLimit} />
      </footer>
    </div>
  );
};

export default VideoPage;
