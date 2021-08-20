export const read = (userid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

}
export const remove = (userid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}
export const update = (userid, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};
export const updateuser = (user,next) =>{
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user.user;
            localStorage.setItem('jwt',JSON.stringify(auth));
            next();
        }
    }
}