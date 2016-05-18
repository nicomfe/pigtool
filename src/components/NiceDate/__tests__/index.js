import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import expectJSX from 'expect-jsx'

import NiceDate from '../index'

expect.extend(expectJSX)
describe('[Component] - NiceDate', () => {
  it('Passing no date should display empty text', () => {
    const wrapper = shallow(<NiceDate />)
    expect(wrapper.text()).toBe('')
  })

  it('Passing a date with no format should formatted to dd/mm/yyyy', () => {
    const date = '2016-05-18'
    const wrapper = shallow(<NiceDate date={date} />)
    expect(wrapper.text()).toBe('18/05/2016')
  })

  it('Passing a date with format should render date with format applied', () => {
    const date = '2016-05-18'
    const wrapper = shallow(<NiceDate date={date} format="DD-MM-YYYY" />)
    expect(wrapper.text()).toBe('18-05-2016')
  })
})
