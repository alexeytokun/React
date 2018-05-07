import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import defaultAvatar from "../default-avatar.png";
import UserDataForm from "./UserDataForm";
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import {saveUserdata} from "../actions/userActions";
import {saveUserAvatar} from "../actions/userActions";

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid || !this.props.userData) return;
        const body = JSON.stringify(data);
        const url = 'http://127.0.0.1:8000/user/' + this.props.userData.id;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": sessionStorage.getItem('jwt')
            },
            body: body
            })
            .then((res) => {
                return fetch(url)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.avatar) res.avatar = 'http://127.0.0.1:8000/' + res.avatar;
                        this.props.saveUserdata(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    getAvatar() {
        if (!this.props.userData) return;
        fetch('http://127.0.0.1:8000/user/avatar/' + this.props.userData.id,
            {
                headers: { "User-Auth-Token": sessionStorage.getItem('jwt')}
            })
            .then(res => res.json())
            .then(res => {
                this.props.saveUserAvatar('http://127.0.0.1:8000/' + res.source)
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