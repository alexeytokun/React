import React, { Component } from 'react';
import { Container, Image, Grid } from 'semantic-ui-react';
import temp from '../default_product.jpg';

class LotPage extends Component {

    render() {
        const lot = this.props.location.state && this.props.location.state.lot;
        if (!lot) {
            return null;
        }

        return(
            <Container className='lot_container'>
                <Grid>
                    <Grid.Column width={6}>
                        <Image size='large' src={lot.image || temp}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h2>{lot.lot_name}</h2>
                        <p>{lot.description}</p>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default LotPage;