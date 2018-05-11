import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import temp from '../default_product.jpg';
import moment from 'moment';

class LotCard extends Component {

    render() {
        console.log(this.props.lot);
        const lot = this.props.lot;
        const image = lot.image ? 'http://127.0.0.1:8000/' + lot.image : temp;
        let start_time = moment(lot.start_time).format('HH:mm:ss YYYY-MM-DD');
        let end_time = moment(lot.end_time).format('HH:mm:ss YYYY-MM-DD');


        return(
            <Card href='#' centered>
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
                    username
                </Card.Content>
            </Card>
        );
    }
}

export default LotCard;