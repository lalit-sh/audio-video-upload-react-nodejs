import React, { Component, createRef } from 'react'
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import VideoRecord from './VideoRecorder';
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AudioRecorder from '../audio/AudioRecoder';
import Modal from "../Modal";
import Popup from "../popup/welcome";
import axios from 'axios';
import ReactPlayer from "react-player";

const icon = [
	{
		icon: <VideoLibraryIcon style={{ "fontSize": "-webkit-xxx-large" }}/>,
		label: "PREVIEW"
	},
	{
		icon: <CheckCircleIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "SAVE THIS RECORDING"
	},
	{
		icon: <CancelRoundedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "DISCARD THIS"
	},
	{
		icon: <AlbumOutlinedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "RECORD AGAIN"
	}
];


class Recorder extends Component {

    state = {
        v: false,
        a: false,
        uploadModal: false,
        recentUploads: [],
        previewModal: false
    }

    handleAVAction = t => {
        let { a, v } = this.state;
        if(t == 'a'){
            a = true;
            v = false;
        }
        if(t == 'v'){
            a = false;
            v = true;
        }

        this.setState({a, v})
    }

    handleAction = action => {
        let a = action.toLowerCase();
        if(a == 'discard this'){
            this.setState({a: false, v: false});
        }

        if(a == 'save this recording'){
            this.saveRecording()
        }

        if(a == 'record again'){
            this.resetRecorder()
        }

        if(a == 'preview'){
            this.playRecording()
        }
    }

    saveRecording = () => {
        let blob = this.state.blob;
        if(!blob) return false;
        let d = new FormData();
        let ext = this.state.a && "wav" || this.state.v && "webm"
        d.append('file', blob, `file.${ext}`);
        if(this.state.a)
            d.append("type", 'audio');
        if(this.state.v)
            d.append("type", 'video');

        axios.post("/api/v1/uploads", d)
        .then(resp => {
            if(resp && resp.status == 200){
                let recentUploads = [...this.state.recentUploads];
                recentUploads.unshift(resp.data);
                recentUploads.slice(0, 4);
                this.setState({
                    uploadModal: true,
                    recentUploads,
                    a: false,
                    v: false
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleUpload = () => {
        this.setState({
            a: false,
            v: false,
            uploadModal: true
        })
    }

    closeModal = () => {
        this.setState({
            uploadModal: false
        })
    }

    handleRecordComplete = (blob) => {
        this.setState({
            blob: blob.blob || blob
        })
    }

    componentDidMount() {
        this.getRecentRecordings();
    }

    getRecentRecordings = () => {
        axios.get(`/api/v1/uploads?limit=5`)
        .then(resp => {
            if(resp && resp.data){
                let recentUploads = [...this.state.recentUploads, ...resp.data];
                this.setState({
                    recentUploads: recentUploads
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    togglePreviewModal = () => {
        this.setState({
            previewModal: !this.state.previewModal
        })
    }

    handlePlayAV = (id, url, type) => {
        this.setState({
            playMe: {
                id,
                url, type
            }
        })
    }
    
    render() {
        let { a, v } = this.state;
        return (
                <div className="row">
                    {(!a && !v) &&
                        <div className="col-sm-12">
                            <div className="banner av-recorder in-container">
                                <div className="media-section text-center" onClick={() => this.handleAVAction("v")}>
                                    <CameraAltIcon />
                                    <h2>CLICK TO RECORD MY VIDEO</h2>
                                    <p>WILL USE LAPTOPS/WEBCAM/PHONE'S CAMERA</p>
                                </div>
                                <div className="media-section text-center" onClick={() => this.handleAVAction("a")}>
                                    <MicIcon />
                                    <h2>CLICK TO RECORD MY AUDIO</h2>
                                    <p>WILL USE LAPTOPS/PHONE'S MICROPHONE</p>
                                </div>
                            </div>
                        </div>
                    }
                    {v && 
                        <div className="col-sm-12">
                            <VideoRecord onRecordingComplete={this.handleRecordComplete}/>
                        </div>
                    }
                    {a &&
                        <div className="col-sm-12">
                            <div className="in-container ad-rec-con">
                                <AudioRecorder onRecordingComplete={this.handleRecordComplete}/>
                            </div>
                        </div>
                    }
                    {(a || v) && 
                        <div className="col-sm-12">
                            <div className="foot-icon in-container">
                                {icon.map((el, i) => 
                                    <div className="icon-set" key={i} onClick={() => this.handleAction(el.label)}>
                                        {el.icon}
                                        <b>{el.label}</b>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <div className="col-sm-12">
                        <div className="btm-action-container in-container">
                            <button className="btn btn-info" onClick={this.handleUpload}>
                                Upload
                            </button>
                            <button className="btn btn-danger" onClick={this.togglePreviewModal}>
                                Browse Saved Recordings & Upload
                            </button>
                        </div>
                    </div>

                    <Modal closeOnOverlayClick={true} className="mmmModal" isOpen={this.state.uploadModal} onClose={this.closeModal}>
                        <Popup />
                    </Modal>
                    <Modal header={"Play Recents"} className="preview-modal" isOpen={this.state.previewModal} onClose={this.togglePreviewModal}>
                        <div className="row">
                            <div className="col-sm-12">
                                {this.state.recentUploads.length <= 0 &&
                                    <div className="alert alert-info text-center">
                                        You have no recording to play.
                                    </div>
                                }
                                {this.state.recentUploads.length > 0 &&
                                    this.state.recentUploads.map((el, i) => 
                                        <div className='dd-hanger' key={i} onClick={() => this.handlePlayAV(el._id, el.url, el.type)}>
                                            <PlayCircleOutlineIcon />
                                            <span>
                                                {el.filename}
                                            </span>
                                            <span className="pull-right">
                                                ({el.type && el.type.toUpperCase()})
                                            </span>
                                            {(this.state.playMe && this.state.playMe.id == el._id) &&
                                                <div className="play-me">
                                                    {el.type == 'audio' &&
                                                        <audio autoPlay src={`/${el.url}`} controls />
                                                    }
                                                    {el.type == 'video' &&
                                                        <video
                                                            src={`/${el.url}`}
                                                            width="100%"
                                                            controls
                                                            autoPlay
                                                        />
                                                    } 
                                                </div>
                                            }
                                        </div>
                                )}
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

export default Recorder;




