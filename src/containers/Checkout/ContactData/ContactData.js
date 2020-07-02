import React, { Component } from 'react'

import './ContactData.css'

import api from '../../../api-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: '',
        },
        phone: '',
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
            customer: {
                name: 'Alice DeVille',
                address: {
                    street: '32B Berriman Road',
                    postCode: 'N4 3LB',
                    country: 'UK'
                },
                email: 'test@test.com'
            },
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

    render () {
        return (
            <div className='contact-data'>
                <h4>Enter Contact Details</h4>
                {!this.state.loading
                    ? (<form>
                        <input type='text' className='input' name='name' placeholder='Name' />
                        <input type='email' className='input' name='email' placeholder='Email' />
                        <input type='tel' className='input' name='phone' placeholder='Phone Number' />
                        <input type='text' className='input' name='street-address' placeholder='Street Address' />
                        <input type='text' className='input' name='post-code' placeholder='Post Code' />
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