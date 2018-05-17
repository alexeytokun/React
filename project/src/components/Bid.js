import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { SERVER_URL } from "../constants";

class Bid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: this.props.lot.price,
            bid: '',
            endpoint: SERVER_URL.slice(0, -1),
            socket: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    send = (data) => {
        this.state.socket.emit('bid', data);
    };

    componentWillMount() {
        if (this.props.lot) {
            this.initSocket();
        }
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

    initSocket = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('room', this.props.lot.lot_id);
        });

        socket.on('bid', (data) => {
            this.setState({current: data.bid});
        });

        this.setState({socket});
    };

    handleChange(e) {
        this.setState({bid: +e.target.value});
    }

    handleClick() {
        // if (this.state.bid <= this.state.current) return;
        const data = {
            bid: this.state.bid,
            lot_id: this.props.lot.lot_id,
            buyer: this.props.user.id
        };
        this.send(data);
    }

    render() {
        return (
            <div>
                <p style={{fontSize: 16, fontWeight: 'bold'}}>{'Current Bid: ' + this.state.current + '$'}</p>
                <Input onChange={this.handleChange} min='0' type='number' action>
                    <input />
                    <Button onClick={this.handleClick}>Bid</Button>
                </Input>
            </div>
        );
    }
}

export default Bid;