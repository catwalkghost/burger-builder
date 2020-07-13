import * as actionTypes from './actionTypes'
import * as c from '../const'
import authApi from '../../api-auth'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: userData,
    }
}

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err,
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
                const { data } = resp
                console.log(resp)
                dispatch(authSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFailed(err))
            })
    }
}