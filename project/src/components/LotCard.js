import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import temp from '../default_product.jpg';

class LotCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({redirect: true});
    }

    countLotTime(start, end) {
        const isStarted = Date.now() >= new Date(start);
        const isEnded = new Date(end) < Date.now();

        if (isStarted && !isEnded) return {text: 'Active', color: 'green'};
        if (isEnded) return {text: 'Finished', color: 'red'};

        const diff =  new Date(start) - Date.now();
        const days = Math.ceil(diff / 86400000);
        if (days > 1) return {text: 'Starts in ' + days + ' days', color: 'black'};

        const hours = Math.ceil(diff / 3600000);
        const text = 'Starts in ' + hours + ((hours === 1) ? ' hour' : ' hours');
        return {text: text, color: 'black'};
    }

    render() {
        const lot = this.props.lot;

        if(this.state.redirect) {
            return <Redirect push to={{
                pathname: '/lot/' + lot.lot_id
            }}/>;
        }

        const image = lot.images.length ? lot.images[0].path : temp;
        const status = this.countLotTime(lot.start_time, lot.end_time);


        return(
            <Card onClick={this.handleClick} centered className='lot_card'>
                <Image src={image} />
                <Card.Content>
                    <Card.Header>
                        {lot.lot_name}
                    </Card.Header>
                    <Card.Description>
                        Current Bid: {lot.price + '$'}
                    </Card.Description>
                    <Card.Meta>
                        <span style={{color: status.color}}>{status.text}</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />
                    {lot.username}
                </Card.Content>
            </Card>
        );
    }
}

export default LotCard;