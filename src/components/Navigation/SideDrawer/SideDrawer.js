import React from 'react'

import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={`side-drawer ${props.open ? 'open' : 'close'}`} onClick={props.closed}>
            <div className='logo-container'>
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.auth} />
            </nav>
        </div>
        </Aux>
    )


export default sideDrawer