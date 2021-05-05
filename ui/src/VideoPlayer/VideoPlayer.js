import React from "react";
import ReactPlayer from "react-player";
import './Style.css';

const VideoPlayer = () => {
    return (
        <div className="vdplayer">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            width="100%"
          />
        </div>
    )
}

export default VideoPlayer;