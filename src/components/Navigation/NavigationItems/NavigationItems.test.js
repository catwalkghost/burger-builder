import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() }) // Enzyme connected

describe('NavigationItems', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    const authOnly = wrapper => {
        wrapper.setProps({
            isAuthenticated: true,
        })
    }

    it('should render 2x Nav Items if not authed', () => {
        expect(wrapper.find(NavigationItem)) // Not JSX: normal imported function
            .toHaveLength(2) // Find two elements
    })

    it('should render 3x Nav Items if authed', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />)

        authOnly(wrapper)

        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render a LogOut Nav Item', () => {

        authOnly(wrapper)

        expect(wrapper.contains(<NavigationItem url='/logout'>Logout</NavigationItem>))
            .toEqual(true)
    })
})