import React from 'react'
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AVRecorder from "../AVRecorder";

const Main = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <VideoPlayer />
                </div>
                <div className="col-sm-12">
                    <AVRecorder />
                </div>
            </div>
        </div>
    )
}

export default Main;
