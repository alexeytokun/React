import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import '../css/Comments.css';

const commentsArray = [
    {
        comment_id: 1,
        user_id: 1,
        avatar: 'http://127.0.0.1:8000/public/avatars/avatar-1527086644281.jpg',
        time: 'Today at 5:42PM',
        text: '13.3" 1440 x 900 glossy, Intel Core i5 5350U 1800 MHz, 8 GB, 128 GB (SSD), Intel HD Graphics 6000, OS X, silver',
        username: 'Matt',
        replies: [
            {
                comment_id: 2,
                user_id: 1,
                avatar: 'http://127.0.0.1:8000/public/avatars/avatar-1527086644281.jpg',
                time: 'Today at 5:42PM',
                text: '13.3" 1440 x 900 glossy, Intel Core i5 5350U 1800 MHz, 8 GB, 128 GB (SSD), Intel HD Graphics 6000, OS X, silver',
                username: 'Matt',
            },
            {
                comment_id: 3,
                user_id: 1,
                avatar: 'http://127.0.0.1:8000/public/avatars/avatar-1527086644281.jpg',
                time: 'Today at 5:42PM',
                text: '13.3" 1440 x 900 glossy, Intel Core i5 5350U 1800 MHz, 8 GB, 128 GB (SSD), Intel HD Graphics 6000, OS X, silver',
                username: 'Matt',
            },
        ]
    },
];

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            userId: null,
            replyTo: null
        };

        this.handleReply = this.handleReply.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleReply(e) {
        console.log(e.target.dataset.id);
        this.setState({value: e.target.dataset.username + ', '});
    }

    handleEdit() {
        console.log('ok');
    }

    handleChange(e) {
        this.setState({value: e.target.dataset.comment});
    }

    handleSubmit(e) {
        e.target.blur();
        this.setState({value: ''});
    }

    mapReplies(replies, userId) {
        const mappedReplies = this.mapComments(replies, userId);

        return (
            <Comment.Group size='large'>
                {mappedReplies}
            </Comment.Group>
        );
    }

    mapComments(comments, userId) {
        return comments.map(
            (comment) => {
                return (
                    <Comment key={comment.comment_id}>
                        <Comment.Avatar src={comment.avatar}/>
                        <Comment.Content>
                            <Comment.Author as='span'>
                                <NavLink as='a' to={'/lots/user/' + comment.user_id}>{comment.username}</NavLink>
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.time}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.text}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action data-id={comment.user_id} data-username={comment.username} onClick={this.handleReply}>Reply</Comment.Action>
                                {(userId && userId === comment.user_id) && <Comment.Action onClick={this.handleEdit.bind(this)}>Edit</Comment.Action>}
                            </Comment.Actions>
                            {comment.replies && this.mapReplies(comment.replies, userId)}
                        </Comment.Content>
                    </Comment>
                );
            });
    }

    render() {
        if(!this.props.showComments) return null;
        const userId = (this.props.userData && this.props.userData.id) || null;

        const comments = (commentsArray && commentsArray.length) ?
            this.mapComments(commentsArray, userId) : 'Be the first to post a comment';

        return (
            <Comment.Group size='large'>
                <Header as='h3' dividing>Comments</Header>

                {comments}

                <Form reply>
                    <Form.TextArea value={this.state.value} onChange={this.handleChange}/>
                    <Button onClick={this.handleSubmit} content='Add Comment' labelPosition='left' icon='edit' basic/>
                </Form>
            </Comment.Group>
        );
    }
}

export default Comments;