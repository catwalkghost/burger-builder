import React from 'react'
// named import to bypass redux and HoC
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

describe('BurgerBuilder', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    })

    const hasIngredients = wrapper => {
        wrapper.setProps({
            reduxIngredients: {
                salad: 0,
            }
        })
    }

    it('should render Build Controls when receiving ingredients as props', () => {
        hasIngredients(wrapper)
        expect(wrapper.find(BuildControls)).toHaveLength(1)

    })
})