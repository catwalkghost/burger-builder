import React, { Component } from 'react'

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
                   value: '',
               }
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Email',
                   value: '',
               }
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Street Address',
                   value: '',
               }
           },
           postCode: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Post Code',
                   value: '',
               }
           },
           country:  {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Name',
                   value: '',
               }
           },
           deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'delivery', display: 'Deliver to Me' },
                        { value: 'pick-up', display: 'I\'ll pick up' }
                    ],
                },
                value: '',
           },
        },
        loading: false,
    }

    orderHandler = (e) => {
        e.preventDefault()

        const { ingredients, price, history } = this.props
        this.setState({
            loading: true,
        })
        // alert('Checkout')
        const order = {
            ingredients,
            price: price,

            delivery: 'ASAP'
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
        console.log(ingredients)
    }

    inputChangedHandler = (e, inputId) => {
        const { orderForm } = this.state
        console.log(e.target.value)
        const updatedOrderForm = {
            ...orderForm
        }
        // Creating a clone so the state is not mutated
        const updatedFormEl = {
            ...updatedOrderForm[inputId]
        }
        updatedFormEl.value = e.target.value
        updatedOrderForm[inputId] = updatedFormEl

        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render () {
        const { orderForm, loading } = this.state
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
                    ? (<form style={{ width: '100%', boxSizing: 'border-box', position: 'relative', display: 'block' }}>
                        {
                            formElementsArray.map(formEl => {
                                const { id, config: { elementType, elementConfig, value } } = formEl
                                return (
                                    <Input
                                        key={id}
                                        elementType={elementType}
                                        elementConfig={elementConfig}
                                        value={value}
                                        changed={() => this.inputChangedHandler(id)} />
                                )
                            })
                        }
                        <Button
                            buttonType='success'
                            clicked={this.orderHandler}>
                            Order
                        </Button>
                        </form>)
                    : <Spinner />}
            </div>
        )
    }

}

export default ContactData