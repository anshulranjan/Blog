import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {read, update, updateuser} from './apiuser'
import DefaultProfile from "../image/user-avatar.png";
class EditProfile extends Component{
    constructor()
    {
        super();
        this.state = {
            id: "",
            name:"",
            email:"",
            password:"",
            redirectToProfile: false,
            error: "",
            loading: false,
            fileSize: 0
        }
    }
    init = (userid) => {
        const token = isAuthenticated().token;
        read(userid,token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToProfile : true});
            } else{
                this.setState({id: data._id, name: data.name, email: data.email, password: data.password});
            }
        });

    }
    componentDidMount(){
        this.userData = new FormData();
        const userid = this.props.match.params.userId;
        this.init(userid);
        
    }
    isValid = () => {
        const { name, email, password, fileSize} = this.state;
        if (fileSize > 100000) {
            this.setState({ error: "File Size should be less than 100Kb"});
            return false;
          }
        if (name.length === 0) {
          this.setState({ error: "Name is required"});
          return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({error: "A valid Email is required"});
          return false;
        }
        if (password && password.length >= 1 && password.length <= 5) {
          this.setState({error: "Password must be at least 6 characters long",});
          return false;
        }
        return true;
    };

    handleChange = (name) => (event) =>{
        this.setState({error: ""});
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size: 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize});
    };
    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if(this.isValid()){
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId,token, this.userData).then(data =>{
                if(data.error)
                {   
                    this.setState({error : data.error});
                }else{
                    updateuser(data, () => {
                        this.setState({
                          redirectToProfile: true
                        });
                    });
                }
            });
        } else{
            this.setState({loading: false});
        }
    };
    signupForm = (name, email, password) =>
    (
        <div class="card border border-3 rounded-3 mb-4">
            <div class="card-body">
        <form>
            
                        <div className="form-group">
                            <label className="text-muted">Profile Photo</label>
                            <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"></input>
                        </div>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control mb-4" value={password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className = "btn btn-raised btn-primary mb-4">Update</button>
                </form>
                </div>
                </div>
    );

    render(){
        const {id, name, email, password,error,redirectToProfile, loading} = this.state;
        if(redirectToProfile)
        {
            return (<Redirect to={`/user/${id}`} />);
        }
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;
        return(
            <div className = "container">
                <h1 className="mt-5 mb-5 text-center">Update Profile</h1>
                <div className="alert alert-danger" style={{display: error? "":"none"}}>{error}</div>
                {loading ? (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                    </div>) : ("")}
                <img style = {{height:"200px",width:"auto"}} onError = {i=> (i.target.src = `${DefaultProfile}`)} className = "img-thumbnail mb-4" src={photoUrl} alt={name} />
                {this.signupForm(name, email, password)}

            </div>
        )
    }
}
export default EditProfile;
