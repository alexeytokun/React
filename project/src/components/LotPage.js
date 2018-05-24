import React, { Component } from 'react';
import { Container, Grid, Button, Divider } from 'semantic-ui-react';
import defaultImage from '../default_product.jpg';
import Countdown from "./Countdown";
import Bid from './Bid';
import {connect} from "react-redux";
import {saveError} from "../actions/errorsActions";
import { NavLink, Redirect } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from "axios/index";
import {SERVER_URL} from "../constants";
import DeleteConfirm from "./DeleteConfirm";

class LotPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lot: null,
            redirect: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCountdownEnd = this.handleCountdownEnd.bind(this);
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
                        <Countdown onEnd={this.handleCountdownEnd} date={lot.end_time}/>
                    </div>
                );
            case 'finished':
                return (
                    <div>
                        <Divider/>
                        <p style={{fontSize: 20, color: 'red'}}>Finished</p>
                    </div>
                );
            case 'pending':
                return (
                    <div>
                        <Divider/>
                        <span style={{fontSize: 20, color: 'black'}}>Auction starts in:</span>
                        <Countdown onEnd={this.handleCountdownEnd} date={lot.start_time}/>
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
        if (stage === 'finished') {
            return <Bid lot={lot} user={user} finished/>;
        }
        return null;
    }

    handleDelete() {
        axios.delete(SERVER_URL + 'lot/' + this.state.lot.lot_id, {
            headers: {
                "User-Auth-Token": localStorage.getItem('jwt')
            }
        })
            .then((res) => this.setState({redirect: '/lots/user'}))
            .catch((err) => this.props.saveError(err));
    }

    handleCountdownEnd() {
        this.forceUpdate();
    }

    componentWillMount() {
        const id = +this.props.match.params.id;
        axios.get(SERVER_URL + 'lot/' + id, {
            headers: {
                "User-Auth-Token": localStorage.getItem('jwt')
            }
        })
            .then((res) => this.setState({lot: res.data.lot}))
            .catch((err) => this.props.saveError(err));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            const id = nextProps.match.params.id;
            console.log(id);
            axios.get(SERVER_URL + 'lot/' + id, {
                headers: {
                    "User-Auth-Token": localStorage.getItem('jwt')
                }
            })
                .then((res) => this.setState({lot: res.data.lot}))
                .catch((err) => this.props.saveError(err));
        }
    }

    render() {
        const lot = this.state.lot;
        if (!lot) return null;

        if(this.state.redirect) {
            return <Redirect push to={this.state.redirect}/>;
        }

        const stage = this.countLotStage(lot.start_time, lot.end_time);
        const countdown = this.countLotTime(lot, stage);
        const user = this.props.userData || {};
        const isLotOwner = user.id === lot.user_id;
        const isEdditable = stage === 'pending';
        const bidData = this.switchBidData(user, lot, isLotOwner, stage);

        let images = lot.images;
        if (images && images.length) {
            images = images.map((img, i) =>
            <div key={i}><img src={img.path || defaultImage}/></div>
            )
        } else {
            images = <div><img src={defaultImage}/></div>;
        }

        return(
            <Container className='lot_container'>
                <Grid stackable>
                    <Grid.Column width={7}>
                        <Carousel dynamicHeight={true} >
                            {images}
                        </Carousel>
                    </Grid.Column>
                    <Grid.Column width={7} className='lot_info'>
                        <h2>{lot.lot_name}</h2>
                        <p>{lot.description}</p>
                        <p style={{fontWeight: 'bold'}}>Starting price: {lot.starting_price}$</p>
                        {countdown}
                        {bidData}
                        {(isLotOwner && isEdditable) &&
                        <div>
                            <NavLink to={'/lot_edit/' + lot.lot_id}>
                                <Button className='lot_page_btn' basic size='medium'>Edit</Button>
                            </NavLink>
                            <DeleteConfirm onConfirm={this.handleDelete}/>
                        </div>}
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