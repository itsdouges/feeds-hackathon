'use strict';

import * as types from './types';
import Firebase from 'firebase';

const loginRef = new Firebase('https://feedshackathon.firebaseio.com');

export function checkAuth() {
    return dispatch => {
        let authData = loginRef.getAuth();
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            console.log(authData);
            dispatch(loginComplete(null, authData));
        } else {
            console.log("User is logged out");
            dispatch(loginComplete());
        }
    }
}
export function login() {
    return dispatch => {
        loginRef.authWithOAuthPopup('google', function(error, authData) {
            if (error) {
                dispatch(loginComplete(error, null));
            } else {
                dispatch(loginComplete(null, authData));
                console.log('Authenticated successfully with payload:', authData);
            }
        });
    }
}

export function logout() {
    return dispatch => {
        loginRef.unauth();
        dispatch(logoutComplete());
    }
}

function loginComplete(error, authData) {
    return {
        type: types.LOGIN,
        error: error,
        authData: authData
    };
}

function logoutComplete() {
    return {
        type: types.LOGOUT,
        authData: null
    }
}
