import React, { Component } from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import avatar from "../default-avatar.png";
import { NavLink } from 'react-router-dom';
import UserDataForm from "./UserDataForm";
import { connect } from 'react-redux';
import FileUpload from './FileUpload';

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
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

    // componentDidMount() {
    //     fetch('http://127.0.0.1:8000/user/1', {
    //         method: 'GET'
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({userData: res})
    //         })
    //         .catch((err) => console.log(err));
    // }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.redirect} />;
        // }

        return (
            <Container className="reg_wrapper">
                <Image className="reg_logo"  size='small' centered src={avatar}/>
                <FileUpload/>
                <UserDataForm handleSubmit={this.handleSubmit} userData={this.props.userData}/>
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

const mapStateToProps = (store) => {
    return { userData: store.user.userdata };
}

export default connect(mapStateToProps, null)(EditUser);