
import { HomeIcon, LucideUserRound, User, UserIcon } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className=" py-4 px-16 shadow-sm border-b-2 flex justify-between items-center bg-white ">
        <div>
          <Image src={"/logo.svg"} alt="logo" width={120} height={100} />
        </div>
        <div className="">
          <a className=" text-slate-400 flex gap-2 " href="/dashboard">
            |<UserIcon className=" ml-2 h-6 w-5" /> Get Started
          </a>
        </div>
      </div>

      <div className="mt-44 max-w-2xl text-center mx-auto">
        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
          AI Content
          <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
            Generator
          </span>
        </h1>
      </div>

      <div className="mt-10 max-w-3xl text-center mx-auto">
        <p className="text-lg text-gray-600 dark:text-neutral-400">
          Revolutionize your content creation with our AI-powered app,
          delivering engaging and high-quality text in seconds.
        </p>
      </div>

      <div className="mt-10 gap-3 flex justify-center">
        <a
          className="inline-flex justify-center items-center  gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
          href="/dashboard"
        >
          Get Started
        </a>
      </div>
    </>
  );
}
