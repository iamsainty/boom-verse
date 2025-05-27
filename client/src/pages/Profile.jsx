import React from 'react';
import Navigation from '../components/Navigation';
import useUserAuth from '../context/userAuth';

const Profile = () => {
  const { user } = useUserAuth();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:h-screen flex items-center">
        <Navigation tabActive="/profile" />
      </div>

      <div className="w-full md:w-3/4 h-screen flex flex-col items-center px-2">
        <div className="w-full md:w-2/3 min-h-screen flex items-center justify-center p-4">
          <div className="w-full md:h-[75vh] relative rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
            {user ? (
              <div className="space-y-4 text-lg">
                <div>
                  <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div>
                  <span className="font-semibold">Username:</span> {user.username}
                </div>
                <div>
                  <span className="font-semibold">Balance:</span> ₹{user.balance}
                </div>
                <div>
                  <span className="font-semibold">Purchased Videos:</span> {user.purchasedVideos?.length || 0}
                </div>
                <div>
                  <span className="font-semibold">Joined On:</span>{' '}
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">Loading user data...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
