import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import defaultAvatar from "../default-avatar.png";
import UserDataForm from "./UserDataForm";
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import {saveUserdata} from "../actions/userActions";
import {saveUserAvatar} from "../actions/userActions";
import { SERVER_URL } from "../constants";

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid || !this.props.userData) return;
        const body = JSON.stringify(data);
        const url = SERVER_URL + 'user/' + this.props.userData.id;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": sessionStorage.getItem('jwt')
            },
            body: body
            })
            .then((res) => {
                if (!res.ok) throw Error(res.statusText);
                return res;
            })
            .then((res) => {
                return fetch(url)
                    .then((res) => {
                        if (!res.ok) throw Error(res.statusText);
                        return res;
                    })
                    .then((res) => res.json())
                    .then((res) => {
                        this.props.saveUserdata(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    getAvatar() {
        if (!this.props.userData) return;
        fetch(SERVER_URL + 'user/avatar/' + this.props.userData.id,
            {
                headers: { "User-Auth-Token": sessionStorage.getItem('jwt')}
            })
            .then((res) => {
                if (!res.ok) throw Error(res.statusText);
                return res;
            })
            .then(res => res.json())
            .then(res => {
                this.props.saveUserAvatar(res.source)
            })
            .catch(err => console.log(err));
    }

    render() {
        const avatar = this.props.userData ?
            (this.props.userData.avatar ? this.props.userData.avatar : defaultAvatar) : defaultAvatar;

        return (
            <Container className="reg_wrapper">
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