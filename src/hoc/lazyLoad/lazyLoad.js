import React, {Component} from 'react'

const lazyLoad = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount(){
            importComponent()
                .then(cmp => {
                    this.setState({
                        component: cmp.default,
                    })
                })
        }

        render() {
            const { state: {component}, props } = this
            const Cmp = component

            return Cmp ? <Cmp {...props} /> : null
        }
    }
}

export default lazyLoad