import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../style/VideoLibrary.css"; // create as needed

const VideoLibrary = () => {
    const [videos, setVideos] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        fetch("/labels.json")
            .then((res) => res.json())
            .then((data) => {
                const enabledVideos = data.filter((item) => item.enabled);
                setVideos(enabledVideos);
            });
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="video-library">
            <h2>📚 Video Library</h2>
            <ul className="video-list">
                {videos.map((video, index) => (
                    <li
                        key={video.name}
                        className={`video-item ${expandedIndex === index ? "expanded" : ""}`}
                    >
                        <div
                            className="video-title"
                            onClick={() => toggleExpand(index)}
                        >
                            ▶ {video.name}
                        </div>

                        {expandedIndex === index && (
                            <div className="video-details">
                                <p>{video.description}</p>
                                <ReactPlayer
                                    url={video.sample_video}
                                    controls={true}
                                    playing={true}
                                    muted={true}
                                    width="320px"
                                    height="180px"
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoLibrary;
