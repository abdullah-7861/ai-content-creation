"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Music,
  Image,
  Video,
  Sparkles,
  Zap,
  LogIn,
  LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer
        bg-white border border-gray-200
        p-8 rounded-2xl shadow-lg
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        hover:border-gray-300
      `}
    >
      <div className="relative z-10">
        <div
          className={`flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-gradient-to-br ${gradient} rounded-xl`}
        >
          <Icon size={32} className="text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {title}
        </h3>

        <p className="text-gray-600 text-center leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex justify-center">
          <span
            className={`inline-flex items-center bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-medium group-hover:scale-105 transition-transform`}
          >
            Get Started
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />
    </div>
  );
};

const HomePage = () => {
  const router = useRouter();
  const features = [
    {
      title: "Resume Builder",
      description:
        "Create professional resumes with AI-powered suggestions and modern templates. Stand out from the crowd with perfectly formatted CVs.",
      icon: FileText,
      gradient: "from-blue-500 to-blue-700",
      onClick: () => router.push("/resume"),
    },
    {
      title: "Music Generation",
      description:
        "Generate original music compositions using advanced AI. Create beats, melodies, and full tracks in any genre you desire.",
      icon: Music,
      gradient: "from-purple-500 to-pink-600",
      onClick: () => router.push("/music-gen"),
    },
    {
      title: "Photo/Video Shop",
      description:
        "Professional photo and video editing powered by AI. Remove backgrounds, enhance quality, and apply stunning effects effortlessly.",
      icon: Image,
      gradient: "from-green-500 to-teal-600",
      onClick: () => router.push("/Editor"),
    },
    {
      title: "Video Generator",
      description:
        "Transform text into engaging videos with AI narration, visuals, and animations. Perfect for social media and presentations.",
      icon: Video,
      gradient: "from-orange-500 to-red-600",
      onClick: () => router.push("/video"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Content Studio
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <a
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-md transition-all"
              href="/dashboard"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create Amazing Content
              </h2>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Unleash your creativity with our suite of AI-powered tools. From
            professional resumes to stunning videos, create content that
            captivates and converts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to transform your creative workflow?
          </p>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-md transition-all"
            onClick={() => router.push("/dashboard")}
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
