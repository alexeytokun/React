import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import logo from "../logo-new.svg";
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import {saveLotsAndCategories} from "../actions/lotsActions";
import {saveUsernames} from "../actions/userActions";
import LotGroup from "./LotGroup";


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
        fetch('http://127.0.0.1:8000/lots',
            {
                headers: { "User-Auth-Token": sessionStorage.getItem('jwt')}
            })
            .then(res => res.json())
            .then(res => {
                let sortedLots = [];
                for (let i = 0; i < res.categories.length; i++) {
                    let filtered = res.lots.filter(lot => lot.category_id === res.categories[i].category_id);
                    sortedLots.push(filtered);
                }
                this.props.saveLotsAndCategories({lots: res.lots, categories: res.categories, sortedLots: sortedLots});
                this.props.saveUsernames(res.usernames);
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.props.sortedLots) return null;

        let groups = this.props.sortedLots.map((lotsCategory, i) => {
            if(lotsCategory.length) {
                return (
                    <Segment key={i}>
                        <h1><NavLink style={{color: 'black'}} to={'/category/' + i}>{this.props.categories[i].category_name}</NavLink></h1>
                        <LotGroup lots={this.props.sortedLots[i]} usernames={this.props.usernames}/>
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

const mapStateToProps = (store) => {
    return {
        lots: store.lots.lots,
        categories: store.lots.categories,
        sortedLots: store.lots.sortedLots,
        usernames: store.user.usernames
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveLotsAndCategories: userdata => dispatch(saveLotsAndCategories(userdata)),
        saveUsernames: names => dispatch(saveUsernames(names))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Home);