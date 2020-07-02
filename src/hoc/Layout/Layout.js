import React, {Component} from 'react'

import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import './Layout.css'

class Layout extends Component {

    state = {
        show: false,
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {show: !prevState.show }
        })
    }

    drawerCloseHandler = () => {
        this.setState({ show: false })
    }

    render() {
        return (
            <Aux>
                <Toolbar onDrawerToggle={this.sideDrawerToggle}/>
                <SideDrawer
                    open={this.state.show}
                    closed={this.drawerCloseHandler} />
                <main className='content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout