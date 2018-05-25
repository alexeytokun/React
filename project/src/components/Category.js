import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";
import FilterSelect from "./FilterSelect";
import {filterLots} from "../functions";

const pageSize = 6;

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize,
            pagination: {
                start: 0,
                end: pageSize
            },
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

    render() {
        if (!this.props.sortedLots) return null;
        const id = this.props.match.params.id;

        if (!this.props.sortedLots[id].length) {
            return (
                <Container>
                    <div>
                        <h1>No lots here...</h1>
                    </div>
                </Container>
            );
        }

        let lots = this.props.sortedLots[id];
        lots = filterLots(lots, this.state.filter);
        const paginatedLots = [...lots].slice(this.state.pagination.start, this.state.pagination.end);

        return (
            <Container>
                <div className='relative'>
                    <h1 className='category_title'>{this.props.categories[id].category_name}</h1>
                    <Divider/>
                    <FilterSelect onSelect={this.handleFilterSelect} value={this.state.filter}/>
                    <LotGroup lots={paginatedLots}/>
                    {
                        lots.length > this.state.pageSize &&
                            <Paginator onPageChange={this.handlePageChange} pageSize={this.state.pageSize} page={this.state.page} items={lots.length}/>
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
        sortedLots: store.lots.sortedLots
    };
};

export default connect(mapStateToProps, null)(Category);