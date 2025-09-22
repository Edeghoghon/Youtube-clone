import React from "react";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import "./Video.css";
import Recommended from "../../Components/Recommended/Recommended";
import { useParams } from "react-router-dom";
const Video = () => {
  const { videoID } = useParams();
  const [categoryId, setCategoryId] = React.useState(null);
  return (
    <div className="play-container">
      <PlayVideo videoID={videoID} onCategoryFetch={setCategoryId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
