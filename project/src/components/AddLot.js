import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import LotForm from "./LotForm";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import { SERVER_URL } from "../constants";
import axios from 'axios/index';
import {saveError} from "../actions/errorsActions";

class AddLot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(isFormValid, data, files) {
        console.log(isFormValid, this.props.userData);
        if (!isFormValid || !this.props.userData) return;

        data.userid = this.props.userData.id;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        formData.append('lotdata', JSON.stringify(data));

        axios.post(SERVER_URL + 'lot', formData, {
            headers: {
                "User-Auth-Token": localStorage.getItem('jwt')
            }
        })
            .then((res) => this.setState({redirect: true}))
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.props.saveError(errorMessage);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/lots/user' />;
        }

        return (
            <Container className="reg_wrapper">
                <LotForm saveError={this.props.saveError} handleSubmit={this.handleSubmit}/>
            </Container>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveError: (err) => dispatch(saveError(err))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(AddLot);