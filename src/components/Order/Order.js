import React from 'react'

import './Order.css'

const order = (props) => {
    const { ingredients, price } = props
    const priceConverted = +price
    const priceFormatted = priceConverted.toFixed(2)
    // or use:
    // Number.parseFloat(price).toFixed(2)

    const ingredientsConverted = []
        for (let ingredientName in ingredients ) {
            ingredientsConverted.push({name: ingredientName, amount: ingredients[ingredientName]})
        }
        console.log(ingredientsConverted)

    const ingredientsFormatted =
        ingredientsConverted.map(
            ingredient => {
                const { name, amount } = ingredient
                return (
                    <li key={name} className={`order-item  ${amount > 0 ? 'order-item-highlighted' : ''}`}>
                        {name}: {amount}
                    </li>
                )
            }
        )

    return (
        <div className='order'>
            <h4>Ingredients:</h4>
            <ul className='order-items'>{ingredientsFormatted}</ul>
            <p>Price: <strong>USD {priceFormatted}</strong></p>
        </div>
    )
}

export default order