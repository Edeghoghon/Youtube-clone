import { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { value_converter } from "../../data";
import axios from "axios";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const FetchData = async () => {
    const videolist_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=54&key=${API_KEY}
`;
    const response = await axios(videolist_url);
    setData(response.data.items);
  };

  useEffect(() => {
    FetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
