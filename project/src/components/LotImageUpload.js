import React from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import logo from "../logo-placeholder.png";

class LotImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            userid: null,
            src: logo
        };
        // this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.fileUpload = this.fileUpload.bind(this);
    }
    // onFormSubmit(e){
    //     e.preventDefault();
    //     this.fileUpload(this.state.file)
    //         .then(() => this.props.getAvatar())
    //         .catch(error => console.log(error));
    // }
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
    // fileUpload(file){
    //     const url = 'http://127.0.0.1:8000/user/avatar/' + this.state.userid;
    //     const formData = new FormData();
    //     formData.append('avatar', file);
    //     return fetch(url, {
    //         method: 'POST',
    //         body: formData
    //     }).then(
    //         response => response.json()
    //     );
    // }

    // componentWillMount() {
    //     if (this.props.userData) {
    //         let userData = this.props.userData;
    //         this.setState({
    //             userid: userData.id || ''
    //         });
    //
    //     }
    // }

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