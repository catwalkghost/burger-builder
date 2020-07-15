import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() }) // Enzyme connected

describe('NavigationItems', () => {
    it('should render two nav item elements if not authed', () => {
        const wrapper = shallow(<NavigationItems />) // passing comp as JSX
        expect(wrapper.find(NavigationItem)) // Not JSX: normal imported function
            .toHaveLength(2) // Find two elements
    })
})