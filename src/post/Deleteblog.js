import {Component, React} from "react";
import { isAuthenticated } from "../auth";
import {remove} from "./apiPost";
import { Redirect} from "react-router-dom";
class Deleteblog extends Component{
    state = {
        redirect: false
    }
    deleteAccount = () =>{
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        remove(postId,token).then(data =>{
            if(data.error)
            {
                console.log(data.error);
            } 
            else {
                this.setState({redirect: true});
                
            }
        })
    };
    deleteConfirmed = () =>{
        let answer = window.confirm("Are you sure to delete the blog?");
        if(answer)
        {
            this.deleteAccount();
        }
    };
    render(){
        const userId = this.props.userId;
        if(this.state.redirect){
            return(<Redirect to={`/user/${userId}`}/>)
        }
        return(
            <button onClick={this.deleteConfirmed} className="btn btn-outline-danger mb-4">Delete</button>
        )
    }
}
export default Deleteblog;