import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";
import {filterLots} from "../functions";
import {saveError} from "../actions/errorsActions";
import FilterSelect from "./FilterSelect";
import axios from "axios/index";
import {SERVER_URL} from "../constants";

const pageSize = 6;

class WonLots extends Component {

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
            filter: 1,
            wonLots: null
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
        if (!this.props.userData) return;
        axios.get(SERVER_URL + 'lot/won/' + this.props.userData.id,
            {
                headers: {
                    "User-Auth-Token": localStorage.getItem('jwt')
                }
            })
            .then(res => {
                let lots = res.data.lots;
                let wonLots = [];
                for (let i=0; i<lots.length; i++) {
                    let lot = this.props.lots.find(
                        (lot) => lot.lot_id === lots[i]
                    );
                    wonLots.push(lot);
                }
                this.setState({wonLots: wonLots});
            })
            .catch((err) => {
                this.props.saveError(err);
            });
    }

    render() {
        if (!this.props.lots || !this.props.userData || !this.state.wonLots) return null;
        let wonLots = this.state.wonLots;
        wonLots = filterLots(wonLots, this.state.filter);
        const paginatedLots = [...wonLots].slice(this.state.pagination.start, this.state.pagination.end);

        if (!wonLots.length) {
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
                    <h1 className='category_title'>Won lots</h1>
                    <Divider/>
                    <FilterSelect onSelect={this.handleFilterSelect} value={this.state.filter} simple/>
                    <LotGroup category={true} lots={paginatedLots}/>
                    {
                        wonLots.length > this.state.pageSize &&
                        <Paginator onPageChange={this.handlePageChange} pageSize={this.state.pageSize} page={this.state.page} items={wonLots.length}/>
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
        lots: store.lots.lots
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveError: (err) => dispatch(saveError(err))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(WonLots);