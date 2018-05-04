import React, { Component } from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
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
        console.log('http://127.0.0.1:8000/user/' + this.props.userData.id);

        fetch('http://127.0.0.1:8000/user/' + this.props.userData.id, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: body
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    getAvatar() {
        if (!this.props.userData) return;
        fetch('http://127.0.0.1:8000/user/avatar/' + this.props.userData.id)
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
                <UserDataForm handleSubmit={this.handleSubmit} userData={this.props.userData}/>
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
        saveUserAvatar: src => dispatch(saveUserAvatar(src))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(EditUser);