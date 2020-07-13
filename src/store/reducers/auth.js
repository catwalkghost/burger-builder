import * as actionTypes from './../actions/actionTypes'
import * as u from '../utils'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const authStart = (state, action) => {
    return u.updateObject(state,{
        error: null,
        loading: true,
    })
}

const authSuccess = (state, action) => {
    return u.updateObject(state, {
        token: action.authToken,
        userId: action.userId,
        error: null,
        loading: false,
    })
}

const authFailed = (state, action) => {
    return u.updateObject(state, {
        error: action.error,
        loading: false,
    })
}
const authLogOut = (state, action) => {
    return u.updateObject(state, {
        token: null,
        userId: null,
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.AUTH_LOG_OUT:
            return authLogOut(state, action)
        default:
            return state
    }
}

export default reducer