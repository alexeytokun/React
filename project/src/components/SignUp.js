import React, { Component } from 'react';
import { Button, Form, Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { changeLocation } from '../actions/locationActions';
import {connect} from "react-redux";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            pass: '',
            passcheck: ''
        }

        this.onLinkClick = this.onLinkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onLinkClick(e) {
        this.props.changeLocation(e.target.dataset.location);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validate (userName, firstName, lastName, pass, passCheck) {
        return true;
    }

    handleSubmit() {
        if (!this.validate(this.state.username,
            this.state.firstname,
            this.state.lastname,
            this.state.pass,
            this.state.passcheck
        )) return;
        console.log('ok');
    }

    render() {
        return (
            <Container className="login_wrapper">
                <Container>
                    <Image className="login_logo"  size='large' centered src={logo}/>
                    <Form>
                        <Form.Field>
                            <input name='username' value={this.state.username} onChange={this.handleChange} placeholder='Username' />
                        </Form.Field>
                        <Form.Field>
                            <input name='firstname' value={this.state.firstname} onChange={this.handleChange} placeholder='First name' />
                        </Form.Field>
                        <Form.Field>
                            <input name='lastname' value={this.state.lastname} onChange={this.handleChange} placeholder='Last name' />
                        </Form.Field>
                        <Form.Field>
                            <input name='pass' value={this.state.pass} onChange={this.handleChange} type='password' placeholder='Password' />
                        </Form.Field>
                        <Form.Field>
                            <input name='passcheck' value={this.state.passcheck} onChange={this.handleChange} type='password' placeholder='Password' />
                        </Form.Field>
                        <Button onClick={this.handleSubmit} fluid={true} type='submit'>Sign Up</Button>
                    </Form>
                    <p className="login_text">
                        Already have account?
                        <a data-location='LOGIN' onClick={this.onLinkClick}> Sign In</a>
                    </p>
                    <p className="login_text">
                        <a data-location='MAIN' onClick={this.onLinkClick}>Skip ></a>
                    </p>
                </Container>
            </Container>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation: (location) => {
            dispatch(changeLocation(location));
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUp);