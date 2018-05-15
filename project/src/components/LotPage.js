import React, { Component } from 'react';
import { Container, Image, Grid } from 'semantic-ui-react';
import temp from '../default_product.jpg';
import Countdown from "./Countdown";

class LotPage extends Component {

    countLotTime(start, end) {
        const isStarted = Date.now() >= new Date(start);
        const isEnded = new Date(end) < Date.now();

        if (isStarted && !isEnded) return <Countdown date={end}/>;

        if (isEnded) return <p style={{fontSize: 20, color: 'red'}}>Finished</p>;

        return (
            <div>
                <span style={{fontSize: 20, color: 'black'}}>Auction starts in:</span>
                <Countdown date={start}/>
            </div>
        );
    }

    render() {
        const lot = this.props.location.state && this.props.location.state.lot;
        if (!lot) {
            return null;
        }

        const countdown = this.countLotTime(lot.start_time, lot.end_time);

        return(
            <Container className='lot_container'>
                <Grid>
                    <Grid.Column width={6}>
                        <Image size='large' src={lot.image || temp}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h2>{lot.lot_name}</h2>
                        <p>{lot.description}</p>
                        {countdown}
                        <p style={{fontWeight: 'bold'}}>Current Bid: {lot.price + '$'}</p>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default LotPage;