import React from 'react'

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className='navigation-items'>
        <NavigationItem url='/'>
            Builder
        </NavigationItem>
        <NavigationItem url='/my-orders'>
            Orders
        </NavigationItem>
    </ul>

)

export default navigationItems