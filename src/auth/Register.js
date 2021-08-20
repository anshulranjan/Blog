import React, { Component } from "react";
import {signup} from './index';
import {Link} from "react-router-dom";
class Register extends Component {
    constructor()
    {
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            error:"",
            open: false
        };
    }
    handleChange = (name) => (event) =>{
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };
    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name: name,
            email: email,
            password: password
        };
        signup(user).then(data =>{
            if(data.error) this.setState({error : data.error});
            else this.setState({
                name: "",
                error: "",
                email: "",
                password:"",
                open: true
            });
        });
    };
    signupForm = (name, email, password) =>
    (
        <div class="card border border-3 rounded-3">
            <div class="card-body">
        <form>
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
                    <button onClick={this.clickSubmit} className = "btn btn-raised btn-primary mb-4">Register</button>
                </form>
                </div>
                </div>
    );
    render(){
        const {name, email, password, error,open} = this.state;
        return(
            <div className = "container">
                <h1 className="mt-5 mb-5 text-center">Register</h1>

                <div className="alert alert-danger" style={{display: error? "":"none"}}>{error}</div>
                <div className="alert alert-success" style={{display: open? "":"none"}}>New Account is successfully created. Please <Link to="/signin">Sign In</Link>.</div>
                {this.signupForm(name, email, password)}
            </div>

        )
    }
}

export default Register;