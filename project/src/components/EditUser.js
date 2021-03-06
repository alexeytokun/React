import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import defaultAvatar from '../default-avatar.png';
import UserDataForm from './UserDataForm';
import FileUpload from './FileUpload';
import { saveUserdata, saveUserAvatar } from '../actions/userActions';
import { SERVER_URL } from '../constants';
import { saveError } from '../actions/errorsActions';
import SuccessMessage from './SuccessMessage';
import '../css/EditUser.css';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    onSuccess() {
        this.setState({ success: true });
        if (this.timerId) clearTimeout(this.timerId);

        this.timerId = setTimeout(() => {
            this.setState({ success: false });
        }, 3000);
    }

    getAvatar() {
        if (!this.props.userData) return;
        axios.get(`${SERVER_URL}user/avatar/${this.props.userData.id}`, {
            headers: { 'User-Auth-Token': localStorage.getItem('jwt') },
        })
            .then(res => this.props.saveUserAvatar(res.data.source))
            .catch(err => this.props.saveError(err));
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid || !this.props.userData) return;
        const body = JSON.stringify(data);
        const url = `${SERVER_URL}user/${this.props.userData.id}`;

        axios.post(url, body, {
            headers: {
                'Content-type': 'application/json',
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(() =>
                axios.get(url)
                    .then(res => this.props.saveUserdata(res.data))
                    .then(() => this.onSuccess())
                    .catch(err => this.props.saveError(err)))
            .catch(err => this.props.saveError(err));
    }

    render() {
        const avatar = (this.props.userData && this.props.userData.avatar) ?
            this.props.userData.avatar : defaultAvatar;

        return (
            <Container className="form_wrapper">
                <Image className="reg_logo" circular size="small" centered src={avatar} />
                <FileUpload
                    saveError={this.props.saveError}
                    userData={this.props.userData}
                    getAvatar={this.getAvatar}
                />
                <UserDataForm
                    handleSubmit={this.handleSubmit}
                    userData={this.props.userData}
                    edit
                />
                <SuccessMessage visible={this.state.success} />
            </Container>
        );
    }
}

const mapStateToProps = store => ({
    userData: store.user.userdata,
    userAvatar: store.user.avatar,
});

const dispatchStateToProps = dispatch => ({
    saveUserAvatar: src => dispatch(saveUserAvatar(src)),
    saveUserdata: data => dispatch(saveUserdata(data)),
    saveError: err => dispatch(saveError(err)),
});

export default connect(mapStateToProps, dispatchStateToProps)(EditUser);
