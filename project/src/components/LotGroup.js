import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import LotCard from "./LotCard";

class LotGroup extends Component {

    render() {
        return(
            <Card.Group>
                <LotCard/>
                <LotCard/>
                <LotCard/>
            </Card.Group>
        );
    }
}

export default LotGroup;