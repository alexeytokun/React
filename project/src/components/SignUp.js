import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { NavLink, Redirect } from 'react-router-dom';
import UserDataForm from "./UserDataForm";
import { SERVER_URL } from "../constants";
import ErrorModal from "./ErrorModal";
import axios from 'axios/index';


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    handleSubmit(isFormValid, data) {
        if (!isFormValid) return;

        const body = JSON.stringify(data);

        axios.post(SERVER_URL + 'user', body, {
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": sessionStorage.getItem('jwt')
            }
        })
            .then((res) => this.setState({redirect: true}))
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }

    onModalClose() {
        this.setState({error: null});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/login'/>;
        }

        return (
            <Container className="reg_wrapper">
                <ErrorModal error={this.state.error} onClose={this.onModalClose}/>
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

export default SignUp;