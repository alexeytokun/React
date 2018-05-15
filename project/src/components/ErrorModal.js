import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import {ERRORS} from "../constants";

class ErrorModal extends Component {

    handleClose() {
        this.props.onClose();
    }

    render() {
        if(!this.props.error) return null;
        console.log(this.props.error);

        return(
            <Modal size='mini' open={!!this.props.error} onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    Error
                </Modal.Header>
                <Modal.Content>
                    <p>{ERRORS[this.props.error] || this.props.error}</p>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ErrorModal;
