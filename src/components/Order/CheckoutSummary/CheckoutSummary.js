 import React from 'react'

 import './CheckoutSummary.css'

 import Burger from '../../Burger/Burger'
 import Button from '../../UI/Button/Button'

 const checkoutSummary = (props) => {
    return (
        <div className='checkout-summary'>
            <h1>It Will Taste Great!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.burgerIngredients} />
            </div>
            <Button
                buttonType='danger'
                clicked={props.checkoutCancelled}>
                Cancel
            </Button>
            <Button
                buttonType='success'
                clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    )
 }

 export default checkoutSummary

