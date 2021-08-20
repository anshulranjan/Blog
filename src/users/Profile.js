import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DefaultProfile from "../image/user-avatar.png";
import Deleteuser from "./Deleteuser";
import Deleteblog from "../post/Deleteblog";
import {read} from './apiuser';
import {listByUser} from "../post/apiPost";
class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            user: {},
            redirectToSignIn : false,
            loading:true,
            loading1: true,
            error: "",
            posts:[]
        }
    }
    init = (userid) => {
        const token = isAuthenticated().token;
        read(userid,token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignIn : true});
            } else{
                this.setState({user:data, loading:false});
                this.loadPosts(data._id);
            }
        });
    }
    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignIn : true});
            } else{
                this.setState({posts:data, loading1: false});
            }
        });
    }
    componentDidMount(){
        const userid = this.props.match.params.userId;
        this.init(userid);
        
    }
    componentWillReceiveProps(props){
        const userid = props.match.params.userId;
        this.init(userid);
        
    }
    render(){
        const {redirectToSignIn , user, loading, posts , loading1} = this.state;
        if(redirectToSignIn) return <Redirect to ="/signin" />
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        return(
                <>
                <div id="page-content">
                    <div className = "container">
                    <h1 className="text-center mt-4">{user.name} Profile</h1>
                    {loading ? (<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                        </div>) : 
                    ("")}
                        <img
                            src={photoUrl}
                            alt={user.name}
                            className="img-thumbnail d-flex justify-content-center"
                            onError = {i=> (i.target.src = `${DefaultProfile}`)}
                            style={{height:"200px",width:"auto", objectFit:'cover'}}
                            />
                        <div className="text-center mt-4">
                        {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
                                                <div className="d-inline-block mt-3">
                                                    <Link to={`/user/edit/${this.state.user._id}`} className="btn btn-outline-info mb-4">Update Profile</Link>
                                                    <Deleteuser userId={user._id}/>
                                                </div>
                                                )}
                        </div>
                        <h3 class="text-center mt-4">Articles</h3>
                        {loading1 ? (<div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            </div>) : ("")}
                        {!posts.length && !loading1 && (<div class="card mt-3 mb-4"> <div class="card-body"><h4>No Articles Available</h4></div></div>)}
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



                    </div>
                </div>
                </>
                
        );
    }
}

export default Profile;

