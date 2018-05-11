import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import LotCard from "./LotCard";

class LotGroup extends Component {

    render() {
        console.log(this.props.lots);
        let cards = this.props.lots.map((lot, i)=>{
            return <LotCard key={i} lot={lot}/>
        });
        return(
            <Card.Group>
                {cards}
            </Card.Group>
        );
    }
}

export default LotGroup;