import React from 'react'

import burgerLogo from '../../assets/images/logo.png'
import './Logo.css'

const logo = (props) => (
    <div className='logo'>
        <img src={burgerLogo} alt='Build Yer Burger'/>
    </div>
)

export default logo