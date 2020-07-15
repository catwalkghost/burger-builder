import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/'

import api from '../../api-orders'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

class BurgerBuilder extends Component {
    state = {
        loading: false,
        purchasing: false,
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
        const { onSetAuthRedirectPath, reduxIsAuthed, history } = this.props
        if (reduxIsAuthed) {
            this.setState({ purchasing: true })
        } else {
            onSetAuthRedirectPath('/checkout')
            history.push('/auth')
        }
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
        const { onInitPurchase, history } = this.props
         onInitPurchase()
        history.push('/checkout')
    }

    componentDidMount () {
        // api.get('/ingredients.json ')
        //     .then(resp => {
        //             const { data } = resp
        //             this.setState({ ingredients: data})
        //         }
        //     )
        //     .catch(err => {
        //         this.setState({error: true})
        //     })
        const { onInitIngredients } = this.props

        onInitIngredients()
    }

    render () {
        const {
            props: {
                reduxIsAuthed,
                reduxIngredients,
                reduxPrice,
                onAddIngredient,
                onRemoveIngredient,
                error
            },
            state: {
                purchasing,
                loading
            }
        } = this

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

        let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (reduxIngredients) {
            burger = (
                <Aux>
                    <Burger ingredients={reduxIngredients} />
                    <BuildControls
                        isAuth={reduxIsAuthed}
                        ingredientAdded={onAddIngredient}
                        ingredientRemoved={onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.setPurchasable}
                        price={reduxPrice}
                        ordering={this.purchaseHandler} />
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
        reduxIngredients: state.burgerBuilder.ingredients,
        reduxPrice: state.burgerBuilder.totalPrice,
        reduxError: state.burgerBuilder.error,
        reduxIsAuthed: state.authReducer.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

// Without action creators
// const mapDispatchToProps = dispatch => {
//     return {
//         onAddIngredient: (ingName) => dispatch({
//             type: actionTypes.ADD_INGREDIENT,
//             payload: {
//                 name: ingName,
//             }
//         }),
//
//         onRemoveIngredient: (ingName) => dispatch({
//             type: actionTypes.REMOVE_INGREDIENT,
//             payload: {
//                 name: ingName,
//             }
//         })
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, api))

