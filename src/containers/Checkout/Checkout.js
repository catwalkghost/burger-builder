import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        const { history } = this.props
        history.goBack()
    }

    checkoutContinuedHandler = () => {
        const { history } = this.props
        history.replace('/checkout/contact-data')
    }

    render () {
        const {reduxIngredients, match, isComplete } = this.props

        let summary = <Redirect to='/'/>

        if (reduxIngredients) {
            const onSuccessRedirect =
                isComplete ? <Redirect to='/' /> : null

            summary = (
                <div>
                    {onSuccessRedirect}
                    <CheckoutSummary
                        burgerIngredients={reduxIngredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>

                    <Route
                        path={match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            )

        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        reduxIngredients: state.burgerBuilder.ingredients,
        isComplete: state.orderState.purchaseComplete,
    }
}

export default connect(mapStateToProps)(Checkout)