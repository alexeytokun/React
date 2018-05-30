import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import '../css/Comments.css';
import moment from 'moment';
import axios from "axios/index";
import {SERVER_URL} from "../constants";
import placeholder from "../default-avatar.png";

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            value: '',
            reply: null
        };

        this.handleReply = this.handleReply.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleReply(e) {
        this.setState({value: e.target.dataset.username + ', ', reply: e.target.dataset.id});
    }

    handleEdit() {
        console.log('ok');
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.target.blur();
        const userId = this.props.userData && this.props.userData.id;
        if(!userId) return;

        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(this.state.value);
        let comment = {
            post_time: now,
            post_text: this.state.value,
            user_id: userId,
            reply: this.state.reply,
            lot_id: this.props.lotId
        };
        console.log(comment);

        axios.post(SERVER_URL + 'lot/comment/new', {comment}, {
            headers: {
                "User-Auth-Token": localStorage.getItem('jwt')
            }
        })
            .then((res) => this.updateComments())
            .catch((err) => {
                this.props.saveError(err);
            });
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
                        <Comment.Avatar src={comment.avatar || placeholder}/>
                        <Comment.Content>
                            <Comment.Author as='span'>
                                <NavLink as='a' to={'/lots/user/' + comment.user_id}>{comment.username}</NavLink>
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{moment(comment.post_time).calendar()}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.post_text}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action data-id={comment.comment_id} data-username={comment.username} onClick={this.handleReply}>Reply</Comment.Action>
                                {(userId && userId === comment.user_id) && <Comment.Action onClick={this.handleEdit.bind(this)}>Edit</Comment.Action>}
                            </Comment.Actions>
                            {comment.replies && this.mapReplies(comment.replies, userId)}
                        </Comment.Content>
                    </Comment>
                );
            });
    }

    updateComments() {
        const lotId = this.props.lotId;
        axios.get(SERVER_URL + 'lot/comments/' + lotId)
            .then((res) => this.setState({comments: res.data.comments, value: '', reply: null}))
            .catch((err) => this.props.saveError(err));
    }

    componentWillMount() {
        const lotId = this.props.lotId;
        axios.get(SERVER_URL + 'lot/comments/' + lotId)
            .then((res) => this.setState({comments: res.data.comments}))
            .catch((err) => this.props.saveError(err));
    }

    render() {
        if(!this.props.showComments) return null;
        const userId = (this.props.userData && this.props.userData.id) || null;
        const commentsArray = this.state.comments;

        const mappedComments = (commentsArray && commentsArray.length) ?
            this.mapComments(commentsArray, userId) : 'Be the first to post a comment';

        return (
            <Comment.Group size='large'>
                <Header as='h3' dividing>Comments</Header>

                {mappedComments}

                <Form reply>
                    <Form.TextArea value={this.state.value} onChange={this.handleChange}/>
                    <Button onClick={this.handleSubmit} content='Add Comment' labelPosition='left' icon='edit' basic/>
                </Form>
            </Comment.Group>
        );
    }
}

export default Comments;