import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { NavLink, Redirect } from 'react-router-dom';
import UserDataForm from "./UserDataForm";
import { SERVER_URL } from "../constants";
import axios from 'axios/index';
import {connect} from "react-redux";
import {saveError} from "../actions/errorsActions";


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid) return;

        const body = JSON.stringify(data);

        axios.post(SERVER_URL + 'user', body, {
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": localStorage.getItem('jwt')
            }
        })
            .then((res) => this.setState({redirect: true}))
            .catch((err) => this.props.saveError(err));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/login'/>;
        }

        return (
            <Container className="reg_wrapper">
                <Image className="reg_logo"  size='large' centered src={logo}/>
                <UserDataForm handleSubmit={this.handleSubmit}/>
                <p className="reg_text">
                    Already have account?
                    <NavLink to='/login'> Sign In</NavLink>
                </p>
                <p className="reg_text">
                    <NavLink to='/'>Skip ></NavLink>
                </p>
            </Container>
        )
    };
}

const dispatchStateToProps = (dispatch) => {
    return {
        saveError: (err) => dispatch(saveError(err))
    };
};

export default connect(null, dispatchStateToProps)(SignUp);