import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
        const { ingredients, cancelled, continued, price } = props

        const ingredientSummary =
            Object.keys(ingredients)
                .map(ingredientKey => {
                    return (
                        <li key={ingredientKey}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {ingredientKey}
                        </span>: {ingredients[ingredientKey]}
                        </li>
                    )
                })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={cancelled} buttonType='danger'>Cancel</Button>
                <Button clicked={continued} buttonType='success'>Continue</Button>
            </Aux>
        )
}

export default orderSummary