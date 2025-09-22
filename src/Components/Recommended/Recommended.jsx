import React, { useEffect } from "react";
import "./Recommended.css";
import { useState } from "react";
import axios from "axios";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setapiData] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchVideo = async () => {
    if (!categoryId) {
      console.log("Category ID not available yet");
      return;
    }
    const videoRecommend_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=50&key=${API_KEY}`;

    try {
      const response = await axios.get(videoRecommend_url);
      setapiData(response.data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [categoryId]); // Added categoryId as dependency

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="side-video-list"
        >
          {item.snippet &&
          item.snippet.thumbnails &&
          item.snippet.thumbnails.medium ? (
            <img src={item.snippet.thumbnails.medium.url} alt="" />
          ) : null}
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
