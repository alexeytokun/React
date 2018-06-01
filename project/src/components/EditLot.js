import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LotForm from './LotForm';
import { SERVER_URL } from '../constants';
import { saveError } from '../actions/errorsActions';

class EditLot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            lot: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const id = +this.props.match.params.id;
        axios.get(`${SERVER_URL}lot/${id}`, {
            headers: {
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(res => this.setState({ lot: res.data.lot }))
            .catch(err => this.props.saveError(err));
    }

    handleSubmit(isFormValid, lotData, files) {
        if (!isFormValid || !this.props.userData) return;

        const data = lotData;
        data.userid = this.props.userData.id;
        const formData = new FormData();
        if (files) {
            for (let i = 0; i < files.length; i += 1) {
                formData.append('file', files[i]);
            }
        }
        formData.append('lotdata', JSON.stringify(data));

        axios.post(`${SERVER_URL}lot/${this.state.lot.lot_id}`, formData, {
            headers: {
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(() => this.setState({ redirect: true }))
            .catch((err) => {
                this.props.saveError(err);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/lot/${this.state.lot.lot_id}`} />;
        }

        if (!this.state.lot) return null;

        return (
            <Container className="form_wrapper">
                <LotForm
                    categories={this.props.categories}
                    saveError={this.props.saveError}
                    handleSubmit={this.handleSubmit}
                    lot={this.state.lot}
                />
            </Container>
        );
    }
}

const mapStateToProps = store => ({
    userData: store.user.userdata,
    lots: store.lots.lots,
    categories: store.lots.categories,
});

const dispatchStateToProps = dispatch => ({
    saveError: err => dispatch(saveError(err)),
});

export default connect(mapStateToProps, dispatchStateToProps)(EditLot);
