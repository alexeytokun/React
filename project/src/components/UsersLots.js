import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";
import {saveLotsAndCategories} from "../actions/lotsActions";
import {updateLots, filterLots} from "../functions";
import {saveError} from "../actions/errorsActions";
import FilterSelect from "./FilterSelect";

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
            error: null,
            filter: 1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }

    handlePageChange(page, pagination) {
        if (!pagination) return;
        this.setState({page, pagination});
    }

    handleFilterSelect(value) {
        this.setState({filter: value});
    }

    componentWillMount() {
        updateLots(this.props);
    }

    render() {
        if (!this.props.lots) return null;
        const id = +this.props.match.params.id;
        let usersLots = this.props.lots.filter(lot => lot.user_id === id);
        usersLots = filterLots(usersLots, this.state.filter);
        const paginatedLots = [...usersLots].slice(this.state.pagination.start, this.state.pagination.end);

        if (!usersLots.length) {
            return (
                <Container>
                    <div>
                        <h1>No lots here...</h1>
                    </div>
                </Container>
            );
        }

        return (
            <Container>
                <div className='relative'>
                    <h1 className='category_title'>Lots of {usersLots[0].username}</h1>
                    <Divider/>
                    <FilterSelect onSelect={this.handleFilterSelect} value={this.state.filter}/>
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