import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className='toolbar'>
        <DrawerToggle clicked={props.onDrawerToggle} />
        <div className='logo-wrapper'>
            <Logo />
        </div>
        <nav className='desktop-only'>
        <NavigationItems isAuthenticated={props.auth} />
        </nav>
    </header>
)

export default toolbar