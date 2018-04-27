import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { Redirect, NavLink } from 'react-router-dom';
import UserDataForm from "./UserDataForm";


class SignUp extends Component {

    constructor(props) {
        super(props);

        // this.onLinkClick = this.onLinkClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // onLinkClick(e) {
    //     this.setState({redirect: e.target.dataset.location});
    // }

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

    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.redirect} />;
        // }

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