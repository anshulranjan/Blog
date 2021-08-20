import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };
    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };
    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };
    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            comment(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };
    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const {error} = this.state;
        const { comments } = this.props;
        return(
            <div>
                <div className="alert alert-danger mt-3" style={{display: error? "":"none"}}>{error}</div>
                <div class="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <form onSubmit={this.addComment}>
                            <div className="form-group">
                                <textarea onChange={this.handleChange} value={this.state.text}type="text" rows = "4" className="form-control"></textarea>
                            </div>
                            <button type="submit" className = "btn btn-primary mt-2 mb-2">Submit</button>
                        </form>
                    </div>
                </div>
                    {comments.reverse().map((comment, i) => (
                        <div className="media mb-4" key={i}>
                            <div className="media-body">
                                <h5 className="mt-0"><Link to={`/user/${comment.postedBy._id}`} style={{textDecoration:"none", color:"#000"}}> {comment.postedBy.name}{" "} </Link></h5>
                                {comment.text}
                                <br />
                                {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                        <>
                                        <span
                                        onClick={() =>
                                        this.deleteConfirmed(comment)
                                        }
                                        className="btn btn-outline-danger mt-3 mb-3"
                                        >
                                        Delete
                                        </span>
                                        </>
                                )}
                            </div>
                            <small>Commented on {" "}{new Date(comment.created).toDateString()}</small>
                            <br />
                            <hr />
                            </div>
                    ))}
            </div>
        )
    }
}

export default Comment;