import React, { Component } from 'react'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Aux/Aux'
import api from '../../api-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad:  0.99,
    cheese: 0.99,
    meat:   1.99,
    bacon:  1.99,

}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props)
    //
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        loading: false,
        totalPrice: 0.99,
        purchasable: false,
        purchasing: false,
        error: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.setPurchasable(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        } else {
            const updatedCount = oldCount - 1
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount
            const priceDeduction = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice - priceDeduction

            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            })

            this.setPurchasable(updatedIngredients)
        }

    }

    setPurchasable = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // }

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

    continuePurchase = () => {

        const { props: { history }, state: { ingredients, totalPrice } } = this

        const queryParams = []
        for (let i in ingredients) {
            queryParams.push(
                encodeURIComponent(i)
                + '='
                + encodeURIComponent(ingredients[i])
            )
        }
        queryParams.push('price=' + totalPrice)
        const queryString = queryParams.join('&')

        history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        })
    }

    componentDidMount () {
        api.get('/ingredients.json ')
            .then(resp => {
                    const { data } = resp
                    this.setState({ ingredients: data})
                }
            )
            .catch(err => {
                this.setState({error: true})
            })
    }

    render () {
        const { ingredients, totalPrice, purchasing, purchasable, loading } = this.state
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={ingredients}
                cancelled={this.cancelPurchase}
                continued={this.continuePurchase}
                price={totalPrice} />
        }
        if (loading) {
            orderSummary = <Spinner />

        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={purchasable}
                        price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, api)

