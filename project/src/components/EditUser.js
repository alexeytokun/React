import React, { Component } from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import avatar from "../default-avatar.png";
import { NavLink } from 'react-router-dom';
import UserDataForm from "./UserDataForm";
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import axios from 'axios';
import {saveUserdata} from "../actions/userActions";
import {saveUserAvatar} from "../actions/userActions";

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid) return;

        const body = JSON.stringify(data);

        fetch('http://127.0.0.1:8000/user', {
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
        axios
            .get(
                'http://127.0.0.1:8000/user/avatar/1',
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                console.log(response);
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.props.saveUserAvatar("data:;base64," + base64);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAvatar();
    }


    render() {
        console.log(this.props.userAvatar);

        return (
            <Container className="reg_wrapper">
                <Image className="reg_logo"  size='small' centered src={ this.props.userAvatar || avatar }/>
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
}

const dispatchStateToProps = (dispatch) => {
    return {
        saveUserAvatar: img => dispatch(saveUserAvatar(img))
    };
}

export default connect(mapStateToProps, dispatchStateToProps)(EditUser);