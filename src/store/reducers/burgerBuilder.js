import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 0.99,
    error: false,
}

const INGREDIENT_PRICES = {
    salad:  0.99,
    cheese: 0.99,
    meat:   1.99,
    bacon:  1.99,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // distributing old state to ensure immutability
                    [action.payload.name]: state.ingredients[action.payload.name] + 1 // ES6 Syntax
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.name]
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // distributing old state to ensure immutability
                    [action.payload.name]: state.ingredients[action.payload.name] - 1 // ES6 Syntax
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.name]
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ings,
                error: false // in case of successful refetch
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: true,
            }

        default:
            return state
    }
}

export default reducer