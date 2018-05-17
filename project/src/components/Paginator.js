import React, { Component } from 'react';
import { Pagination } from 'semantic-ui-react';

class Paginator extends Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(e, data) {
        const sliceArea = this.paginateItems(this.props.items, data.activePage);
        this.props.onPageChange(data.activePage, sliceArea);
    }

    paginateItems(items, page) {
        const totalPages = Math.ceil(items / this.props.pageSize);
        const pageSize = this.props.pageSize || 6;
        if (page < 1 || page > totalPages) return null;
        const start = (page - 1) * pageSize;
        const end = Math.min(start + pageSize - 1, items - 1) + 1;
        return {start, end};
    }

    render() {
        const totalPages = Math.ceil(this.props.items / this.props.pageSize);
        return (
            <Pagination onPageChange={this.handlePageChange} className='lots_paginator' activePage={this.props.page} totalPages={totalPages}/>
        );
    }
}

export default Paginator;