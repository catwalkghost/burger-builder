import * as actionTypes from './actionTypes'
import * as c from '../const'

import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authToken: token,
        userId: id,
    }
}

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err,
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
     return {
         type: actionTypes.AUTH_LOG_OUT
     }
}

export const checkAuthTimeOut = (expiresIn) => {
    const timeOut = expiresIn * 1000
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, timeOut)
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        redirectUrl: path
    }
}

export const authCheckState = () => {
    return dispatch => { // No Async code, but multiple actions are dispatched
        const token = localStorage.getItem('token')
        if (!token) {
           dispatch(logOut())
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'))
            const localId = localStorage.getItem('userId')

            if (expiryDate > new Date()){

                const timeOutInSeconds = (expiryDate.getTime() - new Date().getTime()) / 1000

                // This can be simply fetched from localStorage,
                // but for security reasons it's better to make a request to Firebase
                // Use a refresh token is also an option
                dispatch(authSuccess(token, localId))
                dispatch(checkAuthTimeOut(timeOutInSeconds))
            } else {
                dispatch(logOut())
            }

        }

    }
}

export const authenticate = (email, password, isSignUp) => {
    // Thunk
    return dispatch => {
        // Authenticate da user
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = c.SIGN_UP_URL
        if (!isSignUp) {
            url = c.SIGN_IN_URL
        }
        axios.post(url, authData)
            .then(resp => {
                const { data: { idToken, localId, expiresIn } } = resp
                const expiryDate = new Date(new Date().getTime() + expiresIn * 1000)

                localStorage.setItem('token', idToken) // 1st arg: key, 2nd arg: value
                localStorage.setItem('expiryDate', expiryDate) // 1st arg: key, 2nd arg: value
                localStorage.setItem('userId', localId)

                dispatch(authSuccess(idToken, localId))
                dispatch(checkAuthTimeOut(expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error))
            })
    }
}