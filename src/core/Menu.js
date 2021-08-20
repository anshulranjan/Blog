import React from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
    if(history.location.pathname === path)
    {
        return {color:"white"};
    }
    else
    {
        return {color: "grey"};
    }
}
const Menu = ({history}) =>(
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="navbar-brand" >MyBlog</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/users" className="nav-link" style ={isActive(history, "/users")} aria-current="page">Users</Link>
                </li>
                <li className="nav-item">
                    <Link to="/posts" className="nav-link" style ={isActive(history, "/posts")} aria-current="page">Posts</Link>
                </li>

                <li className="nav-item">
                        <Link to = "/create/post" className="nav-link" style ={isActive(history, "/create/post")} aria-current="page"> 
                            Create Post
                        </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                My Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {!isAuthenticated() && (
                                <>
                                    <li className="dropdown-item">
                                    <Link to="/signin" className="nav-link" style={{color:"black"}}>Sign In</Link>
                                    </li>
                                    <li className="dropdown-item">
                                    <Link to="/signup" className="nav-link" style={{color:"black"}}>Sign Up</Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated() && (
                                    <>

                                        <li className="dropdown-item">
                                        <Link to = {`/user/${isAuthenticated().user._id}`} className="nav-link" style={{color:"black"}}> 
                                            My Profile
                                        </Link>
                                        </li>
                                        <li className="dropdown-item">
                                        <span className="nav-link" onClick={() => signout(() => history.push("/"))} style ={{color:"black"}}>Sign Out</span>
                                        </li>
                                    </>
                                )}

                            </ul>
                            </li>

            </ul>
            <div className="d-flex align-items-center">
            <a href="https://anshulranjan.com" className="btn px-3 me-2 text-white">
            By Anshul Ranjan
            </a>
            </div>
            </div>
        </div>
        </nav>
    </div>
)

export default withRouter(Menu);