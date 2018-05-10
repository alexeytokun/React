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
            dates: {
                start: false,
                end: false
            },
            description: '',
            category: '',
            lotname: '',
            price: '',
            isFormValid: false,
            validation: {
                lotname: true,
                price: true,
                dates: true,
                category: true,
                description: true,
            },
        };
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(dates);
        this.setState({dates: dates}, () => { this.validateField('dates', dates) });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    handleSelectChange(e, values) {
        const { name, value } = values;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateAllFields() {
        let validation = {...this.state.validation};
        validation.lotname = !!this.state.lotname.match(/^(?=.*\w)[а-яА-ЯёЁa-zA-Z0-9- ]{1,30}$/);
        validation.price = !!this.state.price.match(/^(?!$)(?!0+$)\d{0,9}(?:\.\d{1,2})?$/);
        validation.dates = !!(this.state.dates.start && this.state.dates.end);
        validation.description = !!this.state.description.match(/^[\w .'"?!:;,-]*$/);
        validation.category = !!this.state.category;
        const isFormValid = !!(validation.lotname
            && validation.price
            && validation.dates
            && validation.description
            && validation.category);

        return {validation: validation, isFormValid: isFormValid};
    }

    validateField(fieldName, value) {
        let validation = {...this.state.validation};

        switch(fieldName) {
            case 'lotname':
                validation.lotname = !!value.match(/^(?=.*\w)[а-яА-ЯёЁa-zA-Z- ]{1,30}$/);
                break;
            case 'price':
                validation.price = !!value.match(/^(?!$)(?!0+$)\d{0,9}(?:\.\d{1,2})?$/);
                break;
            case 'dates':
                validation.dates = !!value.start && !!value.end;
                break;
            case 'description':
                validation.description = !!value.match(/^[\w .'"?!:;,-]*$/);
                break;
            case 'category':
                validation.category = !!value;
                break;
            default:
                break;
        }

        const isFormValid = !!(validation.lotname
            && validation.price
            && validation.dates
            && validation.description
            && validation.category);

        this.setState({validation: validation, isFormValid: isFormValid});
    }

    handleSubmit() {
        this.setState(this.validateAllFields(),
            () => {
                console.log(this.state);
                if (!this.state.isFormValid) return;
                const data = {
                    start: this.state.dates.start,
                    end: this.state.dates.end,
                    price: this.state.price,
                    category: this.state.category,
                    lotname: this.state.lotname,
                    description: this.state.description,
                    userid: 1 //get from Redux
                };

                const formData = new FormData();
                formData.append('file', this.state.file);
                formData.append('lotdata', JSON.stringify(data));

                fetch('http://127.0.0.1:8000/lot', {
                    method: 'POST',
                    headers: {
                        "User-Auth-Token": sessionStorage.getItem('jwt')
                    },
                    body: formData
                })
                    .then((res) => res.json())
                    .then((res) => console.log(res.message))
                    .catch((err) => console.log(err));
            });
    }

    render() {
        return (
            <Container className="reg_wrapper">
                <Form>
                    <LotImageUpload onFileSelect={this.onFileSelect}/>
                    <Form.Field>
                        <Form.Input error={!this.state.validation.lotname} onChange={this.handleChange} name='lotname' placeholder='Lot name' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input  error={!this.state.validation.price} onChange={this.handleChange} icon='dollar' name='price' min={0} type='number' placeholder='Starting price' />
                    </Form.Field>
                    <Form.Field>
                        <DatePicker onDatesSelect={this.onDatesSelect}/>
                    </Form.Field>
                    <Form.Field>
                        <Select error={!this.state.validation.category} onChange={this.handleSelectChange} name='category' placeholder="Category" options={this.state.options}/>
                    </Form.Field>
                    <Form.Field>
                        <TextArea onChange={this.handleChange} name='description' autoHeight placeholder='Lot description'/>
                    </Form.Field>
                    <Button onClick={this.handleSubmit} fluid={true} type='submit' className='button'>Save</Button>
                </Form>
            </Container>
        );
    }
}

export default AddLot;