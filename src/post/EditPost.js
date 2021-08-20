import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {singlePost, update} from './apiPost'

class EditPost extends Component{
    constructor()
    {
        super();
        this.state = {
            id:"",
            title: "",
            body: "",
            photo: "",
            categories:[],
            error: "",
            photop:"",
            loading: true,
            fileSize: 0,
            redirectToProfile: false
        }
    }
    init = (postId) => {
        singlePost(postId)
        .then(data =>{
            if(data.error){
                this.setState({redirectToProfile : true});
            } else{
                this.setState({id: data._id, title: data.title, categories: data.categories, body: data.body, loading: false, photop:data.photo });
            }
        });

    }
    componentDidMount(){
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }
    isValid = () => {
        const { title, body, fileSize} = this.state;
        if (fileSize > 100000) {
            this.setState({ error: "File Size should be less than 100Kb", loading: false});
            return false;
          }
          if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false});
            return false;
          }
          if (title.length < 4 || title.length > 150) {
            this.setState({ error: "Title length should be between 4 and 150 chanracters", loading: false});
            return false;
        }
        if (body.length < 4 || body.length > 2000) {
            this.setState({ error: "Body should be between 4 to 2000 characters", loading: false});
            return false;
          }
        return true;
    };

    handleChange = (name) => (event) =>{
        this.setState({error: ""});
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size: 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize});
    };
    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if(this.isValid()){
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;
            update(postId,token, this.postData).then(data =>{
                if(data.error)
                {   
                    this.setState({error : data.error, loading: false});
                }else{
                    console.log("New Post");
                    this.setState({loading: false, title: "", body:"", photo: "",categories:[], redirectToProfile: true});
                }
            });
        } else{
            this.setState({loading: false});
        }
    };
    editForm = (title,body, categories) =>
    (
        <form>
                    <div className="card mt-5">
                    
                    <div className="card-body">
                        <div className="form-group">
                            <label className="text-muted">Post Photo</label>
                            <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Title</label>
                            <input onChange={this.handleChange("title")} type="text" className="form-control" value={title}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Body</label>
                            <textarea onChange={this.handleChange("body")} type="text" rows="20" className="form-control" value={body}></textarea>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Category</label>
                            <select onChange={this.handleChange("categories")} className="form-select" aria-label="Default select example" value={categories}>
                                <option selected>Select</option>
                                <option value="Sports">Sports</option>
                                <option value="Foods">Foods</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <button onClick={this.clickSubmit} className = "btn btn-raised btn-primary mt-5 mb-4">Update Post</button>
        </form>
    );
    render(){
        const {id,title, body, error, loading, user, photo,categories, redirectToProfile, photop} = this.state;
        if(redirectToProfile)
        {
            return (<Redirect to={`/post/${id}`} />);
        }
        return(
            <div className = "container">
                <h1 className="mt-5 mb-5 text-center">Edit Blog</h1>
                <div className="alert alert-danger" style={{display: error? "":"none"}}>{error}</div>
                {loading ? (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                    </div>) : ("")}
                    {photop && (
                          <img
                                    src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
                                    alt={title}
                                    className="img-thunbnail"
                                    style={{ height: "200px", width: "auto" }}
                                />
                          )}
                {this.editForm(title, body, categories)}
            </div>
        )
    }
}
export default EditPost;