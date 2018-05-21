import React from 'react';
import { Button, Form, Image, Icon } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { Carousel } from 'react-responsive-carousel';

class LotImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            files: null,
            userid: null,
            srcs: this.props.src || [],
            selectedImage: 0
        };
        this.onChange = this.onChange.bind(this);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    onChange(e) {
        const newState = {
            files:e.target.files,
            srcs: this.props.src || [],
            selectedImage: this.props.src ? this.props.src.length - 1 : 0
        };
        console.log(newState);
        this.setState(newState,
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
            let srcs = [...this.state.srcs];
            srcs.push(reader.result);
            this.setState({srcs: srcs})
        };
        reader.readAsDataURL(file);
    }

    handleCloseIconClick() {
    //     if (this.props.edit) {
    //     } else {
    //         console.log('add');
    //         let {srcs, files, selectedImage} = this.state;
    //         srcs.splice(selectedImage, 1);
    //         this.setState({srcs, selectedImage: selectedImage - 1, files});
    //     }
        console.log('soon...');
    }

    handleImageChange(position) {
        this.setState({selectedImage: position});
    }

    render() {
        const srcs = this.state.srcs;
        const images = srcs.map((src, i) =>
            <div key={i} className={'carousel_image_container'}>
                <img className='lot_img' src={src}/>
            </div>
        );
        const carousel =
            <div>
                <Carousel onChange={this.handleImageChange} showThumbs={false} selectedItem={this.state.selectedImage}>{images}</Carousel>
                {this.props.edit && <Icon className={'carousel_close_icon'} name='close' onClick={this.handleCloseIconClick}/>}
            </div>;

        return (
            <Form.Field onSubmit={this.onFormSubmit}>
                {(images.length && carousel) || <Image className='lot_img' size='medium' centered src={logo}/>}
                <input className='file' id='avatar' name='avatar' type="file" multiple onChange={this.onChange} />
                <Button as='label' htmlFor='avatar' className='button' style={{color: 'rgba(0,0,0,.6)'}}>{this.state.files ? 'Change images' : 'Add images'}</Button>
            </Form.Field>
        );
    }
}



export default LotImageUpload;