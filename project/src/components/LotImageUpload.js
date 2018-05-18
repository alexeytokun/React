import React from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import logo from "../logo-new.svg";

class LotImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            userid: null,
            src: this.props.src || logo
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({file:e.target.files[0]},
            () => {
                const reader = new FileReader();
                reader.onload = () => {
                    this.setState({src: reader.result})
                };
                if (this.state.file) reader.readAsDataURL(this.state.file);
                this.props.onFileSelect(this.state.file);
            });
    }

    render() {
        return (
            <Form.Field onSubmit={this.onFormSubmit}>
                <Image className='reg_logo' size='large' centered src={this.state.src}/>
                <input className='file' id='avatar' name='avatar' type="file" onChange={this.onChange} />
                <Button as='label' htmlFor='avatar' className='button' style={{color: 'rgba(0,0,0,.6)'}}>Choose image</Button>
            </Form.Field>
        );
    }
}



export default LotImageUpload;