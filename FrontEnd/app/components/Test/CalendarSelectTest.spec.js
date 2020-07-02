import React from 'react'
import { create } from 'react-test-renderer'
import Calendar from 'react-calendar'
import CalendarSelect from '../CalendarSelect'

/**
 * Test Cases for the component CalendarSelectTest.js
 * Contains three tests (expects an array for return value):
 * 1. select same dates today
 * 2. select same dates non-today
 * 3. select different dates
 * Assumptions: onChange takes in an array of length 2
 * sorted chronologically (done by library).
 * Caveats: Even though all testcases were passed, there
 * are warnings like "Warning: Failed prop type:
 * Invalid prop `value` supplied to `Calendar`"
 *
 * The reason for it is still unclear since this test only
 * contains Array(len == 2) of Date objects.
 *
 */

describe('Check if two dates are updated correctly', () => {
  test('Same Dates Today', () => {
    const date1 = new Date()
    const date2 = new Date()
    const dayRange = [date1, date2]
    const component = create(<CalendarSelect />)
    const instance = component.root
    const calendar = instance.findByType(Calendar)
    calendar.props.onChange(dayRange)
    expect(calendar.props.value).toBe(dayRange)
  })
})

describe('Check random two dates', () => {
  test('Random Dates', () => {
    const date1 = Date.parse('04 Dec 1995 00:12:00 GMT')
    const date2 = Date.parse('04 Dec 2020 00:12:00 GMT')
    const dayRange = [date1, date2]
    const component = create(<CalendarSelect />)
    const instance = component.root
    const calendar = instance.findByType(Calendar)
    calendar.props.onChange(dayRange)
    expect(calendar.props.value).toBe(dayRange)
  })
})

describe('Check if two dates are updated correctly', () => {
  test('Same Dates non-today', () => {
    const date1 = Date.parse('04 Dec 2020 00:12:00 GMT')
    const date2 = Date.parse('04 Dec 2020 00:12:00 GMT')
    const dayRange = [date1, date2]
    const component = create(<CalendarSelect />)
    const instance = component.root
    const calendar = instance.findByType(Calendar)
    calendar.props.onChange(dayRange)
    expect(calendar.props.value).toBe(dayRange)
  })
})
