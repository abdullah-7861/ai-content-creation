"use client";
import MusicGenerator from "./_components/MusicGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 p-4">
      <header className="mb-8">
        <h1 className="text-5xl font-bold text-white tracking-tight mb-2 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
            Audio Genesis
          </span>
        </h1>
        <p className="text-lg text-purple-200 text-center max-w-md">
          Transform your ideas into music with AI-powered audio generation
        </p>
      </header>

      <main className="w-full max-w-xl">
        <MusicGenerator />
      </main>

      <footer className="mt-12 text-center text-sm text-purple-300">
        <p>Powered by AI Content Creation FYP</p>
        <p className="mt-1 text-purple-400/70">
          © {new Date().getFullYear()} Audio Genesis
        </p>
      </footer>
    </div>
  );
};

export default Index;
