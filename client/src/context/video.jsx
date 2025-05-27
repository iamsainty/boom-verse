import { createContext, useContext } from "react";

const VideoContext = createContext(null);

export const VideoProvider = ({children}) => {

  // const serverUrl = "http://localhost:3000";
  const serverUrl = "https://boom-verse-server.vercel.app/";

  
    const uploadVideo = async (videoData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${serverUrl}/api/videos/upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: videoData
            })

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error uploading video:", error);
            throw error;
        }
    }

    const getVideos = async (page) => {
        try {
            const response = await fetch(`${serverUrl}/api/videos/getvideos/${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            return data.videos;
        } catch (error) {
            console.error("Error fetching videos:", error);
            throw error;
        }
    }

    const purchaseVideo = async (videoId) => {
        try {
            const token = localStorage.getItem("token");
            console.log(videoId);
            const response = await fetch(`${serverUrl}/api/videos/purchase`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({videoId})
            })

            const data = await response.json();
            console.log(data);

            return data.message === "Video purchased successfully";
        } catch (error) {
            console.error("Error purchasing video:", error);
            return false;
        }
    }

    const addComment = async (videoId, comment) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${serverUrl}/api/videos/comment`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({videoId, comment})
            })

            const data = await response.json();
            console.log(data);

            return data.message === "Comment added successfully";
        } catch (error) {
            console.error("Error adding comment:", error);
            return false;
        }
    }

    const sendGift = async (videoId, amount, comment) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${serverUrl}/api/videos/gift`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({videoId, amount, comment})
            })

            const data = await response.json();
            console.log(data);

            return data.message === "Gift sent successfully";
        } catch (error) {
            console.error("Error sending gift:", error);
            return false;
        }
    }

    return (
        <VideoContext.Provider value={{uploadVideo, getVideos, purchaseVideo, addComment, sendGift}}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo = () => useContext(VideoContext);

export default useVideo;