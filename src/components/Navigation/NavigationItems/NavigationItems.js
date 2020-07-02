import React from 'react'

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className='navigation-items'>
        <NavigationItem url='/' active>
            Builder
        </NavigationItem>
        <NavigationItem url='/'>
            Checkout
        </NavigationItem>
    </ul>

)

export default navigationItems