import React, { Component } from 'react';
import { Button, Form, Container, Select } from 'semantic-ui-react';
import DatePicker from './DatePicker';


class AddLot extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let options = [
            { key: 'af1', value: 'af1', text: 'Afghanistan 1' },
            { key: 'af2', value: 'af2', text: 'Afghanistan 2' },
            { key: 'af3', value: 'af3', text: 'Afghanistan 3' }
            ];

        return (
            <Container className="reg_wrapper">
                <Form>
                    <Form.Field>
                        <Form.Input name='lotname' placeholder='Lot name' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input icon='dollar' name='price' min={0} type='number' placeholder='Starting price' />
                    </Form.Field>
                    <Form.Field>
                        <DatePicker/>
                    </Form.Field>
                    <Form.Field>
                        <Select placeholder="Category" options={options}/>
                    </Form.Field>
                    <Button fluid={true} type='submit'>Add</Button>
                </Form>
            </Container>
        );
    }
}

export default AddLot;