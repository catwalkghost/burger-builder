import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    // Temp dummy state to fill ingredients
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    checkoutCancelledHandler = () => {
        const { history } = this.props
        history.goBack()
    }

    checkoutContinuedHandler = () => {
        const { history } = this.props
        history.replace('/checkout/contact-data')
    }

    componentWillMount() {
        const { location } = this.props
        const query = new URLSearchParams(location.search)
        const burgerIngredients = {}
        let price = 0
        for (let param of query.entries()) {
            // ['salad' : 1]
            if (param[0] === 'price') {
                price = param[1]
            } else {
                burgerIngredients[param[0]] = +param[1]
            }

        }
        this.setState({
            ingredients: burgerIngredients,
            totalPrice: price,
        })
    }

    render () {
        const {
            props: {
                match
            },
            state: {
                ingredients,
                totalPrice
            }
        } = this

        return (
            <div>
                <CheckoutSummary
                    burgerIngredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={match.url + '/contact-data'}
                    // component={ContactData}
                    render={(props) => (
                        <ContactData
                        ingredients={ingredients}
                        price={totalPrice}
                        {...props} />
                    )} />
            </div>
        )
    }
}

export default Checkout