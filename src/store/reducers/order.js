import * as actionTypes from '../actions/actionTypes'
import * as u from '../utils'

const initialState = {
    orders: [],
    loading: false,
    purchaseComplete: false,
}


const purchaseInit = (state, action) => {
    return u.updateObject(state, {purchaseComplete: false})
    // Syntax without updateObject helper:
    // return {
    //     ...state,
    //     purchaseComplete: false,
    // }
}

const purchaseStart = (state, action) => {
    return u.updateObject(state, {loading: true})
}

const purchaseSuccess = (state, action) => {
    const orderWithId = u.updateObject(action.data, {id: action.orderId})
    return u.updateObject(state, {
        loading: false,
        orders: state.orders.concat(orderWithId),
        purchaseComplete: true
    })

    // w/o updateObject

    // const orderWithId = {
    //     ...action.data,
    //     id: action.orderId,
    // }

    // return {
    //     ...state,
    //     loading: false,
    //     // concat returns a new array, so this can be done immutably
    //     orders: state.orders.concat(orderWithId),
    //     purchaseComplete: true,
    // }
}

const loadingFalse = (state, action) => {
    return u.updateObject(state, {loading: false})
}

const fetchOrdersSuccess = (state, action) => {
    return u.updateObject(state, {
        orders: action.orders,
        loading: false,
    })
}


// Main reducer, switch statement
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action)

        case actionTypes.PURCHASE_START:
            return purchaseStart(state, action)

        case actionTypes.PURCHASE_SUCCESS:
            return purchaseSuccess(state, action)

        case actionTypes.PURCHASE_FAILED:
            return loadingFalse(state, action)

        case actionTypes.FETCH_ORDERS_INIT:
            return loadingFalse(state, action)

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action)

        case actionTypes.FETCH_ORDERS_FAILED:
            return loadingFalse(state, action)

        default:
            return state
    }
}

export default orderReducer