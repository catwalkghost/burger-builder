import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Auth.css'

import * as actions from '../../store/actions'

import Aux from '../../hoc/Aux/Aux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },

        },
        formIsValid: false,
        signUp: true,
    }

    validate(value, rules) {
        let isValid = true

        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        // if (rules.isNumeric) {
        //     const pattern = /^\d+$/;
        //     isValid = pattern.test(value) && isValid
        // }

        return isValid
    }

    inputChangedHandler = (e, controlName) => {
        const { controls } = this.state
        const updatedControls = {
            ...controls,
            // Updates only ONE control
            [controlName]: {
                ...controls[controlName],
                value: e.target.value,
                valid: this.validate(
                    e.target.value,
                    controls[controlName].validation
                ),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (e) => {
        const { props: { onAuth }, state: { signUp, controls: { email, password } } } = this
        e.preventDefault()
        onAuth(email.value, password.value, signUp)

    }

    toggleModeHandler = () => {
        this.setState(prevState => {
            return {
                signUp: !prevState.signUp
            }
        })
    }

    render () {
        const { controls, signUp } = this.state
        const formElementsArray = []
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        const form = formElementsArray.map(formElement => {
            const { id, config: { elementType, elementConfig, value, valid, validation, touched } } = formElement
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
            )}
        )

        const title = signUp ? 'SIGN UP' : 'SIGN IN'

        return (
            <div className='auth'>
                <h3>{title}</h3>
                <form
                    onSubmit={this.submitHandler}
                    className='auth-form'>
                    {form}
                    <Button buttonType='success'>{title}</Button>
                </form>
                <hr />
                    <span>
                        {signUp
                            ? 'Already have an account? '
                            : 'Don\'t have an account? '
                        }
                    </span>
                    <Button
                        clicked={this.toggleModeHandler}>
                        {signUp
                        ? 'SIGN IN'
                        : 'SIGN UP'
                        }
                    </Button>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp)),
    }
}

export default connect(null, mapDispatchToProps)(Auth)
