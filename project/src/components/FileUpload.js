import React from 'react';
import { Button } from 'semantic-ui-react';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file)
        //     .then((response)=>{
        //     console.log(response.data);
        // });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }
    fileUpload(file){
        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        // return fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        //     formData
        // }).then(
        //     response => response.json()
        // ).then(
        //     success => console.log(success)
        // ).catch(
        //     error => console.log(error)
        // );
    }

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.onFormSubmit} style={{paddingBottom: 30}}>
                <input className='file' id='file' name='file' type="file" onChange={this.onChange} />
                <Button as='label' htmlFor='file'>Choose image</Button>
                <Button type="submit" disabled={!this.state.file}>Upload image</Button>
            </form>
        );
    }
}



export default FileUpload;