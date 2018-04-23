import React, { Component } from 'react';
import { Button, Form, Container, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import { changeLocation } from '../actions/locationActions';
import {connect} from "react-redux";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.onLinkClick = this.onLinkClick.bind(this);
    }

    onLinkClick(e) {
        this.props.changeLocation(e.target.dataset.location);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Container className="login_wrapper">
                <Container>
                    <Image className="login_logo"  size='large' centered src={logo}/>
                    <Form>
                        <Form.Field>
                            <input name='username' placeholder='Username' />
                        </Form.Field>
                        <Form.Field>
                            <input name='first_name' placeholder='First name' />
                        </Form.Field>
                        <Form.Field>
                            <input name='last_name' placeholder='Last name' />
                        </Form.Field>
                        <Form.Field>
                            <input name='pass' type='password' placeholder='Password' />
                        </Form.Field>
                        <Form.Field>
                            <input name='pass_check' type='password' placeholder='Password' />
                        </Form.Field>
                        <Button fluid={true} type='submit'>Sign Up</Button>
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