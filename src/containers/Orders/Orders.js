import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'

import api from '../../api-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        const { onFetchOrders, authToken, reduxUserId } = this.props
        onFetchOrders(authToken, reduxUserId)
    }

    render () {
        const { reduxOrders, reduxLoading } = this.props

        let ordersSummary = <Spinner />
        if (!reduxLoading) {
            ordersSummary = (
                <div>
                    {reduxOrders.map(
                        order => {
                            const {id, ingredients, price} = order
                            return (
                                <Order
                                    key={id}
                                    ingredients={ingredients}
                                    price={price} />
                            )
                        }
                    )}
                </div>
            )
        }

        return ordersSummary
    }
}

const mapStateToProps = state => {
    return {
        reduxOrders: state.orderState.orders,
        reduxLoading: state.orderState.loading,
        authToken: state.authReducer.token,
        reduxUserId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, api))