import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { NavLink, Redirect } from 'react-router-dom';
import UserDataForm from "./UserDataForm";


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

        fetch('http://127.0.0.1:8000/user', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "User-Auth-Token": sessionStorage.getItem('jwt')
            },
            body: body
        })
            .then((res) => res.json())
            .then((res) => this.setState({redirect: true}))
            .catch((err) => console.log(err));
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

export default SignUp;