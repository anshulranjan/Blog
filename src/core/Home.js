import React from "react";
import background from "../image/blog.jpg";
import { Link} from "react-router-dom";
import {list} from "../post/apiPost";
class Home extends React.Component{
    state = {
        posts: [],
        loading: true,
        page: 1,
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
        this.loadPosts(this.state.page);
    };
    render(){
        const {posts, loading} = this.state;
        const mystyle =  {
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "500px"
        };
        return(
            <div id="page-content" style={{ flex: "1 0 auto"}}>
            <div className="jumbotron jumbotron-fluid text-center text bold" style={mystyle}>
                <div className="container" id="home-container">
                    <h1 className="display-7 font-weight-bold text-white" style={{fontSize:"40px"}}>My Blog</h1>
                    <p className="lead font-weight-bold text-white mt-5" style={{fontSize:"30px"}} >Welcome to my Blog.</p>
                    <p className="my-4"/>
                    <p className="text-white mt-5">Express what to think to the world</p>
                </div>
            </div>
            {loading ? (<div className="d-flex justify-content-center mt-5">
                                                    <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                    </div>
                                    </div>) : ("")}
            {posts.slice(0,5).map((p, i) => {
                return(
                    <div className="container mt-5" key={i}>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="post-preview">
                                    <h2 className="post-title">
                                    <Link to={`/post/${p._id}`} style={{ textDecoration: 'none', color:"black"}}>{p.title}</Link>
                                    </h2>
                                    <h3 className="post-subtitle" style={{ fontWeight: "350", margin: "0 0 10px", fontSize: "20px"}}>
                                    {p.body.substring(0, 500)}
                                    </h3>
                                    <p className="post-meta">Posted by {p.postedBy.name} | Uploaded {new Date(p.created).toDateString()}
                                    </p>
                                </div>
                                <hr />
                            </div>
                        </div>
                        </div>
                )})};
                <div className="clearfix container">
                <Link to="/posts" className="btn btn-primary float-right mb-4">View All Articles</Link> 
              </div>
            </div>
        );
    }
}
export default Home;