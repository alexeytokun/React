import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";


class UsersLots extends Component {

    render() {
        if (!this.props.lots || !this.props.userData) return null;
        const usersLots = this.props.lots.filter(lot => lot.user_id === this.props.userData.id);

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
                    <LotGroup category={true} lots={usersLots}/>
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