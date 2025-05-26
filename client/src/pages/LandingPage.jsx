import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import { MdOutlineVideoLibrary, MdStars } from 'react-icons/md';
import { PiVideoCameraFill } from 'react-icons/pi';
import { FaCirclePlay } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";



export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F9FAFB] via-[#EEF2F7] to-[#E6ECF3] text-gray-800 relative overflow-hidden p-6">

      <MdOutlineVideoLibrary className="text-[160px] text-black/5 absolute top-10 right-10 animate-pulse-slow rotate-[15deg]" />
      <FaRocket className="text-[100px] text-black/5 absolute bottom-16 left-16 animate-float-slow rotate-[12deg]" />
      <MdStars className="text-[130px] text-black/5 absolute top-1/3 left-10 animate-spin-slow" />
      <PiVideoCameraFill className="text-[140px] text-black/5 absolute bottom-20 right-10 animate-fade-in-slow" />

      {/* Main Content */}
      <div className="z-10 text-center max-w-4xl space-y-10 py-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#2563EB] leading-tight">
          Break the Boredom.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-[#1E40AF]">BoomVerse</span> is your portal to bold, creator-first video experiences. From passionate projects to professional showcases — launch, share, and connect like never before.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1E40AF] transition hover:scale-105 active:scale-100 flex items-center gap-2 justify-center"
          >
            <TiUserAdd /> Get Started
          </Link>
          <Link
            to="/login"
            className="border border-[#2563EB] text-[#2563EB] px-8 py-3 rounded-full font-semibold hover:bg-[#2563EB] hover:text-white transition hover:scale-105 active:scale-100 flex items-center gap-2 justify-center"
          >
            <FaCirclePlay /> Already a Member?
          </Link>
        </div>
      </div>
    </div>
  );
}
