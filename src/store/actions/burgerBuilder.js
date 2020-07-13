import * as actionTypes from './actionTypes'
import api from '../../api-orders'

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            name: ingredientName,
        }
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            name: ingredientName,
        }
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ings: ingredients,
    }
}

const setError = () => {
    return {
        type: actionTypes.SET_ERROR
    }
}

export const initIngredients = () => {
    return dispatch => {
        api.get('/ingredients.json')
            .then(resp => {
                const { data } = resp
                dispatch(setIngredients(data))
            })
            .catch(err => {
                dispatch(setError)
            })
    }
}