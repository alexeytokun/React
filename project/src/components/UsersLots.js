import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";
import {saveLotsAndCategories} from "../actions/lotsActions";
import {updateLots} from "../functions";
import {saveError} from "../actions/errorsActions";

const pageSize = 6;

class UsersLots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize,
            pagination: {
                start: 0,
                end: pageSize
            },
            error: null
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page, pagination) {
        if (!pagination) return;
        console.log(pagination);
        this.setState({page, pagination});
    }

    componentWillMount() {
        updateLots(this.props);
    }

    render() {
        if (!this.props.lots || !this.props.userData) return null;
        const usersLots = this.props.lots.filter(lot => lot.user_id === this.props.userData.id);
        const paginatedLots = [...usersLots].slice(this.state.pagination.start, this.state.pagination.end);

        if (!usersLots.length) {
            return (
                <Container>
                    <div>
                        <h1>You don`t have any lots</h1>
                    </div>
                </Container>
            );
        }

        return (
            <Container>
                <div>
                    <h1>Your lots</h1>
                    <Divider/>
                    <LotGroup category={true} lots={paginatedLots}/>
                    {
                        usersLots.length > this.state.pageSize &&
                        <Paginator onPageChange={this.handlePageChange} pageSize={this.state.pageSize} page={this.state.page} items={usersLots.length}/>
                    }
                    <Divider/>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata,
        categories: store.lots.categories,
        lots: store.lots.lots
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveLotsAndCategories: userdata => dispatch(saveLotsAndCategories(userdata)),
        saveError: (err) => dispatch(saveError(err))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(UsersLots);