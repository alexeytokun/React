import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios/index';
import '../css/Comments.css';
import { SERVER_URL } from '../constants';
import placeholder from '../default-avatar.png';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            value: '',
            reply: null,
            edit: false,
        };

        this.handleReply = this.handleReply.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentWillMount() {
        this.updateComments();
    }

    handleReply(e) {
        this.setState({ value: `${e.target.dataset.username}, `, reply: e.target.dataset.id });
    }

    startEdit(e) {
        window.scrollTo(0, document.body.scrollHeight);
        this.setState({
            edit: e.target.dataset.id,
            value: e.target.dataset.text,
        });
    }

    handleEdit() {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const commentId = this.state.edit;
        const comment = {
            post_time: now,
            post_text: this.state.value,
        };

        axios.post(`${SERVER_URL}lot/comment/${commentId}`, { comment }, {
            headers: {
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(() => this.setState({ edit: false, reply: null }, () => this.updateComments()))
            .catch((err) => {
                this.props.saveError(err);
            });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        e.target.blur();
        const userId = this.props.userData && this.props.userData.id;
        if (!userId) return;

        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const comment = {
            post_time: now,
            post_text: this.state.value,
            user_id: userId,
            reply: this.state.reply,
            lot_id: this.props.lotId,
        };

        axios.post(`${SERVER_URL}lot/comment/new`, { comment }, {
            headers: {
                'User-Auth-Token': localStorage.getItem('jwt'),
            },
        })
            .then(() => this.setState({ reply: null }, () => this.updateComments()))
            .catch((err) => {
                this.props.saveError(err);
            });
    }

    mapReplies(replies, userId) {
        const sortedReplies = replies.sort((a, b) => a.comment_id > b.comment_id);
        const mappedReplies = this.mapComments(sortedReplies, userId);

        return (
            <Comment.Group size="large">
                {mappedReplies}
            </Comment.Group>
        );
    }

    mapComments(comments, userId) {
        return comments.map(comment => (
            <Comment key={comment.comment_id}>
                <Comment.Avatar src={comment.avatar || placeholder} />
                <Comment.Content>
                    <Comment.Author as="span">
                        <NavLink as="a" to={`/lots/user/${comment.user_id}`}>{comment.username}</NavLink>
                    </Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(comment.post_time).calendar()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.post_text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action
                            data-id={comment.comment_id}
                            data-username={comment.username}
                            onClick={this.handleReply}
                        >
                            Reply
                        </Comment.Action>
                        {(userId && userId === comment.user_id) &&
                        <Comment.Action
                            onClick={this.startEdit}
                            data-text={comment.post_text}
                            data-id={comment.comment_id}
                        >
                            Edit
                        </Comment.Action>
                        }
                    </Comment.Actions>
                    {comment.replies && this.mapReplies(comment.replies, userId)}
                </Comment.Content>
            </Comment>
        ));
    }

    updateComments() {
        const { lotId } = this.props;
        axios.get(`${SERVER_URL}lot/comments/${lotId}`)
            .then(res => this.setState({ comments: res.data.comments, value: '', reply: null }))
            .catch(err => this.props.saveError(err));
    }

    clear(e) {
        e.target.blur();
        this.setState({
            value: '',
            edit: false,
            reply: null,
        });
    }

    render() {
        if (!this.props.showComments) return null;
        const userId = (this.props.userData && this.props.userData.id) || null;
        const commentsArray = this.state.comments;

        const mappedComments = (commentsArray && commentsArray.length) ?
            this.mapComments(commentsArray, userId) : 'Be the first to post a comment';

        return (
            <Comment.Group size="large">
                <Header as="h3" dividing>Comments</Header>

                {mappedComments}

                <Form reply>
                    <Form.TextArea value={this.state.value} onChange={this.handleChange} />
                    <Button
                        onClick={this.state.edit ? this.handleEdit : this.handleSubmit}
                        content={this.state.edit ? 'Edit Comment' : 'Add Comment'}
                        labelPosition="left"
                        icon="edit"
                        basic
                    />
                    <Button
                        onClick={this.clear}
                        content="Clear"
                        basic
                    />
                </Form>
            </Comment.Group>
        );
    }
}

export default Comments;
