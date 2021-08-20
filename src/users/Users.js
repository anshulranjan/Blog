import {Component, React} from "react";
import { list } from "./apiuser";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth";
import Deleteuser from "./Deleteuser";
import DefaultProfile from "../image/user-avatar.png"
class Users extends Component{
    constructor(){
        super();
        this.state ={
            users: [],
            loading: true
        }
    }
    componentDidMount(){
        list().then(data =>{
            if(data.error){
                console.log("ERROR");
            }
            else{
                this.setState({users:data, loading: false});
            }
        })
    }
    renderUsers = (users) => (
        <div class="container">
                    {users.map((user, i) => (
                        <div className="row justify-content-md-center" key = {i}>
                            <div className="container mt-4">
                                <div className="card text-center shadow mb-5 bg-white rounded">
                                <div className="card-header font-italic">
                                    <b>{user.name}</b>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                        onError = {i=> (i.target.src = `${DefaultProfile}`)}
                                        alt={user.name}
                                        className="img-fluid"
                                        style={{width:'100%', height:'15vw', objectFit:'cover'}}
                                        />
                                    </h5>
                                    <p className="card-text"></p>
                                    <Link to={`/user/${user._id}`} className="btn btn-outline-success mb-4">View Profile</Link>
                                    {isAuthenticated() && user._id === isAuthenticated().user._id && (
                                        <>
                                        <Link to={`/user/edit/${user._id}`} className="btn btn-outline-info mb-4">
                                        Update Profile
                                        </Link>
                                        <Deleteuser userId={user._id}/>
                                        </>
                                    )}
                                    </div>
                                    <div className="card-footer text-muted">
                                        <small>{`Joined ${new Date(user.created).toDateString()}`}</small> 
                                    </div>
                                
                            </div>
                            </div>
                            </div>
                    ))}
                </div>
    )
    render(){
        const {users, loading} = this.state;
        
        return(
            <div id="page-content">
                <div className = "container">
                    <h1 className="text-center mt-4">My Bloggers</h1>
                    {loading ? (<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>) : ("")}
                    <div className="container">
                        {this.renderUsers(users)}
                    </div>
                </div>
            </div>

        )
    }
}
export default Users;