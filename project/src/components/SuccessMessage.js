import React from 'react'
import { Message } from 'semantic-ui-react'

const SuccessMessage = (props) => (
    <Message positive hidden={!props.visible}>
        <Message.Header>Changes saved</Message.Header>
    </Message>
);

export default SuccessMessage;