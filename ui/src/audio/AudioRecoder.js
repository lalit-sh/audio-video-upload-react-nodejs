import React, { Component } from "react";
import { ReactMic } from 'react-mic';
import "./style.css";
class AudioRecorder extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
  }

  startRecording = () => {
    this.setState({ record: true });
  }

  stopRecording = () => {
    this.setState({ record: false });
  }

  onStop = (recordedBlob) => {
    this.setState({
      url: recordedBlob.blobURL
    })

    this.props.onRecordingComplete && this.props.onRecordingComplete(recordedBlob)
  }

  render() {
    return (
      <div className="react-mic-container">
        <div className="react-mic">
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#87CEEB"
            backgroundColor="#000000" 
          />
        </div>
        <audio controls controlsList="nodownload" src={this.state.url || ""}/>
        <div className="btn-container">
          <button disabled={this.state.record} className="btn btn-success" onClick={this.startRecording} type="button">Start</button>
          <button className="btn btn-danger" disabled={!this.state.record} onClick={this.stopRecording} type="button">Stop</button>
        </div>
      </div>
    );
  }
}

export default AudioRecorder;