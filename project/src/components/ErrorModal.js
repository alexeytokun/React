import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import {ERRORS} from "../constants";
import { connect } from 'react-redux';
import {saveError, removeError} from "../actions/errorsActions";

class ErrorModal extends Component {

    handleClose() {
        this.props.removeError();
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

const mapStateToProps = (store) => {
    return {
        error: store.errors.error,
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveError: err => dispatch(saveError(err)),
        removeError: () => dispatch(removeError())
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(ErrorModal);
