import {Component, React} from "react";
import { singlePost, list} from "./apiPost";
import DefaultProfile from "../image/user-avatar.png";
import { isAuthenticated } from '../auth';
import Comment from "./Comment";
import { Link, Redirect} from "react-router-dom";
import {remove} from "./apiPost";
class SinglePost extends Component{

    state = {
        post: {categories:[] },
        posts: [],
        redirectToProfile: false,
        loading: true,
        redirecttoSign: false,
        page: 1,
        userid: '',
        comments : []
    };
    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data, loading: false });
            }
        });
    };
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        this.loadPosts(this.state.page);
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    userid: data.postedBy,
                    loading: false,
                    comments: data.comments
                });
            }
        });
    };
    updateComments = comments => {
        this.setState({comments});
    }
    
    deleteAccount = () =>{
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId,token).then(data =>{
            if(data.error)
            {
                console.log(data.error);
            } else {
                this.setState({redirectToProfile: true});
                
            }
        })
    };
    deleteConfirmed = () =>{
        let answer = window.confirm("Are you sure to delete your account?");
        if(answer)
        {
            this.deleteAccount();
        }
    }
    render(){
        const {post, loading, redirectToProfile, userid, posts, redirecttoSign, comments} = this.state;
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
        const photoUrl = post.postedBy ? `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}` : DefaultProfile;
        if(redirectToProfile)
        {
            return (<Redirect to={`/user/${post.postedBy._id}`} />);
        }else if(redirecttoSign)
        {
            return (<Redirect to={`/signin`} />);
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {loading ? (<div className="d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                    </div>
                                    </div>) : ("")}
                            
                    
                        <h1 className="mt-4">{post.title}</h1>
                        {post.categories && (
                            <div class="mt-2 badge bg-primary">{post.categories[0]}</div> 
                        )}
                        <p className="lead">
                            by
                            <Link to={`${posterId}`}> {posterName}{" "} </Link>
                        </p>
                        <hr />
                        <p>Posted on {new Date(post.created).toDateString()} | Last Updated {new Date(post.created).toDateString()}</p>
                        <hr />
                    {post.photo && (
                            <img
                            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            alt={post.title}
                            className="img-thunbnail mb-3 contain"
                            style={{ height: "400px", width: "100%" }}
                            />
                    )}

                    <hr />
                    {post.body}
                    <br />
                    {isAuthenticated() && userid._id === isAuthenticated().user._id && (
                                <div className="d-inline-block mt-4">
                                <Link to={`/post/edit/${post._id}`} className="btn btn-outline-info">
                                    Update Post
                                    </Link>
                                <button onClick={this.deleteConfirmed} className="btn btn-outline-danger">
                                    Delete Post
                                </button>
                                </div>
                    )}
                    
                    <hr />
                    <Comment postId={post._id} comments={comments} updateComments = {this.updateComments}/>

                </div>

                <div className="col-md-4">

                    
                    <div className="card my-4">
                    <h5 className="card-header">New Articles</h5>
                    <div className="card-body">
                    {posts.slice(0,3).map((p, i) => {
                        return(
                        <div className="card mt-3" style={{width: "18rem"}} key={i}>
                        <div className="card-body">
                        <h5 className="card-title">{p.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"><small>Posted on {new Date(p.created).toDateString()}</small></h6>
                        <p className="card-text">{p.body.substring(0, 100)}</p>
                        <a href={`/post/${p._id}`} className="card-link">Read More</a>
                        </div>
                        <br/>
                        </div>
                        )
                    })}

                    
                    </div>
                    </div>
                </div>
                </div>
                </div>
        )
    }
}

export default SinglePost;




