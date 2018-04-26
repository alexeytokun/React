import React, { Component } from 'react';
import { Button, Form, Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { Redirect, NavLink } from 'react-router-dom';


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            pass: '',
            passcheck: '',
            validation: {
                username: false,
                firstname: false,
                lastname: false,
                email: false,
                pass: false,
                passcheck: false
            }
        }

        // this.onLinkClick = this.onLinkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // onLinkClick(e) {
    //     this.setState({redirect: e.target.dataset.location});
    // }

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
            case 'firstname':
                validation.firstname = value.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
                break;
            case 'lastname':
                validation.lastname = value.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
                break;
            case 'email':
                validation.email = value.match(/^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/);
                break;
            case 'pass':
                validation.pass = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/);
                break;
            case 'passcheck':
                validation.passcheck = this.state.pass === this.state.passcheck;
                break;
            default:
                break;
        }

        this.setState({validation: validation});

    }

    handleSubmit() {
        const isFormValid = this.state.validation.username
            && this.state.validation.firstname
            && this.state.validation.lastname
            && this.state.validation.email
            && this.state.validation.pass
            && this.state.validation.passcheck;

        if (!isFormValid) return;

        const body = JSON.stringify({
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            pass: this.state.pass
        });

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
            <Container className="login_wrapper">
                <Container>
                    <Image className="login_logo"  size='large' centered src={logo}/>
                    <Form>
                        <Form.Field>
                            <Form.Input name='username' error={!this.state.validation.username} value={this.state.username} onChange={this.handleChange} placeholder='Username' autoComplete='off'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='firstname' error={!this.state.validation.firstname} value={this.state.firstname} onChange={this.handleChange} placeholder='First name' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='lastname' error={!this.state.validation.lastname} value={this.state.lastname} onChange={this.handleChange} placeholder='Last name' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='email' error={!this.state.validation.email} value={this.state.email} onChange={this.handleChange} placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='pass' error={!this.state.validation.pass} value={this.state.pass} onChange={this.handleChange} type='password' placeholder='Password' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='passcheck' error={!this.state.validation.passcheck} value={this.state.passcheck} onChange={this.handleChange} type='password' placeholder='Password' />
                        </Form.Field>
                        <Button onClick={this.handleSubmit} fluid={true} type='submit'>Sign Up</Button>
                    </Form>
                    <p className="login_text">
                        Already have account?
                        <NavLink to='/login'> Sign In</NavLink>
                    </p>
                    <p className="login_text">
                        <NavLink to='/'>Skip ></NavLink>
                    </p>
                </Container>
            </Container>
        )
    };
}

export default SignUp;