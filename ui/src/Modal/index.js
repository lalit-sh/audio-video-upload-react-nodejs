import React, { Component, createRef } from 'react'
import "./style.css";
import CloseIcon from '@material-ui/icons/Close';

export default class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.modalBody = createRef();
        this.modalOverlay = createRef();
    }

    componentWillReceiveProps(nextProps) {
        this.toggleBodyClass(nextProps.isOpen);
    }

    toggleBodyClass(isOpen){
        let body = document.getElementsByTagName("body")[0];
        let className = "_modal_open_body";
        if(isOpen){
            if(body && !body.classList.contains(className)){
                body.classList.add(className);
            }
        }else{
            if(body && body.classList.contains(className)){
                body.classList.remove(className);
            }
        }
    }
    
    
    handleOverlayClick(event){
        if(event.target != this.modalOverlay.current){
            return;
        }

        if(this.props.closeOnOverlayClick){
            this.handleClose()
        }
    }

    handleClose(){
        if(this.props.onClose)
            this.props.onClose();
    }

    componentWillUnmount () {
        this.toggleBodyClass(false);
    }
    
    
    render() {
        let { className, children, header, isOpen, isClose, closeButtonPos } = this.props;
        if(!isOpen)
            return null;

        return (
            <div className={`${className} modal modal-overlay`} onClick={this.handleOverlayClick} ref={this.modalOverlay}>
                {(isClose && closeButtonPos.toLowerCase() == "outside") &&
                    <span className="close-modal-btn">
                        <CloseIcon onClick={this.handleClose}/>
                    </span>
                }
                <div className="modal-content" ref={this.modalBody}>
                    {header &&
                        <div className="modal-header">
                            <span>
                                {header}
                            </span>
                            {(isClose && closeButtonPos.toLowerCase() == "inside") &&
                                <span className="close-modal-btn">
                                    <CloseIcon onClick={this.handleClose}/>
                                </span>
                            }
                        </div>
                    }
                    <div className="modal-body">
                        {children}                        
                    </div>
                </div>
            </div>
        )
    }
}

Modal.defaultProps = {
    closeOnOverlayClick: true,
    className: "",
    header: "",
    isClose: true,
    closeButtonPos: "inside"
};


