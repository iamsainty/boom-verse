import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import useVideo from '../context/video';
import { useNavigate } from 'react-router-dom';
import useUserAuth from '../context/userAuth';
const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoType, setVideoType] = useState('short');
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);

  const { user, fetchUser } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetch = async () => {
      if (!user && token) {
        fetchUser();
      }
    }
    fetch();
    if (!user || !token) {
      navigate('/login');
    }
  }, [user, navigate, fetchUser]);  

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4' && file.size <= 10 * 1024 * 1024) {
      setVideoFile(file);
    } else {
      alert('Please upload a .mp4 file less than 10MB.');
      e.target.value = null;
      setVideoFile(null);
    }
  };

  const {uploadVideo} = useVideo();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoType", videoType);
    formData.append("isPaid", price > 0);
    formData.append("price", price);
    if(videoType === 'short') {
      formData.append("videoFile", videoFile);
    } else {
      formData.append("videoUrl", videoUrl);
      formData.append("thumbnail", thumbnail);
    }
    
    try {
      const result = await uploadVideo(formData);
      navigate('/feed');
      console.log(result);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/5 md:h-screen flex items-center'>
        <Navigation tabActive="/upload" />
      </div>

      <div className="w-full md:w-4/5 p-6 md:p-12 space-y-10 my-10 mb-20">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Upload</h1>
          <p className="text-gray-600">Upload a new video</p>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title for your video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-semibold tracking-wide bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none "
        />

        {/* Description Input */}
        <textarea
          placeholder="Brief description for your video"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-base font-medium tracking-wide bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none "
        />

        {/* Video Type Toggle */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <p className="font-medium text-gray-700">Video Type:</p>
          <div className="flex flex-row items-center gap-4">
            {['short', 'long'].map((type) => (
              <button
                key={type}
              className={`px-4 py-2 rounded-lg transition font-medium border ${
                videoType === type
                  ? 'bg-blue-100 text-blue-600 border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setVideoType(type)}
            >
                {type === 'short' ? 'Short Form' : 'Long Form'}
              </button>
            ))}
          </div>
        </div>

        {/* Short Form Video Upload */}
        {videoType === 'short' && (
          <div>
            <div
              className="w-full max-w-xl h-64 bg-white border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition"
              onClick={() => document.getElementById('videoFileInput').click()}
            >
              {videoFile ? (
                <video
                  src={URL.createObjectURL(videoFile)}
                  className="w-full h-full object-contain rounded"
                  controls
                />
              ) : (
                <span className="text-gray-500">Click to select a video</span>
              )}
            </div>
            <input
              type="file"
              id="videoFileInput"
              accept=".mp4"
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>
        )}

        {/* Long Form Video Inputs */}
        {videoType === 'long' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="https://youtube.com/..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full text-base font-medium tracking-wide bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none "
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
              className="w-full text-base font-medium tracking-wide bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none "
              placeholder="Enter price"
            />

            <div
              className="w-full max-w-xl h-64 bg-white border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition"
              onClick={() => document.getElementById('thumbnailInput').click()}
            >
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">Click to select a thumbnail</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="thumbnailInput"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="hidden"
            />
          </div>
        )}

        {/* Upload Button */}
        <button className="bg-blue-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-300 transition font-semibold" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
