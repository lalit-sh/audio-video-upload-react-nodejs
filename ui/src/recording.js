import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MicIcon from "@material-ui/icons/Mic";
import VideoRecord from "./video/VideoRecorder";
import AudioRecorder from "./audio/AudioRecoder";

class Recording extends React.Component {
    state = {
        childVisible: false,
        audioVisible: false
      };
    static getDerivedStateFromProps(props, state) {
        if (props.isDiscard) 
        return ({
            childVisible: false,
            audioVisible: false 
        })
        return null
    }
  render () {
    const { showing } = this.state;
    return (
      <div className="border border-dark mt-4 boxWidth">
        {(!this.state.childVisible && !this.state.audioVisible) && 
            <React.Fragment>
         <div className="border-bottom border-dark" onClick={() => this.onClick("video")}>
          <CameraAltIcon />
          <h2>CLICK TO RECORD MY VIDEO</h2>
          <p>WILL USE LAPTOPS/WEBCAM/PHONE'S CAMERA</p>
        </div>
        <div onClick={() => this.onClick("audio")}>
          <MicIcon />
          <h2>CLICK TO RECORD MY AUDIO</h2>
          <p>WILL USE LAPTOPS/PHONE'S MICROPHONE</p>
        </div>
    </React.Fragment>
}
        <div className = "recoderCon">
        {(!this.state.childVisible &&
            this.state.audioVisible)
              && <AudioRecorder />
          }{(!this.state.audioVisible &&
            this.state.childVisible)
              && <VideoRecord />
          }</div>
      </div>
    )
  }

  onClick(type) {
      let audioVisible,childVisible;
      if (type == 'audio') {
        audioVisible = true
        childVisible = false
      }
      if (type == 'video') {
        audioVisible = false
        childVisible = true
      }


      this.setState({
        audioVisible,childVisible
      })
  }
  
      
 
};
export default Recording;
