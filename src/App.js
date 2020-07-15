import React, {Component} from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'

import * as actions from './store/actions'

import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import LogOut from './containers/Auth/Logout/Logout'

class App extends Component {

    componentDidMount() {
        const { onRestoreSession } = this.props
        onRestoreSession()
    }

    render () {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/my-orders' component={Orders} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/logout' component={LogOut} />
                        <Route path='/' exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestoreSession: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
