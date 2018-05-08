import React, { Component } from 'react';
import { Button, Form, Container, Select, TextArea, Image } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import LotImageUpload from './LotImageUpload';

class AddLot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: [],
            file: null,
            dates: null,
            description: '',
            category: null,
            lotname: '',
            price: null
        };
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/lot/categories')
            .then((res) => res.json())
            .then((res) => {
                let options = res.map((option) => {
                    return {
                        key: option.category_id,
                        value: option.category_id,
                        text: option.category_name
                    }
                });
                this.setState({options: options});
            })
            .catch((err) => console.log(err));
    }

    onFileSelect(file) {
        this.setState({file: file});
    }

    onDatesSelect(dates) {
        this.setState({dates: dates});
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSelectChange(e, values) {
        const { name, value } = values;
        this.setState({ [name]: value });
    }

    render() {
        console.log(this.state);

        return (
            <Container className="reg_wrapper">
                <Form>
                    <LotImageUpload onFileSelect={this.onFileSelect}/>
                    <Form.Field>
                        <Form.Input onChange={this.handleChange} name='lotname' placeholder='Lot name' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input onChange={this.handleChange} icon='dollar' name='price' min={0} type='number' placeholder='Starting price' />
                    </Form.Field>
                    <Form.Field>
                        <DatePicker onDatesSelect={this.onDatesSelect}/>
                    </Form.Field>
                    <Form.Field>
                        <Select onChange={this.handleSelectChange} name='category' placeholder="Category" options={this.state.options}/>
                    </Form.Field>
                    <Form.Field>
                        <TextArea onChange={this.handleChange} name='description' autoHeight placeholder='Lot description'/>
                    </Form.Field>
                    <Button fluid={true} type='submit' className='button'>Save</Button>
                </Form>
            </Container>
        );
    }
}

export default AddLot;