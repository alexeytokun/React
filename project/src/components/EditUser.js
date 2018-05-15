import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import defaultAvatar from "../default-avatar.png";
import UserDataForm from "./UserDataForm";
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import {saveUserdata, saveUserAvatar} from "../actions/userActions";
import { SERVER_URL } from "../constants";
import ErrorModal from "./ErrorModal";
import axios from 'axios/index';

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid || !this.props.userData) return;
        const body = JSON.stringify(data);
        const url = SERVER_URL + 'user/' + this.props.userData.id;

        axios.post(url, body, {
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": sessionStorage.getItem('jwt')
            }
        })
            .then(() => {
                return axios.get(url)
                    .then((res) => {
                        this.props.saveUserdata(res.data);
                    })
                    .catch((err) => {
                        const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                        this.setState({error: errorMessage});
                    });
            })
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }

    getAvatar() {
        if (!this.props.userData) return;
        axios.get(SERVER_URL + 'user/avatar/' + this.props.userData.id,
            {
                headers: { "User-Auth-Token": sessionStorage.getItem('jwt')}
            })
            .then(res => {
                this.props.saveUserAvatar(res.data.source)
            })
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }

    onModalClose() {
        this.setState({error: null});
    }

    render() {
        const avatar = this.props.userData ?
            (this.props.userData.avatar ? this.props.userData.avatar : defaultAvatar) : defaultAvatar;

        return (
            <Container className="reg_wrapper">
                <ErrorModal error={this.state.error} onClose={this.onModalClose}/>
                <Image className="reg_logo" circular  size='small' centered src={ avatar }/>
                <FileUpload userData={this.props.userData} getAvatar={this.getAvatar}/>
                <UserDataForm handleSubmit={this.handleSubmit} userData={this.props.userData} edit={true}/>
            </Container>
        )
    };
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata,
        userAvatar: store.user.avatar
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveUserAvatar: src => dispatch(saveUserAvatar(src)),
        saveUserdata: data => dispatch(saveUserdata(data))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(EditUser);