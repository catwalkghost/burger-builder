import React, { Component } from 'react'

import api from '../../api-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        api.get('orders.json')
            .then(resp => {
                const { data } = resp
                // Converting object to array
                const fetchedOrders = []
                for (let key in data) {
                    fetchedOrders.push({
                        // using spread operator so a new parameter (id) can be added
                        ...data[key],
                        id: key,
                    })
                }
                console.log(fetchedOrders)
                this.setState({
                    orders: fetchedOrders,
                    loading: false,
                })
                console.log(data)
            })
            .catch(err => {
                this.setState({
                    loading: false,
                })
            })
    }

    render () {
        const { orders } = this.state
        return (
            <div>
                {orders.map(
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
}

export default withErrorHandler(Orders, api)