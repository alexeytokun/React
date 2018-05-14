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
                <div>
                    <h1>{this.props.categories[id].category_name}</h1>
                    <LotGroup category={true} lots={this.props.sortedLots[id]}/>
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