import React from 'react'

import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className='build-controls'>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]} />
        ))}
        <button
            className='order-button'
            disabled={!props.purchasable}
            onClick={props.ordering} >
            {props.isAuth ? 'ORDER NOW' : 'LOG IN TO ORDER'}
        </button>
    </div>
)

export default buildControls