import React from 'react'
import { withRouter } from 'react-router-dom'

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // Converting an object into an array
    let burgerIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
                .map((_, i) => {
                   return <BurgerIngredient key={ingredientKey + 1} type={ingredientKey} />
                })
        })
        // Flatten the array
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    if( burgerIngredients.length === 0) {
        burgerIngredients = <p>Please add ingredients</p>
    }

    console.log(burgerIngredients)
    return (
        <div className='burger'>
            <BurgerIngredient type='bread-top' />
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default withRouter(burger)