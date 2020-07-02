import React from 'react'
import './NavigationItem.css'

const navigationItem = (props) => (
    <li className='navigation-item'>
        <a
            className={`${props.active ? 'active' : null}`}
            href={props.url}>
            {props.children}
        </a>
    </li>
)

export default navigationItem