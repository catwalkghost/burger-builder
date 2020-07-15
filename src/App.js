import React, {Component} from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import lazyLoad from './hoc/lazyLoad/lazyLoad'
import Layout from './hoc/Layout/Layout'

import * as actions from './store/actions'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import LogOut from './containers/Auth/Logout/Logout'

const lazyLoadAuth = lazyLoad(() => {
    return import('./containers/Auth/Auth')
})

const lazyLoadCheckout = lazyLoad(() => {
    return import('./containers/Checkout/Checkout')
})

const lazyLoadOrders = lazyLoad(() => {
    return import('./containers/Orders/Orders')
})


class App extends Component {

    componentDidMount() {
        const { onRestoreSession } = this.props
        onRestoreSession()
    }

    render () {

        const { reduxIsAuthed } = this.props

        let routes = (
            <Switch>
                <Route path='/auth' component={lazyLoadAuth} />
                <Route path='/' exact component={BurgerBuilder} />
                {/* redirect for unknown pages */}
                <Redirect to='/' />
            </Switch>
        )

        if (reduxIsAuthed) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={lazyLoadCheckout} />
                    <Route path='/my-orders' component={lazyLoadOrders} />
                    <Route path='/logout' component={LogOut} />
                    <Route path='/auth' component={lazyLoadAuth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    {/* redirect for unknown pages */}
                    <Redirect to='/' />
                </Switch>
            )
        }
        
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
     return {
         reduxIsAuthed: state.authReducer.token !== null,
     }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestoreSession: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
