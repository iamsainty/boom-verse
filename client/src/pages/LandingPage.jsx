import { Link } from 'react-router-dom';
import { FaRocket, FaUserAstronaut } from 'react-icons/fa';
import { MdOutlineVideoLibrary, MdStars } from 'react-icons/md';
import { PiVideoCameraFill } from 'react-icons/pi';
import { IoMdPlay } from 'react-icons/io';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 relative overflow-hidden gap-4">
      <MdOutlineVideoLibrary className="text-[180px] text-white/10 absolute top-10 right-10 animate-pulse-slow rotate-[15deg]" />
      <FaRocket className="text-[120px] text-white/10 absolute bottom-16 left-16 animate-float-slow rotate-[12deg]" />
      <MdStars className="text-[150px] text-white/10 absolute top-1/3 left-10 animate-spin-slow" />
      <PiVideoCameraFill className="text-[160px] text-white/10 absolute bottom-30 right-10 animate-fade-in-slow" />

      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center animate-fade-in tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        Dive into <span className="text-[#FEE440] drop-shadow-md">BoomVerse</span>
      </h1>

      <p className="text-lg md:text-xl text-center mb-3 md:max-w-3xl text-gray-200 animate-fade-in delay-200 leading-relaxed">
        Welcome to a galaxy of creators — where stories spark, vibes collide, and energy flows.
      </p>
      <p className="text-base md:text-lg text-center mb-8 max-w-2xl text-gray-300 animate-fade-in delay-300 leading-relaxed">
        Whether you're vibing, creating, or just scrolling in style, BoomVerse is your cosmic playground. Share your moments. Ignite the feed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in delay-400">
        <Link to="/login">
          <button className="flex items-center justify-center gap-2 bg-[#FEE440] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#FF6F61] transition-all shadow-lg hover:scale-105">
            <IoMdPlay className="text-2xl" /> Enter BoomVerse
          </button>
        </Link>
        <Link to="/register">
          <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-[#5EEAD4] transition-all shadow-lg hover:scale-105">
            <FaUserAstronaut className="text-xl" /> Join the Journey
          </button>
        </Link>
      </div>
    </div>
  );
}
