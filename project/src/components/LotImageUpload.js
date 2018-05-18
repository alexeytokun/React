import React from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { Carousel } from 'react-responsive-carousel';

class LotImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            files: null,
            userid: null,
            srcs: []
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({files:e.target.files},
            () => {
                const files = this.state.files;
                for (let i = 0; i < files.length; i++) {
                    this.readFile(files[i]);
                }
                this.props.onFileSelect(this.state.files);
            });
    }

    readFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            let srcs = this.state.srcs;
            srcs.push(reader.result);
            this.setState({srcs: srcs})
        };
        reader.readAsDataURL(file);
    }

    render() {
        const srcs = this.state.srcs;
        const images = srcs.map((src, i) =>
            <div key={i}><img className='lot_img' src={src}/></div>
        );
        const carousel = <Carousel showThumbs={false}>{images}</Carousel>

        return (
            <Form.Field onSubmit={this.onFormSubmit}>
                {(images.length && carousel) || <Image className='lot_img' size='medium' centered src={logo}/>}
                <input className='file' id='avatar' name='avatar' type="file" multiple onChange={this.onChange} />
                <Button as='label' htmlFor='avatar' className='button' style={{color: 'rgba(0,0,0,.6)'}}>Choose image</Button>
            </Form.Field>
        );
    }
}



export default LotImageUpload;