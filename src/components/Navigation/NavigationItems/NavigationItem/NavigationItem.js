import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationItem.css'

const navigationItem = (props) => (
    <li className='navigation-item'>
        <NavLink
            activeClassName='active'
            exact
            // className={`${props.active ? 'active' : null}`}
            to={props.url}>
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem