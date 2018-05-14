import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import temp from '../default_product.jpg';
import moment from 'moment';

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

    render() {
        const lot = this.props.lot;

        if(this.state.redirect) {
            return <Redirect push to={{
                pathname: '/lot/' + lot.lot_id,
                state: { lot: lot }
            }}/>;
        }

        const image = lot.image ? 'http://127.0.0.1:8000/' + lot.image : temp;
        const start_time = moment(lot.start_time).format('HH:mm:ss YYYY-MM-DD');
        const end_time = moment(lot.end_time).format('HH:mm:ss YYYY-MM-DD');

        return(
            <Card onClick={this.handleClick} centered>
                <Image src={image} />
                <Card.Content>
                    <Card.Header>
                        {lot.lot_name}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Start: {
                            start_time
                        }
                        </span>
                        <br/>
                        <span className='date'>
                            End: {
                            end_time
                        }
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Current price: {lot.price + '$'}
                    </Card.Description>
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