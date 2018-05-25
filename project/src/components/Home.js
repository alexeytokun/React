import React, { Component } from 'react';
import { Container, Divider, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import {updateLots} from "../functions";
import {saveLotsAndCategories} from "../actions/lotsActions";
import {saveError} from "../actions/errorsActions";
import logo from "../logo-new.svg";
import '../css/Home.css';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        updateLots(this.props);
    }

    render() {
        if (!this.props.sortedLots) return null;

        let groups = this.props.sortedLots.map((lotsCategory, i) => {
            if(lotsCategory.length) {
                return (
                    <Container key={i} className='lot_group'>
                        <h1>
                            <NavLink className='category_title' to={'/category/' + i}>{this.props.categories[i].category_name}</NavLink>
                        </h1>
                        <Divider/>
                        <LotGroup lots={this.props.sortedLots[i]} homepage={true}/>
                        <Divider/>
                    </Container>
                );
            }
        });

        return (
            <Container>
                <Image centered size='large' src={logo}/>
                <div className='home_tagline_container'>
                    <h1 className='home_tagline_main'>THE MOST SIMPLE ONLINE AUCTION</h1>
                    <h2 className='home_tagline_secondary'>Find. Bid. Win. As easy as it should be.</h2>
                </div>
                {groups}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.lots.categories,
        sortedLots: state.lots.sortedLots
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveLotsAndCategories: userdata => dispatch(saveLotsAndCategories(userdata)),
        saveError: (err) => dispatch(saveError(err))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Home);