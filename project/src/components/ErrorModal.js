import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ERRORS } from '../constants';
import { saveError, removeError } from '../actions/errorsActions';

class ErrorModal extends Component {
    handleClose() {
        this.props.removeError();
    }

    render() {
        if (!this.props.error) return null;
        console.log(this.props.error);
        const err = this.props.error;

        let errorMessage;
        if (err.response) {
            errorMessage = (err.response.data && err.response.data.message) || err.message;
        } else if (err.request) {
            errorMessage = 'SERVER_CON_ERROR';
        } else {
            errorMessage = err.message;
        }

        return (
            <Modal size="mini" open={!!this.props.error} onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    Error
                </Modal.Header>
                <Modal.Content>
                    <p>{ERRORS[errorMessage] || errorMessage}</p>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = store => ({
    error: store.errors.error,
});

const dispatchStateToProps = dispatch => ({
    saveError: err => dispatch(saveError(err)),
    removeError: () => dispatch(removeError()),
});

export default connect(mapStateToProps, dispatchStateToProps)(ErrorModal);
