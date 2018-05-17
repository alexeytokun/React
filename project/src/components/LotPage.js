import React, { Component } from 'react';
import { Container, Image, Grid, Button, Divider } from 'semantic-ui-react';
import defaultImage from '../default_product.jpg';
import Countdown from "./Countdown";
import Bid from './Bid';
import {connect} from "react-redux";
import {saveError} from "../actions/errorsActions";
import { NavLink } from 'react-router-dom';

class LotPage extends Component {

    countLotStage(start, end) {
        const isStarted = Date.now() >= new Date(start);
        const isEnded = new Date(end) < Date.now();
        if (isStarted && !isEnded) return 'active';
        if (isEnded) return 'finished';
        return 'pending';
    }

    countLotTime(lot ,stage) {
        switch (stage) {
            case 'active':
                return (
                    <div>
                        <Divider/>
                        <span style={{fontSize: 20, color: 'black'}}>Auction starts in:</span>
                        <Countdown date={lot.end_time}/>
                    </div>
                );
            case 'finished':
                return <p style={{fontSize: 20, color: 'red'}}>Finished</p>;
            case 'pending':
                return (
                    <div>
                        <Divider/>
                        <span style={{fontSize: 20, color: 'black'}}>Auction starts in:</span>
                        <Countdown date={lot.start_time}/>
                    </div>
                );
            default: return null;
        }
    }

    switchBidData(user, lot, isLotOwner, stage) {
        if (stage === 'active') {
            if (!user.id || isLotOwner) return <Bid lot={lot} user={user} disabled/>;
            if (!isLotOwner) return <Bid lot={lot} user={user}/>;
        }
        return null;
    }

    render() {
        const id = +this.props.match.params.id;
        const lot = this.props.lots.find(lot => lot.lot_id === id);
        if (!lot) return null;

        const stage = this.countLotStage(lot.start_time, lot.end_time);
        const countdown = this.countLotTime(lot, stage);
        const user = this.props.userData || {};
        const isLotOwner = user.id === lot.user_id;
        const isEdditable = stage === 'pending';
        const bidData = this.switchBidData(user, lot, isLotOwner, stage);

        return(
            <Container className='lot_container'>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <Image centered size='big' src={lot.image || defaultImage}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h2>{lot.lot_name}</h2>
                        <p>{lot.description}</p>
                        <p>Starting price: {lot.starting_price}$</p>
                        {countdown}
                        {bidData}
                        {(isLotOwner && isEdditable) &&
                        <NavLink to={'/lot_edit/' + lot.lot_id}><Button basic size='small'>Edit Lot</Button></NavLink>}
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.user.userdata,
        lots: store.lots.lots
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        saveError: (err) => dispatch(saveError(err))
    };
};


export default connect(mapStateToProps, dispatchStateToProps)(LotPage);