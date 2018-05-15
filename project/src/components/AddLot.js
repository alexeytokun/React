import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import LotForm from "./LotForm";
import {connect} from "react-redux";
import { SERVER_URL } from "../constants";
import ErrorModal from "./ErrorModal";
import axios from 'axios/index';

class AddLot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    handleSubmit(isFormValid, data, file) {
        console.log(isFormValid, this.props.userData);
        if (!isFormValid || !this.props.userData) return;

        data.userid = this.props.userData.id;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('lotdata', JSON.stringify(data));

        axios.post(SERVER_URL + 'lot', formData, {
            headers: {
                "User-Auth-Token": sessionStorage.getItem('jwt')
            }
        })
            .then((res) => console.log(res.data.message))
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }

    onModalClose() {
        this.setState({error: null});
    }

    render() {
        return (
            <Container className="reg_wrapper">
                <ErrorModal error={this.state.error} onClose={this.onModalClose}/>
                <LotForm handleSubmit={this.handleSubmit}/>
            </Container>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata
    };
};

export default connect(mapStateToProps, null)(AddLot);