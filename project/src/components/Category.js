import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";

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
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page, pagination) {
        if (!pagination) return;
        this.setState({page, pagination});
    }

    render() {
        if (!this.props.sortedLots) return null;
        const id = this.props.match.params.id;
        let lots = this.props.sortedLots[id];
        const paginatedLots = [...lots].slice(this.state.pagination.start, this.state.pagination.end);

        return (
            <Container>
                <div>
                    <h1>{this.props.categories[id].category_name}</h1>
                    <LotGroup lots={paginatedLots}/>
                    {
                        lots.length > this.state.pageSize &&
                        <Paginator onPageChange={this.handlePageChange} pageSize={this.state.pageSize} page={this.state.page} items={lots.length}/>
                    }
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