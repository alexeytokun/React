import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import Paginator from "./Paginator";

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
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page, pagination) {
        if (!pagination) return;
        console.log(pagination);
        this.setState({page, pagination});
    }

    render() {
        if (!this.props.lots || !this.props.userData) return null;
        const usersLots = this.props.lots.filter(lot => lot.user_id === this.props.userData.id);
        const paginatedLots = [...usersLots].slice(this.state.pagination.start, this.state.pagination.end);

        if (!usersLots.length) {
            return (
                <Container>
                    <div>
                        <h1>You don`t have lots</h1>
                    </div>
                </Container>
            );
        }

        return (
            <Container>
                <div>
                    <h1>Your lots</h1>
                    <LotGroup category={true} lots={paginatedLots}/>
                    {
                        usersLots.length > this.state.pageSize &&
                        <Paginator onPageChange={this.handlePageChange} pageSize={this.state.pageSize} page={this.state.page} items={usersLots.length}/>
                    }
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

export default connect(mapStateToProps, null)(UsersLots);