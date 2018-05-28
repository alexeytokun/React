import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import '../css/Comments.css';

class Comments extends Component {

    render() {
        if(!this.props.showComments) return null;

        return (
            <Comment.Group size='large' className='comments_group'>
                <Header as='h3' dividing>Comments</Header>

                <Comment>
                    <Comment.Avatar src='http://127.0.0.1:8000/public/avatars/avatar-1527086644281.jpg'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>13.3" 1440 x 900 glossy, Intel Core i5 5350U 1800 MHz, 8 GB, 128 GB (SSD), Intel HD Graphics 6000, OS X, silver</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea/>
                    <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
                </Form>
            </Comment.Group>
        );
    }

}

export default Comments;