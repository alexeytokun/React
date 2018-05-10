import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import temp from "../default-avatar.png";

class LotCard extends Component {

    render() {
        return(
            <Card href='#' centered>
                <Image src={'http://127.0.0.1:8000/public/lot_images/file-1525955487861.jpg'} />
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
                    <Icon name='user' />
                    username
                </Card.Content>
            </Card>
        );
    }
}

export default LotCard;