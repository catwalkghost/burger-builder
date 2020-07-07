import * as at from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 0.99,
}

const INGREDIENT_PRICES = {
    salad:  0.99,
    cheese: 0.99,
    meat:   1.99,
    bacon:  1.99,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case at.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // distributing old state to ensure immutability
                    [action.payload.name]: state.ingredients[action.payload.name] + 1 // ES6 Syntax
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.name]
            }

        case at.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // distributing old state to ensure immutability
                    [action.payload.name]: state.ingredients[action.payload.name] - 1 // ES6 Syntax
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.name]
            }

        default:
            return state
    }
}

export default reducer