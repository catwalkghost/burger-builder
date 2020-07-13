import React from 'react'

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className='navigation-items'>
        <NavigationItem url='/' exact >
            Builder
        </NavigationItem>
        <NavigationItem url='/my-orders'>
            Orders
        </NavigationItem>
        <NavigationItem url='/auth'>
            Log In
        </NavigationItem>
    </ul>

)

export default navigationItems