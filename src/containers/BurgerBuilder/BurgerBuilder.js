import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as at from '../../store/actions'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Aux/Aux'
import api from '../../api-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

class BurgerBuilder extends Component {
    state = {
        loading: false,
        purchasing: false,
        error: false,
    }

    setPurchasable = () => {
        const { reduxIngredients } = this.props
        const ingredients = {
            ...reduxIngredients
        }

        // Will create a string of elements
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                // console.log(ingredients[ingredientKey])
                return ingredients[ingredientKey]
            })
            .reduce((currentSum, el) => {
                // element is the value accessed in the method above
                return currentSum + el
        }, 0)

        this.setState({
            purchasable: sum > 0 // because it returns bool
        })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchase = () => {
        this.setState({ purchasing: false })
    }

    // continuePurchase = () => {
    //
    //     const { props: { history, reduxPrice, reduxIngredients }, state: { ingredients, totalPrice } } = this
    //
    //     const queryParams = []
    //     for (let i in reduxIngredients) {
    //         queryParams.push(
    //             encodeURIComponent(i)
    //             + '='
    //             + encodeURIComponent(reduxIngredients[i])
    //         )
    //     }
    //     queryParams.push('price=' + reduxPrice)
    //     const queryString = queryParams.join('&')
    //
    //     history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString,
    //     })
    // }

    continuePurchase = () => {
        const { history } = this.props

        history.push('/checkout')
    }

    // componentDidMount () {
    //     api.get('/ingredients.json ')
    //         .then(resp => {
    //                 const { data } = resp
    //                 this.setState({ ingredients: data})
    //             }
    //         )
    //         .catch(err => {
    //             this.setState({error: true})
    //         })
    // }

    render () {
        const { purchasing, loading } = this.state
        const { reduxIngredients, reduxPrice } = this.props

        const disabledInfo = {
            ...reduxIngredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        if (reduxIngredients) {
            orderSummary = <OrderSummary
                ingredients={reduxIngredients}
                cancelled={this.cancelPurchase}
                continued={this.continuePurchase}
                price={reduxPrice} />
        }
        if (loading) {
            orderSummary = <Spinner />

        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (reduxIngredients) {
            burger = (
                <Aux>
                    <Burger ingredients={reduxIngredients} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.setPurchasable}
                        price={reduxPrice}
                        ordering={this.purchaseHandler}/>
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal show={purchasing} hide={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        reduxIngredients: state.ingredients,
        reduxPrice: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({
            type: at.ADD_INGREDIENT,
            payload: {
                name: ingName,
            }
        }),

        onRemoveIngredient: (ingName) => dispatch({
            type: at.REMOVE_INGREDIENT,
            payload: {
                name: ingName,
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, api))

