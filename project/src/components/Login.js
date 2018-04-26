import React, { Component } from 'react';
import { Button, Form, Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { Redirect, NavLink } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: '',
            pass: '',
            validation: {
                username: false,
                pass: false
            }
        };
        // this.onLinkClick = this.onLinkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let validation = {...this.state.validation};

        switch(fieldName) {
            case 'username':
                validation.username = value.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
                break;
            case 'pass':
                validation.pass = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/);
                break;
            default:
                break;
        }

        this.setState({validation: validation});

    }

    handleSubmit() {
        const isFormValid = this.state.validation.username
            && this.state.validation.pass;
        if (!isFormValid) return;
        const body = JSON.stringify({
            username: this.state.username,
            pass: this.state.pass
        });

        fetch('http://127.0.0.1:8000/signin', {
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

    // onLinkClick(e) {
    //     this.setState({redirect: e.target.dataset.location});
    // }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.redirect} />;
        // }

        return (
            <Container className="login_wrapper">
                <Container>
                    <Image className="login_logo"  size='large' centered src={logo}/>
                    <Form>
                        <Form.Field>
                            <Form.Input error={!this.state.validation.username} value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' autoComplete='off'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input error={!this.state.validation.pass} value={this.state.pass} onChange={this.handleChange} name='pass' type='password' placeholder='Password' />
                        </Form.Field>
                        <p className="login_password_hint"><a>Forgot your Password?</a></p>
                        <Button onClick={this.handleSubmit} fluid={true} type='button'>Login</Button>
                    </Form>
                    <p className="login_text">
                        Don`t have an account?
                        <NavLink to="/signup"> Create now</NavLink>
                    </p>
                    <p className="login_text">
                        <NavLink to="/">Skip ></NavLink>
                    </p>
                </Container>
            </Container>
        )
    }
}

export default Login;