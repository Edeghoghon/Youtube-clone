import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import { value_converter } from "../../data";
import axios from "axios";
import moment from "moment";
import { slice } from "lodash";
import { useParams } from "react-router-dom";

const PlayVideo = ({ onCategoryFetch }) => {
  const { videoID } = useParams();
  const [apidata, setApidata] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [channelComment, setchannelComment] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  //fetch video data
  const fetchVideo = async () => {
    const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${API_KEY}

  
`;
    if (API_KEY) {
      console.log("API Key is defined");
    } else {
      console.log("API Key is NOT defined");
    }

    try {
      const response = await axios(videoDetails_url);
      setApidata(response.data.items[0]);

      if (
        onCategoryFetch &&
        response.data.items[0]?.snippet?.categoryId //newly added
      ) {
        onCategoryFetch(response.data.items[0].snippet.categoryId);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  //fetch channel data
  const fetchChanneldata = async () => {
    const videoData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
    const response = await axios(videoData_url);
    setChannelData(response.data.items[0]);
  };

  // fetch comment data
  const fetchCommentdata = async () => {
    const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoID}&maxResults=50&key=${API_KEY}
`;
    try {
      const response = await axios(videoComment_url);
      setchannelComment(response.data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [videoID]);

  useEffect(() => {
    if (apidata) {
      fetchChanneldata();
    }
  }, [apidata]);

  useEffect(() => {
    fetchCommentdata();
  }, []);

  return (
    <div className="PlayVideo">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullscreen
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {apidata ? value_converter(apidata.statistics.viewCount) : "16k"}{" "}
          Views &bull;{" "}
          {apidata ? moment(apidata.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_converter(apidata.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />
            12.5K
          </span>
          <span>
            <img src={share} alt="" />
            12
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "2k"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>
          {apidata
            ? apidata.snippet.description.slice(0, 250)
            : "Description Here  "}
        </p>
        <hr />
        <h4>
          {apidata ? value_converter(apidata.statistics.commentCount) : 102}{" "}
          Comments
        </h4>

        {channelComment.map((item, index) => {
          return (
            <div className="comment" key={index}>
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
