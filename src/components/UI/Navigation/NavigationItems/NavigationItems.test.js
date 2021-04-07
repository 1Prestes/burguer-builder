import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('should return two public routes if not then authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should return three routes if then authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should return logout route if then authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    
    expect(
      wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
    ).toEqual(true)
  })
})
