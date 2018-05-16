import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import logo from "../logo-new.svg";
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import LotGroup from "./LotGroup";
import {updateLots} from "../functions";
import {saveLotsAndCategories} from "../actions/lotsActions";
import ErrorModal from "./ErrorModal";
import {saveError} from "../actions/errorsActions";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // response: "&",
            // endpoint: "http://127.0.0.1:8000",
            // socket: null,
            // value: "",
        };

        // this.onChange = this.onChange.bind(this);
    }

    // send = () => {
    //     this.state.socket.emit('send', this.state.value);
    // };

    // onChange(e) {
    //     this.setState({value: e.target.value})
    // }

    // componentWillMount() {
    //     this.initSocket();
    // }
    //
    // componentWillUnmount() {
    //     this.state.socket.close();
    // }
    //
    // initSocket = () => {
    //     const socket = socketIOClient(this.state.endpoint);
    //     socket.on('connect', () => {
    //         console.log('Connected');
    //     });
    //
    //     socket.on('news', (data) => {
    //         this.setState({response: data});
    //     });
    //
    //     this.setState({socket});
    // };

    componentWillMount() {
        updateLots(this.props);
    }

    render() {
        if (!this.props.sortedLots) return null;

        let groups = this.props.sortedLots.map((lotsCategory, i) => {
            if(lotsCategory.length) {
                return (
                    <Segment  color={'black'} key={i} className='lot_group'>
                        <h1><NavLink className='category_title' to={'/category/' + i}>{this.props.categories[i].category_name}</NavLink></h1>
                        <LotGroup lots={this.props.sortedLots[i]} homepage={true}/>
                    </Segment>
                );
            }
        });

        return (
            <Container>
                {groups}
                {/*<p>{window.location.href}</p>*/}
                {/*<p>{this.state.response}</p>*/}
                {/*<input id='input' value={this.state.value} onChange={this.onChange}/>*/}
                {/*<button onClick={this.send}>Click</button>*/}
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