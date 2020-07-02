import React from 'react'

import './BuildControl.css'

const buildControl = (props) => (
    <div className='build-control'>
        <div className='label'>{props.label}</div>
        <button
            className='more'
            onClick={props.added}>
            Add
        </button>
        <button
            className='less'
            onClick={props.removed}
            disabled={props.disabled}>
            Remove
        </button>
    </div>
)

export default buildControl