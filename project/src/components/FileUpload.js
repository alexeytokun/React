import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios/index';
import { SERVER_URL } from '../constants';
import '../css/FileUpload.css';


class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userid: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file)
            .then(() => this.props.getAvatar())
            .catch(err => this.props.saveError(err));
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    fileUpload(file) {
        const url = `${SERVER_URL}user/avatar/${this.state.userid}`;
        const formData = new FormData();
        formData.append('avatar', file);
        return axios.post(url, formData)
            .catch(err => this.props.saveError(err));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit} className="file_form">
                    <input className="file" id="avatar" name="avatar" type="file" onChange={this.onChange} />
                    <Button className="file_button" as="label" htmlFor="avatar">Choose image</Button>
                    <Button className="file_button" type="submit" disabled={!this.state.file}>Save image</Button>
                </form>
            </div>

        );
    }
}

export default FileUpload;
