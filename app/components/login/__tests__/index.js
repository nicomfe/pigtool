import React from 'react'
import expect from 'expect'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import Button from 'react-toolbox/lib/button'

import Login from '../index'

describe('[Component] - Login', () => {
  it('Click on login should call handleLogin', () => {
    const handleClick = sinon.spy()
    const handleChange = sinon.spy()
    const wrapper = shallow(<Login handleLogin={handleClick} handleChange={handleChange} />)
    expect(handleClick.called).toBe(false)
    wrapper.find(Button).simulate('click')
    expect(handleClick.called).toBe(true)
    expect(handleChange.called).toBe(false)
  })
})
