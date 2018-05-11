import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import temp from "../default_product.jpg";

class LotCard extends Component {

    render() {
        console.log(this.props.lot);
        let lot = this.props.lot;
        let image = lot.image ? 'http://127.0.0.1:8000/' + lot.image : temp;

        return(
            <Card href='#' centered>
                <Image src={image} />
                <Card.Content>
                    <Card.Header>
                        {lot.lot_name}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {lot.start_time}
                        </span>
                        <br/>
                        <span className='date'>
                            {lot.end_time}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {lot.price + '$'}
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