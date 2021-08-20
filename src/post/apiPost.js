export const create = (userid, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userid}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};
export const list = page => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

};
export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

};

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            'Content-Type':"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

};
export const remove = (postId, token) => {
    console.log(postId, token);
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
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
};
export const update = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};
export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};