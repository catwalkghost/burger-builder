import * as actionTypes from './actionTypes'
import api from '../../api-orders'

export const purchaseInit = () => {
     return {
         type: actionTypes.PURCHASE_INIT,
     }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START,
    }
}

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        data: orderData,
    }
}

export const purchaseFailed = (err) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: err,
    }
}

// Async using Thunk. Instead of setState use dispatch(actionCreator(args))
export const purchasing = (orderData, token) => {
    return dispatch => {

        // needs to be dispatched to the store, since loading is set there
        dispatch(purchaseStart())

        api.post('/orders.json?auth=' + token, orderData)
            .then(resp => {
                const { data } = resp
                console.log(data)
                // id is stored in the name prop of response data!
                dispatch(purchaseSuccess(data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseFailed(err))
            })
    }
}

// Fetching and displaying orders
export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders,
    }
}

export const fetchOrdersFailed = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: err,
    }
}

// Using Thunk again. Instead of setState use dispatch(actionCreator(args))
export const fetchOrders = (token, userId) => {

    return dispatch => {
        dispatch(fetchOrdersInit()) // To show the spinner

        const queryParams =
            '?auth='
            + token
            + '&orderBy="userId"&equalTo="'
            + userId // getState() can also be used here
            + '"'

        api.get('/orders.json' + queryParams)
            .then(resp => {
                const { data } = resp
                // Converting an object to an array
                const fetchedOrders = []
                for (let key in data) {
                    fetchedOrders.push({
                        // using spread operator so a new parameter (id) can be added
                        ...data[key],
                        id: key,
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            })
    }
}
