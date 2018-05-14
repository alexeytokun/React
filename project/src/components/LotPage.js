import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import LotCard from "./LotCard";

import temp from '../default_product.jpg';

class LotPage extends Component {

    render() {
        const lot = this.props.location.state && this.props.location.state.lot;
        if (!lot) {
            return null;
        }

        return(
            <Container>
                <LotCard lot={lot}/>
            </Container>
        );
    }
}

export default LotPage;