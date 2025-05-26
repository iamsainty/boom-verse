import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserAuth from '../context/userAuth';
import { MdOutlinePowerSettingsNew, MdSlowMotionVideo } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const tabs = [
  {
    name: 'Feed',
    path: '/feed',
    icon: <MdSlowMotionVideo size={18} />
  },
  {
    name: 'Create',
    path: '/create',
    icon: <AiOutlineVideoCameraAdd size={18} />
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <FiUser size={18} />
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <LuSettings2 size={18} />
  }
];

const Navigation = ({ tabActive }) => {
  const { user, fetchUser, logout } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    if (!user) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div className="text-center text-gray-500 mt-12 text-sm">Loading...</div>;
  }

  return (
    <>
    <aside className="sticky top-0 w-full h-[80vh] p-6 flex-col items-center gap-8 hidden md:flex">
      {/* User Info */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-2 bg-blue-100 text-blue-600">
          {user.name.charAt(0)}
        </div>
        <h1 className="text-lg font-semibold">{user.name}</h1>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="w-full flex flex-col gap-2.5">
        {tabs.map((tab) => {
            const isActive = tab.path === tabActive;
            return (
                <Link
                key={tab.name}
                to={tab.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                    isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
                >
              {tab.icon}
              {tab.name}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all cursor-pointer"
          >
          <MdOutlinePowerSettingsNew size={18} />
          Logout
        </button>
      </nav>
    </aside>
    <div className="md:hidden w-full absolute bottom-0 p-4 bg-white border-t border-gray-400 shadow-sm">
      <div className="flex items-center justify-evenly w-full space-x-1.5">
        {tabs.map((tab) => {
          const isActive = tab.path === tabActive;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                isActive
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              {tab.icon}
              <span className='text-xs'>{tab.name}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all cursor-pointer"
        >
          <MdOutlinePowerSettingsNew size={20} />
          <span className='text-xs'>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Navigation;
