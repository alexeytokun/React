import React from 'react';
import { Button } from 'semantic-ui-react';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            userid: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file)
            .then(() => this.props.getAvatar())
            .catch(error => console.log(error));
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }
    fileUpload(file){
        const url = 'http://127.0.0.1:8000/user/avatar/' + this.state.userid;
        const formData = new FormData();
        formData.append('avatar', file);
        return fetch(url, {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        );
    }

    componentWillMount() {
        if (this.props.userData) {
            let userData = this.props.userData;
            this.setState({
                userid: userData.id || ''
            });

        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} style={{paddingBottom: 30}}>
                <input className='file' id='avatar' name='avatar' type="file" onChange={this.onChange} />
                <Button as='label' htmlFor='avatar'>Choose image</Button>
                <Button type="submit" disabled={!this.state.file}>Upload image</Button>
            </form>
        );
    }
}



export default FileUpload;