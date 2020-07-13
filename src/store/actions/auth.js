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
                console.log(resp)
                dispatch(authSuccess(idToken, localId))
                dispatch(checkAuthTimeOut(expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFailed(err.response.data.error))
            })
    }
}