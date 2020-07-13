import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'

import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

class App extends Component {

    // For debugging
    // state = {
    //     show: true,
    // }

    // componentDidMount () {
    //     setTimeout(() => {
    //         this.setState({
    //             show: false
    //         })
    //     }, 5000)
    // }

    render () {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/my-orders' component={Orders} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/' exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default App;
