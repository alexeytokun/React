import React from 'react';
import { Button, Form, Image, Icon } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { Carousel } from 'react-responsive-carousel';
import { SERVER_URL } from "../constants";
import axios from 'axios/index';

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
        this.setState({
                files: e.target.files || null,
                srcs: this.props.src || [],
                selectedImage: (this.props.src && this.props.src.length) ? this.props.src.length - 1 : 0
            }, () => {
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
            srcs.push({path: reader.result});
            this.setState({srcs: srcs})
        };
        reader.readAsDataURL(file);
    }

    handleCloseIconClick() {
        let {srcs, selectedImage} = this.state;
        const image = srcs[selectedImage];

        if (image && image.image_id) {
            axios.delete(SERVER_URL + 'lot/image/' + image.image_id, {
                headers: {
                    "User-Auth-Token": localStorage.getItem('jwt')
                }
            })
                .then((res) => {
                    srcs.splice(selectedImage, 1);
                    this.setState({srcs, selectedImage: selectedImage - 1});
                })
                .catch((err) => {
                    const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                    console.log(errorMessage);
                });
        } else {
            this.setState({
                files: null,
                srcs: this.props.src || [],
                selectedImage: this.props.src ? this.props.src.length - 1 : 0
            }, () => this.props.onFileSelect(this.state.files));
        }
    }

    handleImageChange(position) {
        this.setState({selectedImage: position});
    }

    render() {
        const srcs = this.state.srcs;
        const images = srcs.map((src, i) =>
            <div key={i} className={'carousel_image_container'}>
                <img className='lot_img' src={src.path}/>
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