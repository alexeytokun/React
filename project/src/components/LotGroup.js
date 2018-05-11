import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import LotCard from "./LotCard";

class LotGroup extends Component {

    render() {
        let cards = this.props.lots.map((lot, i)=>{
            if(!this.props.category && i > 5) return;
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