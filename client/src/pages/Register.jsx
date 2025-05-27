import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import { MdOutlineVideoLibrary, MdStars } from 'react-icons/md';
import { PiVideoCameraFill } from 'react-icons/pi';
import useUserAuth from '../context/userAuth';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
  });

  const { register, user, fetchUser } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetch = async () => {
      if (token) {
        fetchUser();
      }
    }
    fetch();

    if (user && token) {
      navigate('/feed');
    }
  }, [user, navigate, fetchUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(form.name, form.username, form.password);
      if (result) {
        navigate('/feed');
        window.location.reload();
      }
      else {
        alert(result);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] via-[#EEF2F7] to-[#E6ECF3] text-gray-700 px-4 py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons */}
      <MdOutlineVideoLibrary className="text-[160px] text-black/5 absolute top-10 right-10 animate-pulse-slow rotate-[15deg]" />
      <FaRocket className="text-[100px] text-black/5 absolute bottom-16 left-16 animate-float-slow rotate-[12deg]" />
      <MdStars className="text-[130px] text-black/5 absolute top-1/3 left-10 animate-spin-slow" />
      <PiVideoCameraFill className="text-[140px] text-black/5 absolute bottom-20 right-10 animate-fade-in-slow" />

      <div className="backdrop-blur-md rounded-2xl shadow-xl w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden border border-black/10 bg-white">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center items-center w-full lg:w-1/2 p-10 text-center bg-gradient-to-br from-white to-[#f1f5f9]">
          <h2 className="text-3xl font-bold text-[#2563EB] mb-4">Welcome to BoomVerse</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Become a part of a vibrant creator community. Share, collaborate, and launch your vision with ease and excitement!
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <div className="max-w-md mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#2563EB] flex items-center justify-center gap-2 md:hidden">Join BoomVerse</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg bg-[#F1F5F9] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#93C5FD] transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="johndoe123"
                  className="w-full px-4 py-2 rounded-lg bg-[#F1F5F9] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#93C5FD] transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-[#F1F5F9] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#93C5FD] transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] text-white font-semibold py-2.5 rounded-full hover:bg-[#1E40AF] transition-all hover:scale-[1.03] active:scale-100"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#2563EB] hover:underline hover:text-[#1E40AF] transition"
              >
                Log in here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  }
