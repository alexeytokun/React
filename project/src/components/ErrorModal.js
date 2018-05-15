import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class ErrorModal extends Component {

    render() {
        if(!this.props.error) return null;

        return(
            <Modal size='mini' open={!!this.props.error}>
                <Modal.Header>
                    Error
                </Modal.Header>
                <Modal.Content>
                    <p>{this.props.error.message}</p>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ErrorModal;