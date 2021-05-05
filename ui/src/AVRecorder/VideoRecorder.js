import React from 'react';
import VideoRecorder from 'react-video-recorder';


const VideoRecord = (props) => {
    return (
        <div className="overwriteRow in-container">
			<div className="video-recorder">
				<VideoRecorder 
					onRecordingComplete={videoBlob => {
						props.onRecordingComplete && props.onRecordingComplete(videoBlob);
					}}
					replayVideoAutoplayAndLoopOff={true}
					showReplayControls={true}
					isOnInitially={true}
				/>
			</div>
        </div>
    )
}
export default VideoRecord;