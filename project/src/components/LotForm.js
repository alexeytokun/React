import React, { Component } from 'react';
import { Button, Form, Container, Select, TextArea } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import LotImageUpload from './LotImageUpload';
import moment from 'moment';

class LotForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: [],
            files: null,
            dates: {
                start: null,
                end: null
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
            src: false
        };
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const categories = this.props.categories;
        let options = categories.map((option) => {
            return {
                key: option.category_id,
                value: option.category_id,
                text: option.category_name
            }
        });
            this.setState({options: options});
    }

    onFileSelect(files) {
        this.setState({files: files});
    }

    onDatesSelect(dates) {
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
        validation.lotname = !!this.state.lotname.match(/^(?=.*\w)[0-9а-яА-ЯёЁa-zA-Z-.'"?!:;,() ]{1,255}$/);
        validation.price = !!this.state.price.match(/^(\d+\.\d{1,2})$/);
        validation.dates = !!(this.state.dates.start && this.state.dates.end);
        validation.description = !!this.state.description.match(/^[\w а-яА-ЯёЁ()+.'"?!:;,-]*$/);
        validation.category = !!this.state.category;
        const isFormValid = !!(validation.lotname
            && validation.price
            && validation.dates
            && validation.description
            && validation.category);
        console.log(validation);
        return {validation: validation, isFormValid: isFormValid};
    }

    validateField(fieldName, value) {
        let validation = {...this.state.validation};

        switch(fieldName) {
            case 'lotname':
                validation.lotname = !!value.match(/^(?=.*\w)[0-9а-яА-ЯёЁa-zA-Z-.'"?!:;,() ]{1,255}$/);
                break;
            case 'price':
                validation.price = !!value.match(/^(\d+\.\d{1,2})$/);
                break;
            case 'dates':
                validation.dates = !!value.start && !!value.end;
                break;
            case 'description':
                validation.description = !!value.match(/^[\w а-яА-ЯёЁ()+.'"?!:;,-]*$/);
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
        const data = {
            start: this.state.dates.start ? moment(this.state.dates.start._d).format('YYYY-MM-DD HH:mm:ss') : null,
            end: this.state.dates.end ? moment(this.state.dates.end._d).format('YYYY-MM-DD HH:mm:ss') : null,
            price: this.state.price,
            category: this.state.category,
            lotname: this.state.lotname,
            description: this.state.description,
        };

        const files = this.state.files;
        this.setState(this.validateAllFields(),
            () => {this.props.handleSubmit(this.state.isFormValid, data, files)});
    }

    componentWillMount() {
        if (this.props.lot) {
            let lot = this.props.lot;
            this.setState({
                description: lot.description,
                category: lot.category_id,
                lotname: lot.lot_name,
                price: lot.starting_price.toFixed(2),
                dates: {
                    start: moment(lot.start_time),
                    end: moment(lot.end_time)
                },
                src: lot.images
            });
        }
    }

    render() {
        return (
            <Container className="reg_wrapper">
                <Form>
                    <LotImageUpload saveError={this.props.saveError} initialSrc={this.state.initialSrc} src={this.state.src} onFileSelect={this.onFileSelect} edit={!!this.props.lot}/>
                    <Form.Field>
                        <Form.Input value={this.state.lotname} error={!this.state.validation.lotname} onChange={this.handleChange} name='lotname' placeholder='Lot name' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input value={this.state.price}  error={!this.state.validation.price} onChange={this.handleChange} icon='dollar' name='price' type='text' placeholder='Starting price' />
                    </Form.Field>
                    <Form.Field className={this.state.validation.dates ? null : 'error'}>
                        <DatePicker value={[this.state.dates.start, this.state.dates.end]} onDatesSelect={this.onDatesSelect}/>
                    </Form.Field>
                    <Form.Field>
                        <Select value={this.state.category} error={!this.state.validation.category} onChange={this.handleSelectChange} name='category' placeholder="Category" options={this.state.options}/>
                    </Form.Field>
                    <Form.Field className={this.state.validation.description ? null : 'error'}>
                        <TextArea value={this.state.description} onChange={this.handleChange} name='description' autoHeight placeholder='Lot description'/>
                    </Form.Field>
                    <Button onClick={this.handleSubmit} fluid={true} type='submit' className='button'>Save</Button>
                </Form>
            </Container>
        );
    }
}

export default LotForm;