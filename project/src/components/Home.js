import React, { Component } from 'react';
import { Segment, Image, Container } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import {saveUserdata} from "../actions/userActions";
import LotGroup from "./LotGroup";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: "&",
            endpoint: "http://127.0.0.1:8000",
            socket: null,
            value: ""
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

    render() {
        console.log(this.state);

        return (
            <Container>
                <Segment>
                    <h2>Category</h2>
                    <LotGroup/>
                </Segment>
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
        userData: store.user.userdata,
        loggedIn: store.user.loggedIn
    };
};

const dispatchStateToProps = (dispatch) => {
    return { saveUserdata: userdata => dispatch(saveUserdata(userdata)) };
};

export default connect(mapStateToProps, dispatchStateToProps)(Home);