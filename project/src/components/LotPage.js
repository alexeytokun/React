import React, { Component } from 'react';
import { Container, Image, Grid, Button, Divider } from 'semantic-ui-react';
import defaultImage from '../default_product.jpg';
import Countdown from "./Countdown";
import Bid from './Bid';
import {connect} from "react-redux";
import {saveError} from "../actions/errorsActions";
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class LotPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lot: {}
        };
    }

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
                        <span style={{fontSize: 20, color: 'black'}}>Time left:</span>
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

    componentWillMount() {
        const id = +this.props.match.params.id;
        const lot = this.props.lots.find(lot => lot.lot_id === id);
        this.setState({lot: lot});
    }


    render() {
        const lot = this.state.lot;
        if (!lot) return null;
        console.log(lot);

        const stage = this.countLotStage(lot.start_time, lot.end_time);
        const countdown = this.countLotTime(lot, stage);
        const user = this.props.userData || {};
        const isLotOwner = user.id === lot.user_id;
        const isEdditable = stage === 'pending';
        const bidData = this.switchBidData(user, lot, isLotOwner, stage);

        let images = lot.images;
        console.log(images);
        if (images && images.length) {
            images = images.map((img, i) =>
            <div key={i}><img src={img || defaultImage}/></div>
            )
        } else {
            images = <div><img src={defaultImage}/></div>;
        }

        return(
            <Container className='lot_container'>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <Carousel>
                            {images}
                        </Carousel>
                        {/*<Image centered size='big' src={(lot.images.length && lot.images[0]) || defaultImage}/>*/}
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