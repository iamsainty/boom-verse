import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import useVideo from '../context/video';
import useUserAuth from '../context/userAuth';
import { IoPlayOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getVideos } = useVideo();
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos(page);
      setVideos(data);
      setPage(page + 1);
    };
    fetchVideos();
  }, []);

  const hasPurchased = (videoId) => {
    if (!user) return false;
    return user.purchasedVideos?.some((item) => item.videoId === videoId);
  };

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleBuyClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    // Add purchase logic here
    console.log("Purchasing video:", selectedVideo._id);
    setIsModalOpen(false);
  };

  const handleCancelPurchase = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:h-screen flex items-center">
        <Navigation tabActive="/feed" />
      </div>

      <div className="w-full md:w-3/4 h-screen flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {videos.map((video) => (
          <div key={video._id} className="w-full md:w-1/2 min-h-screen snap-start flex items-center justify-center p-4">
            {video.videoType === 'short' ? (
              <div className="w-full md:h-[75vh] relative rounded-2xl overflow-hidden">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white w-full">
                  <p className="font-semibold">@{video.creator.username}</p>
                  <p className="text-sm">{video.title}</p>
                  <p className="text-sm">{video.description.slice(0, 50)}...</p>
                </div>
              </div>
            ) : (
              <div className="w-full md:h-[75vh] relative rounded-2xl overflow-hidden">
                {playingVideoId === video._id ? (
                  <iframe
                    className="w-full h-full rounded-2xl"
                    src={getYouTubeEmbedUrl(video.videoUrl)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}

                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white w-full">
                  <p className="font-semibold">@{video.creator.username}</p>
                  <p className="text-sm">{video.title}</p>
                </div>

                <div className="absolute top-4 right-4">
                  {!video.isPaid || hasPurchased(video._id) ? (
                    <button
                      className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full text-sm border border-blue-600 font-semibold"
                      onClick={() => setPlayingVideoId(video._id)}
                    >
                      <IoPlayOutline className="mr-2" />
                      Play
                    </button>
                  ) : (
                    <button
                      className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full text-sm border border-blue-600 font-semibold"
                      onClick={() => handleBuyClick(video)}
                    >
                      Buy <AiOutlineDollar className="ml-2" />{video.price}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && selectedVideo && (
  <div className="fixed w-full inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-blue-50 p-6 rounded-2xl max-w-xl w-full shadow-2xl border border-blue-100">
      <h2 className="text-2xl font-bold text-black mb-4">Buy Video</h2>

      <div className="space-y-2 text-black">
        <p>
          <span className="font-semibold">Creator:</span> @{selectedVideo.creator.username}
        </p>
        <p>
          <span className="font-semibold">Title:</span> {selectedVideo.title}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {selectedVideo.description}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">Price:</span> <AiOutlineDollar className="ml-2" />{selectedVideo.price}
        </p>
      </div>

      <p
        className={`flex items-center mt-4 bg-blue-100 p-2 rounded-lg text-blue-800 border border-blue-600`}
      >
        <IoInformationCircleOutline className="mr-2" />
        {user.balance >= selectedVideo.price
          ? "You have enough coins in your wallet to purchase this video."
          : "You don't have enough coins in your wallet to purchase this video."}
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCancelPurchase}
          className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmPurchase}
          disabled={user.balance < selectedVideo.price}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Feed;
