import React, { Component } from 'react';
import { Button, Form, Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { connect } from "react-redux";
import { changeLocation } from '../actions/locationActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        };
        this.onLinkClick = this.onLinkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate (username, pass) {
        return !!username && !!pass;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        if (!this.validate(this.state.username,this.state.pass)) return;
        console.log('ok');
    }

    onLinkClick(e) {
       this.props.changeLocation(e.target.dataset.location);
    }

    render() {
        return (
            <Container className="login_wrapper">
                <Container>
                    <Image className="login_logo"  size='large' centered src={logo}/>
                    <Form>
                        <Form.Field>
                            <input value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username'/>
                        </Form.Field>
                        <Form.Field>
                            <input value={this.state.pass} onChange={this.handleChange} name='pass' type='password' placeholder='Password' />
                        </Form.Field>
                        <p className="login_password_hint"><a>Forgot your Password?</a></p>
                        <Button onClick={this.handleSubmit} fluid={true} type='submit'>Login</Button>
                    </Form>
                    <p className="login_text">
                        Don`t have an account?
                        <a data-location="SIGN_UP" onClick={this.onLinkClick}> Create now</a>
                    </p>
                    <p className="login_text">
                        <a data-location="MAIN" onClick={this.onLinkClick}>Skip ></a>
                    </p>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLocation: (location) => {
      dispatch(changeLocation(location));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);