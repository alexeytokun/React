import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';


class UserDataForm extends Component {

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
                username: true,
                firstname: true,
                lastname: true,
                email: true,
                pass: true,
                passcheck: true
            },
            isFormVaild: false
        }

        // this.onLinkClick = this.onLinkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateAllFields() {
        let validation = {...this.state.validation};
        validation.username = this.state.username.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
        validation.firstname = this.state.firstname.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
        validation.lastname = this.state.lastname.match(/^[а-яА-ЯёЁa-zA-Z-]{1,30}$/);
        validation.email = this.state.email.match(/^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/);
        validation.pass = this.state.pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/);
        validation.passcheck = (this.state.pass === this.state.passcheck)
            && this.state.passcheck.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/);
        const isFormValid = !!(validation.username
            && validation.firstname
            && validation.lastname
            && validation.email
            && validation.pass
            && validation.passcheck);

        this.setState({validation: validation, isFormVaild: isFormValid});
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
                validation.passcheck = (this.state.pass === this.state.passcheck)
                    && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/);
                break;
            default:
                break;
        }

        const isFormValid = !!(validation.username
            && validation.firstname
            && validation.lastname
            && validation.email
            && validation.pass
            && validation.passcheck);

        this.setState({validation: validation, isFormVaild: isFormValid});
    }

    handleSubmit() {
        this.validateAllFields();
        const user = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            pass: this.state.pass,
            passcheck: this.state.passcheck
        }
        this.props.handleSubmit(this.state.isFormVaild, user);
    }

    componentWillMount() {
        if (this.props.userData) {
            let userData = this.props.userData;
            this.setState({
                username: userData.username || '',
                firstname: userData.firstname  || '',
                lastname: userData.lastname  || '',
                email: userData.email || ''
            });

        }
    }

    render() {
        return (
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
        );
    }

}

export default UserDataForm;