import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

class DeleteConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleClick() {
        this.setState({open: true});
    }

    handleConfirm() {
        this.setState(
            { open: false },
            () => this.props.onConfirm()
        );
    }

    handleCancel() {
        this.setState({ open: false });
    }

    render() {
        return(
            <span>
                <Button onClick={this.handleClick} className='lot_page_btn' basic size='medium'>Delete</Button>
                <Confirm
                    open={this.state.open}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                />
            </span>
        );
    }
}

export default DeleteConfirm;