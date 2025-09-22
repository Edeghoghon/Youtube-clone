import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./Search.css";

const Search = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=20&key=${API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items);
    };
    fetchVideos();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Results for "{query}"</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <Link
            key={video.id.videoId}
            className="video-card"
            to={`/video/${video.snippet.categoryId || "0"}/${video.id.videoId}`}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
