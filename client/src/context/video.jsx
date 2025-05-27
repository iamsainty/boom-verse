import { createContext, useContext } from "react";

const VideoContext = createContext(null);

export const VideoProvider = ({children}) => {

    const serverUrl = "http://localhost:3000";

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

    return (
        <VideoContext.Provider value={{uploadVideo, getVideos}}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo = () => useContext(VideoContext);

export default useVideo;