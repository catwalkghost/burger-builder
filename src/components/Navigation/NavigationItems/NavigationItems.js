import React from 'react'

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className='navigation-items'>
        <NavigationItem url='/' exact >Builder</NavigationItem>
        { props.isAuthenticated
            ? <NavigationItem url='/my-orders'>Orders</NavigationItem>
            : null }
        { !props.isAuthenticated
            ? <NavigationItem url='/auth'>Log In</NavigationItem>
            : <NavigationItem url='/logout'>Logout</NavigationItem> }
    </ul>
)

export default navigationItems