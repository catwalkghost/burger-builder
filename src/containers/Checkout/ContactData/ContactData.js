import React, { Component } from 'react'

import { connect } from 'react-redux'

import './ContactData.css'

import api from '../../../api-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
                value: 'delivery',
                validation: {},
                // validation: {
                //     required: true,
                // },
                valid: true,
           },
        },
        loading: false,
        formIsValid: false,
    }

    orderHandler = (e) => {
        e.preventDefault()

        const { props: { reduxIngredients, reduxPrice, history }, state: { orderForm } } = this

        const formData = {}
        for (let formElId in orderForm ) {
            // Key-value pair. A new property is set and its value is set to be a value user entered
            formData[formElId] = orderForm[formElId].value
        }

        this.setState({
            loading: true,
        })
        // alert('Checkout')
        const order = {
            ingredients: reduxIngredients,
            price: reduxPrice,
            orderData: formData,
        }
        api.post('/orders.json', order)
            .then(resp => {
                // console.log(resp)
                this.setState({loading: false })
                history.push('/')
            })
            .catch(err => {
                console.log(err)
                this.setState({loading: false })
            })
        // console.log(ingredients)
    }

    inputChangedHandler = (e, inputId) => {

        // console.log(e.target.value)
        const { orderForm } = this.state

        // Creating a clone so the state is not mutated
        const updatedOrderForm = {
            ...orderForm
        }
        // Creating a clone so the state is not mutated
        const updatedFormEl = {
            ...updatedOrderForm[inputId]
        }
        updatedFormEl.value = e.target.value
        // Checking validity
        updatedFormEl.valid = this.validate(updatedFormEl.value, updatedFormEl.validation) // returns bool

        updatedFormEl.touched = true
        updatedOrderForm[inputId] = updatedFormEl

        let formIsValid = true
        for (let inputIds in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        })
    }

    validate = (value, rules) => {
        // needed so all validation rules are checked
        let isValid = true

        // returns true if no validation rules are defined
        if (!rules) {
            return true
        }

        if (rules.required ) {
            // Checks if not an empty string
             isValid = value.trim() !== '' &&isValid
        }

        if (rules.minLength) {
            // Checks min length
            isValid = value.length >= rules.minLength &&isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength &&isValid
        }

        return isValid
    }

    render () {
        const { orderForm, loading, formIsValid } = this.state
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
                {!loading
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
        reduxPrice: state.totalPrice,
        reduxIngredients: state.ingredients,
    }
}

export default connect(mapStateToProps)(ContactData)