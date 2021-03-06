import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LotForm from './LotForm';
import { SERVER_URL } from '../constants';
import { saveError } from '../actions/errorsActions';

class AddLot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(isFormValid, lotData, files) {
        const data = lotData;
        if (!isFormValid || !this.props.userData) return;

        data.userid = this.props.userData.id;
        const formData = new FormData();
        if (files && files.length) {
            for (let i = 0; i < files.length; i += 1) {
                formData.append('file', files[i]);
            }
        }
        formData.append('lotdata', JSON.stringify(data));

        axios.post(`${SERVER_URL}lot`, formData, {
            headers: {
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(() => this.setState({ redirect: true }))
            .catch(err => this.props.saveError(err));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/lots/user/${this.props.userData.id}`} />;
        }

        return (
            <Container className="form_wrapper">
                <LotForm
                    categories={this.props.categories}
                    saveError={this.props.saveError}
                    handleSubmit={this.handleSubmit}
                />
            </Container>
        );
    }
}

const mapStateToProps = store => ({
    userData: store.user.userdata,
    categories: store.lots.categories,
});

const dispatchStateToProps = dispatch => ({
    saveError: err => dispatch(saveError(err)),
});

export default connect(mapStateToProps, dispatchStateToProps)(AddLot);
