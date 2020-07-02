import React, {Component} from 'react'

import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, apiInstance) => {
    return class extends Component {

        constructor(props) {
            super(props)

            this.state = {
                error: null,
            }

            // Using constructor instead of ComponentWillMount
            // apiInstance.interceptors.request.use( req => {
            //     this.state = { error: null}
            //     return req
            // })
            //
            // apiInstance.interceptors.response.use( res => res,
            //     err => {
            //     this.state = { error: err }
            // })

        }

        componentWillMount() {
            this.reqInterceptor = apiInstance.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })

           this.respInterceptor = apiInstance.interceptors.response.use(res => res,
                err => {
                    this.setState({ error: err })
                })
        }

        componentWillUnmount () {
            // console.log('Will Unmount', this.reqInterceptor, this.respInterceptor)
            apiInstance.interceptors.request.eject(this.reqInterceptor)
            apiInstance.interceptors.response.eject(this.respInterceptor)
        }

        clearError = () => {
            this.setState({error: null })
        }

            render() {
                const { props, state: {error} } = this
                return (
                    <Aux>
                        <Modal show={error} hide={this.clearError}>
                            <h3>Something went wrong!</h3>
                            {error ? <p>{error.message}</p> : null}
                        </Modal>
                        <WrappedComponent {...props} />
                    </Aux>
                )
            }
        }
    }

export default withErrorHandler