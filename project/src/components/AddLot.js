import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import LotForm from "./LotForm";
import {connect} from "react-redux";

class AddLot extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(isFormValid, data, file) {
        console.log(isFormValid, this.props.userData);
        if (!isFormValid || !this.props.userData) return;

        data.userid = this.props.userData.id;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('lotdata', JSON.stringify(data));

        fetch('http://127.0.0.1:8000/lot', {
            method: 'POST',
            headers: {
                "User-Auth-Token": sessionStorage.getItem('jwt')
            },
            body: formData
        })
            .then((res) => res.json())
            .then((res) => console.log(res.message))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Container className="reg_wrapper">
                <LotForm handleSubmit={this.handleSubmit}/>
            </Container>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata
    };
};

export default connect(mapStateToProps, null)(AddLot);