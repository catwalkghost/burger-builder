import React, {Component} from 'react'
import { connect } from 'react-redux'

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
        const { props: { children, isAuthed }, state: { show } } = this

        return (
            <Aux>
                <Toolbar
                    auth={isAuthed}
                    onDrawerToggle={this.sideDrawerToggle} />
                <SideDrawer
                    auth={isAuthed}
                    open={show}
                    closed={this.drawerCloseHandler} />
                <main className='content'>
                    {children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.authReducer.token !== null,
    }
}

export default connect(mapStateToProps)(Layout)