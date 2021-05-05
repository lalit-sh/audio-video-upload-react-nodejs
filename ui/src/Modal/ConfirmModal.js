import React, { Component } from 'react'
import Modal from "./index";

class ConfirmModal extends Component {
    render () {
        let { confirmMessage, onYes, onNo, ...rest } = this.props;
        return (
            <Modal {...rest} header={rest.header || "Confirm"}>
                <div className="confirm-message text-center">
                    <p>
                        {confirmMessage}
                    </p>
                </div>
                <div className="action-container text-center">
                    <button className="btn btn-default" onClick={onNo} style={{marginRight: 10, width: 100}}>
                        No
                    </button>
                    <button className="btn btn-primary" onClick={onYes} style={{width: 100}}>
                        Yes
                    </button>
                </div>
            </Modal>
        )
    }
}

export default ConfirmModal