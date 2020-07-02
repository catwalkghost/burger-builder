import React, {Component} from 'react'

import './Modal.css'

import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

export default class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate() {
        console.log('[Modal] will update')
    }

    render(){
        const { show, hide, children } = this.props

        return(
            <Aux>
                <Backdrop show={show} clicked={hide} />
                <div className={`modal ${show ? 'modal-show' : 'modal-hide'}`}>
                    {children}
                </div>
            </Aux>
        )
    }
}

