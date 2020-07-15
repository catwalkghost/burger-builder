import React, { Component } from 'react'

import { connect } from 'react-redux'

import './ContactData.css'

import api from '../../../api-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../../store/actions'
import * as u from '../../../shared/utils'

class ContactData extends Component {

    state = {
        orderForm: {
           name: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Name',
               },
               value: '',
               validation: {
                   required: true,
               },
               valid: false,
               touched: false,
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Email',
               },
               value: '',
               validation: {
                   required: true,
               },
               valid: false,
               touched: false,
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Street Address',
               },
               value: '',
               validation: {
                   required: true,
               },
               valid: false,
               touched: false,
           },
           postCode: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Post Code',
               },
               value: '',
               validation: {
                   required: true,
                   minLength: 4,
                   maxLength: 9,
               },
               valid: false,
               touched: false,
           },
           country:  {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Country',
               },
               value: '',
               validation: {
                   required: true,
               },
               valid: false,
               touched: false,
           },
           deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'delivery', display: 'Deliver to Me' },
                        { value: 'pick-up', display: 'I\'ll pick up' }
                    ],
                },
                value: 'delivery', // select needs to have default set explicitly
                validation: {},
                valid: true,
           },
        },
        formIsValid: false,
    }

    orderHandler = (e) => {
        e.preventDefault()

        const {
            props: {
                reduxIngredients,
                reduxPrice,
                onOrderBurger,
                authToken,
                reduxUserId
            },
            state: {
                orderForm
            }
        } = this

        const formData = {}
        for (let formElId in orderForm ) {
            // Key-value pair. A new property is set and its value is set to be a value user entered
            formData[formElId] = orderForm[formElId].value
        }

        const order = {
            ingredients: reduxIngredients,
            price: reduxPrice,
            orderData: formData,
            userId: reduxUserId,
        }

        // see mapDispatchToProps
        onOrderBurger(order, authToken)
    }

    inputChangedHandler = (e, inputId) => {

        const { orderForm } = this.state

        const updatedFormEl = u.updateObject(orderForm[inputId], {
                value: e.target.value,
                valid: u.validate(e.target.value, orderForm[inputId].validation), // returns bool
                touched: true,
            })

        const updatedOrderForm = u.updateObject(orderForm, {
            [inputId]: updatedFormEl
        })

        let formIsValid = true
        for (let inputIds in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        })
    }

    render () {
        const { props: { reduxLoading }, state: {orderForm, formIsValid} } = this
        const formElementsArray = []
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        return (
            <div className='contact-data'>
                <h4>Enter Contact Details</h4>
                {!reduxLoading
                    ? (<form className='form' onSubmit={this.orderHandler}>
                        {
                            formElementsArray.map(formEl => {

                                const { id, config: { elementType, elementConfig, value, validation, valid, touched } } = formEl
                                return (
                                    <Input
                                        key={id}
                                        elementType={elementType}
                                        elementConfig={elementConfig}
                                        value={value}
                                        notValid={!valid}
                                        touched={touched}
                                        shouldValidate={validation}
                                        changed={(e) => this.inputChangedHandler(e, id)} />
                                )
                            })
                        }
                        <Button
                            buttonType='success'
                            clicked={this.orderHandler}
                            disabled={!formIsValid}>
                            Order
                        </Button>
                        </form>)
                    : <Spinner />}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        reduxPrice: state.burgerBuilder.totalPrice,
        reduxIngredients: state.burgerBuilder.ingredients,
        reduxLoading: state.orderState.loading,
        authToken: state.authReducer.token,
        reduxUserId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchasing(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, api))