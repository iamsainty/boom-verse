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
  const [purchasedVideos, setPurchasedVideos] = useState([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [commentVideo, setCommentVideo] = useState(null);
  const { getVideos, purchaseVideo, addComment } = useVideo();
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos(page);
      setVideos(data);
      setPage(prev => prev + 1);
    };
    fetchVideos();
  }, []);

  const hasPurchased = (videoId) => {
    if (!user) return false;
    return user.purchasedVideos?.some((item) => item.videoId === videoId) || purchasedVideos.includes(videoId);
  };

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleBuyClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    const success = await purchaseVideo(selectedVideo._id);
    if (success) {
      setIsModalOpen(false);
      setSelectedVideo(null);
      setPurchasedVideos([...purchasedVideos, selectedVideo._id]);
    }
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

      <div className="w-full md:w-3/4 h-screen flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scroll-smooth px-2">
        {videos.map((video) => (
          <div key={video._id} className="w-full md:w-2/3 min-h-screen snap-start flex items-center justify-center p-4">
            <div className="w-full md:h-[75vh] relative rounded-2xl overflow-hidden shadow-lg">
              {video.videoType === 'short' ? (
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              ) : playingVideoId === video._id ? (
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

              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white w-full space-y-2">
                <p className="font-semibold">@{video.creator.username}</p>
                <p className="text-sm">{video.title}</p>
                {video.videoType === 'short' && (
                  <p className="text-sm">{video.description.slice(0, 50)}...</p>
                )}
                <p className="text-sm w-fit cursor-pointer backdrop-blur-lg bg-white/20 border border-white/30 px-3 py-1 rounded-full" onClick={() => {
                  setCommentVideo(video);
                  setCommentModalOpen(true);
                }}>View comments</p>
              </div>

              <div className="absolute top-4 right-4">
                {!video.isPaid || hasPurchased(video._id) ? (
                  <button
                    className={`flex items-center bg-white/80 hover:bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow border border-blue-600 transition ${video.videoType === 'short' ? 'hidden' : ''}`}
                    onClick={() => setPlayingVideoId(video._id)}
                  >
                    <IoPlayOutline className="mr-2" />
                    Play
                  </button>
                ) : (
                  <button
                    className="flex items-center bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold shadow border border-yellow-500 transition"
                    onClick={() => handleBuyClick(video)}
                  >
                    Buy <AiOutlineDollar className="ml-2" />{video.price}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Confirmation Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Buy Video</h2>

            <div className="space-y-2 text-gray-800">
              <p><strong>Creator:</strong> @{selectedVideo.creator.username}</p>
              <p><strong>Title:</strong> {selectedVideo.title}</p>
              <p><strong>Description:</strong> {selectedVideo.description}</p>
              <p className="flex items-center gap-1">
                <strong>Price:</strong> <AiOutlineDollar className="ml-1" /> {selectedVideo.price}
              </p>
            </div>

            <p className={`flex items-center mt-4 p-3 rounded-lg border ${user.balance >= selectedVideo.price ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'}`}>
              <IoInformationCircleOutline className="mr-2" />
              {user.balance >= selectedVideo.price
                ? "You have enough coins to purchase this video."
                : "Insufficient balance to purchase this video."}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancelPurchase}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium"
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

      {commentModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comment</h2>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-1 rounded-lg bg-blue-100 text-blue-800 border border-blue-600 hover:bg-blue-200 font-semibold disabled:opacity-50"
              onClick={() => {
                addComment(commentVideo._id, comment);
                setComment('');
                commentVideo.comments.push({
                  username: user.username,
                  content: comment,
                  createdAt: new Date(),
                });
              }}
            >
              Submit
            </button>
            <button
              className="px-4 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium"
              onClick={() => setCommentModalOpen(false)}
              >
                Cancel
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              {commentVideo.comments.length > 0 && (
                <p className="text-sm font-semibold">Recent comments</p>
              )}
              {commentVideo.comments.map((comment) => (
                <div key={comment._id} className="flex flex-col bg-blue-50 border border-blue-200 gap-1 p-2 rounded-lg">
                  <p className="text-sm font-semibold">{comment.username}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
