import React from 'react';
import { Button } from 'semantic-ui-react';
import { SERVER_URL } from "../constants";
import ErrorModal from "./ErrorModal";
import axios from 'axios/index';


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            userid: null,
            error: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file)
            .then(() => this.props.getAvatar())
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }
    fileUpload(file){
        const url = SERVER_URL + 'user/avatar/' + this.state.userid;
        const formData = new FormData();
        formData.append('avatar', file);
        return axios.post(url, formData)
            .catch((err) => {
                const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
                this.setState({error: errorMessage});
            });
    }

    componentWillMount() {
        if (this.props.userData) {
            let userData = this.props.userData;
            this.setState({
                userid: userData.id || ''
            });

        }
    }

    onModalClose() {
        this.setState({error: null});
    }

    render() {
        return (
            <div>
                <ErrorModal error={this.state.error} onClose={this.onModalClose}/>
                <form onSubmit={this.onFormSubmit} style={{paddingBottom: 30}}>
                    <input className='file' id='avatar' name='avatar' type="file" onChange={this.onChange} />
                    <Button as='label' htmlFor='avatar'>Choose image</Button>
                    <Button type="submit" disabled={!this.state.file}>Upload image</Button>
                </form>
            </div>

        );
    }
}



export default FileUpload;