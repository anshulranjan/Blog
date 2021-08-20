import {Component, React} from "react";
import { list } from "./apiPost";
import DefaultProfile from "../image/user-avatar.png";
import { isAuthenticated } from "../auth";
import Deleteblog from "./Deleteblog";
import { Link } from "react-router-dom";
class Posts extends Component{
    constructor(){
        super();
        this.state ={
            posts: [],
            loading: true,
            page: 1,
            count: 0
        }
    }
    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data, loading: false });
            }
        });
    };
    loadMore = number => {
        this.setState({ page: this.state.page + number, loading: true });
        this.loadPosts(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number, loading: true });
        this.loadPosts(this.state.page - number);
    };
    componentDidMount(){
        this.loadPosts(this.state.page);
    };
    renderPosts = (posts) => {
        return(
            <div class="container">

                    {posts.map((post, i) => {
                        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                        const photoUrl = post.postedBy._id ? `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}` : DefaultProfile;
                        return(

                            <div className="row justify-content-md-center" key={i}>
                                <div className="container mt-4">
                                    <div className="card text-center shadow mb-5 bg-white rounded">
                                    <div className="card-header font-italic">
                                        by <Link to={`${posterId}`}> {posterName}{" "} </Link>
                                        <br/>
                                        {post.categories && (
                                            <div class="mt-2 badge bg-primary">{post.categories[0]}</div> 
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title"><Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color:"black"}}>{post.title} </Link></h5>
                                        <p className="card-text">{post.body.substring(0, 200)}</p>
                                        <Link to={`/post/${post._id}`} className="btn btn-outline-success mb-4">Read</Link>
                                        {isAuthenticated() && post.postedBy._id === isAuthenticated().user._id && (
                                            <>
                                            <Link to={`/post/edit/${post._id}`} className="btn btn-outline-info mb-4">
                                            Update
                                            </Link>
                                            <Deleteblog postId={post._id} userId={post.postedBy._id}/>
                                            
                                            </>
                                        )}
                                    </div>
                                    <div className="card-footer text-muted">
                                        <small>Uploaded on {new Date(post.created).toDateString()} 
                                    </small>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                        );
                    })}
            </div>
            )
    }
    render(){
        const {posts, loading, page} = this.state;
        
        return(
            <div id="page-content">
                <h1 className="text-center mt-4">All Articles</h1>
                {loading ? (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                    </div>) : ("")}
                {this.renderPosts(posts)}
                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>

        )
    }
}
export default Posts;





