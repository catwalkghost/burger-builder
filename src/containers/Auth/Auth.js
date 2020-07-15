import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Auth.css'

import * as actions from '../../store/actions'
import * as u from '../../shared/utils'

import Spinner from '../../components/UI/Spinner/Spinner'
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

    inputChangedHandler = (e, controlName) => {
        const { controls } = this.state
        // const updatedControls = {
        //     ...controls,
        //     // Updates only ONE control
        //     [controlName]: {
        //         ...controls[controlName],
        //         value: e.target.value,
        //         valid: this.validate(
        //             e.target.value,
        //             controls[controlName].validation
        //         ),
        //         touched: true
        //     }
        // }

        const updatedControls = u.updateObject(controls, {
            [controlName]: u.updateObject(controls[controlName], {
                value: e.target.value,
                valid: u.validate(
                    e.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            })
        })

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

    componentDidMount() {
        // Check before redirect
        const { reduxBuilding, reduxAuthRedirect, onSetAuthRedirectPath } = this.props

        if ( !reduxBuilding && reduxAuthRedirect !== '/') {
            onSetAuthRedirectPath() // The path is already hardcoded
        }

    }

    render () {
        const {
            state: {
                controls,
                signUp
            },
            props: {
                reduxAuthRedirect,
                reduxIsAuthed,
                reduxError,
                reduxLoading
            }
        } = this

        const formElementsArray = []
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
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

        if (reduxLoading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (reduxError) {
            errorMessage = (
                <p>{reduxError.message}</p>
            )
        }

        const title = signUp ? 'SIGN UP' : 'SIGN IN'

        let authRedirect = null
        if (reduxIsAuthed) {
            authRedirect = <Redirect to={reduxAuthRedirect} />
        }

        return (
            <div className='auth'>
                {authRedirect}
                <h3>{title}</h3>
                <form
                    onSubmit={this.submitHandler}
                    className='auth-form'>
                    {form}
                    <Button buttonType='success'>{title}</Button>
                </form>
                {/* TODO: Legible error messages */}
                {errorMessage}
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

const mapStateToProps = state => {
    return {
        reduxLoading: state.authReducer.loading,
        reduxError: state.authReducer.error,
        reduxIsAuthed: state.authReducer.token !== null,
        reduxBuilding: state.burgerBuilder.building,
        reduxAuthRedirect: state.authReducer.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
