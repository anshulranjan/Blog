import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './core/Home';
import Menu from "./core/Menu";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Users from "./users/Users";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import EditProfile from "./users/EditProfile";
import Profile from "./users/Profile";
import NewPost from "./post/NewPost";
import PrivateRoute from "./auth/PrivateRoute";
import Posts from "./post/Posts";
const MainRouter = () => (
    <div>
        <Menu></Menu>
        <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route exact path="/signin" component = {Login}></Route>
            <Route exact path="/signup" component = {Register}></Route>
            <Route exact path="/users" component = {Users}></Route>
            <Route exact path="/posts" component = {Posts}></Route>
            <Route exact path="/post/:postId" component = {SinglePost}></Route>
            <PrivateRoute exact path="/user/:userId" component = {Profile}></PrivateRoute>
            <PrivateRoute exact path="/user/edit/:userId" component = {EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/create/post" component = {NewPost}></PrivateRoute>
            <PrivateRoute exact path="/post/edit/:postId" component = {EditPost}></PrivateRoute>
        </Switch>
    </div>
);
export default MainRouter;
