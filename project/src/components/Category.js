import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";


class Category extends Component {

    render() {
        if (!this.props.sortedLots) return null;
        const id = this.props.match.params.id;

        return (
            <Container>
                <Segment>
                    <h1>{this.props.categories[id].category_name}</h1>
                    <LotGroup usernames={this.props.usernames} category={true} lots={this.props.sortedLots[id]}/>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        categories: store.lots.categories,
        sortedLots: store.lots.sortedLots,
        usernames: store.user.usernames
    };
};

export default connect(mapStateToProps, null)(Category);