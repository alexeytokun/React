import React, { Component } from 'react';
import { Input, Button, Container, Divider } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { SERVER_URL } from "../constants";

class Bid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            last_bid: this.props.lot.price,
            bid: '',
            endpoint: SERVER_URL.slice(0, -1),
            socket: null,
            buyer: null
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
            socket.emit('room', this.props.lot.lot_id);
        });

        socket.on('bid', (data) => {
            this.setState({last_bid: data.bid, buyer: data.buyer});
        });

        this.setState({socket});
    };

    handleChange(e) {
        this.setState({bid: +e.target.value});
    }

    handleClick() {
        if (this.state.bid <= this.state.last_bid) return; //show notification
        const data = {
            bid: this.state.bid,
            lot_id: this.props.lot.lot_id,
            buyer: this.props.user.id
        };
        this.send(data);
    }

    render() {
        const isDisabled = !!this.props.disabled;
        const buyerInfo = this.state.buyer ? ` (by ${this.state.buyer})` : '';

        if (this.props.finished) {
            return (
                <Container className='bid_container'>
                    <Divider/>
                    <p style={{fontSize: 16, fontWeight: 'bold'}}>
                        {'Final Bid: ' + this.state.last_bid + '$' + buyerInfo}
                    </p>
                </Container>
            );
        }

        return (
            <Container className='bid_container'>
                <Divider/>
                <p style={{fontSize: 16, fontWeight: 'bold'}}>
                    {'Current Bid: ' + this.state.last_bid + '$' + buyerInfo}
                </p>
                <Input disabled={isDisabled} onChange={this.handleChange} min='0' type='number' action>
                    <input />
                    <Button disabled={isDisabled} onClick={this.handleClick}>Bid</Button>
                </Input>
            </Container>
        );
    }
}

export default Bid;