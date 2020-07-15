import * as actionTypes from '../actions/actionTypes'

import * as u from '../../shared/utils'

const initialState = {
    ingredients: null,
    totalPrice: 0.99,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    salad:  0.99,
    cheese: 0.99,
    meat:   1.99,
    bacon:  1.99,
}

const addIngredient = (state, action) => {
    const updatedIngredientProps = {
        [action.payload.name]: state.ingredients[action.payload.name] + 1 // ES6 Syntax
    }
    const updatedIngredients = u.updateObject(state.ingredients, updatedIngredientProps)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.name],
        building: true,
    }
    return u.updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.payload.name]: state.ingredients[action.payload.name] - 1
    }

    const updatedIngredientsObj = u.updateObject(state.ingredients, updatedIngredient)
    const updatedStateObj = {
        ingredients: updatedIngredientsObj,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.name],
        building: true,
    }

    return u.updateObject(state, updatedStateObj)

    // Syntax without helper function updateObject
    // return {
    //     ...state,
    //     ingredients: {
    //         ...state.ingredients, // distributing old state to ensure immutability
    //         [action.payload.name]: state.ingredients[action.payload.name] - 1 // ES6 Syntax
    //     },
    //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.name]
    // }
}

const setIngredients = (state, action) => {
    const { salad, bacon, cheese, meat } = action.ings
    return {
        ...state,
        // ingredients: action.ings,
        // Set manual order for ingredients
        ingredients: {
            salad: salad,
            bacon: bacon,
            cheese: cheese,
            meat: meat,
        },
        totalPrice: 0.99,
        error: false, // in case of successful refetch
        building: false,
    }
}

const setError = (state, action) => {
    return {
        ...state,
        error: true,
    }
}

// Main reducer switch statement
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)

        case actionTypes.SET_ERROR:
            return setError(state, action)

        default:
            return state
    }
}

export default reducer