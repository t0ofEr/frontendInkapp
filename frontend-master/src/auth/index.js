import { API } from '../config';

 export const singup = user => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json'
        },
        body: user
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
};

export const singin = user => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        sessionStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const singout = (next) => {
    if(typeof window !== 'undefined') {
        sessionStorage.removeItem('jwt');
        next();
        return fetch(`${API}/deslogeo`, {
            method: "GET",
        })
        .then( response => {
            console.log('deslogeo', response);
        })
        .catch( err => {
            return err;
        });
    }
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if(sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"));
    } else{
        return false;
    }
};
