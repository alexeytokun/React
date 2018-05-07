import React, { Component } from 'react';
import { Segment, Image, Container, Card, Icon } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";
import temp from "../default-avatar.png";
import socketIOClient from 'socket.io-client';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: "Bad News",
            endpoint: "http://127.0.0.1:8000",
            socket: null,
            value: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    send = () => {
        this.state.socket.emit('send', this.state.value);
    };

    onChange(e) {
        this.setState({value: e.target.value})
    }

    componentDidMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on('news', (data) => {
            this.setState({response: data});
        });

        this.setState({socket});
    };

    render() {
        console.log(this.state);

        return (
            <Container>
                <Segment>
                    <Card>
                        <Image src={temp} />
                        <Card.Content>
                            <Card.Header>
                                Lot name
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                    Lot time
                                </span>
                            </Card.Meta>
                            <Card.Description>
                               Lot description text
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                username
                            </a>
                        </Card.Content>
                    </Card>
                </Segment>
                <p>{this.state.response}</p>
                <input id='input' value={this.state.value} onChange={this.onChange}/>
                <button onClick={this.send}>Click</button>
            </Container>
        )
    }
}

export default Home;