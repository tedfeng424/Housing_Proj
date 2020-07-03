// distance to skoo
import React from 'react'
import { optionsTransportation, optionsTime } from './options'
export default function DTS () {
  return (
    <div className='row'>
      <div className='col' style={{ float: 'left', display: 'flex', 'flex-wrap': 'wrap' }}>
            Time(min)
        {
          optionsTime.map(({ name }) => {
            console.log(name)
            return (
              // TODO: Missing "key" prop for element in iterator
              <div>
                <input type='radio' id='name' name='name' value={name} />
                <label for={name}> {name}</label>
              </div>
            )
          })
        }
      </div>
      <img src='./app/resources/divider.svg' />
      <div className='col' style={{ float: 'left', display: 'flex', 'flex-wrap': 'wrap' }}>
            Type of Transportation
        {
          optionsTransportation.map(({ name }) => {
            console.log(name)
            return (
              // TODO: Missing "key" prop for element in iterator
              <div>
                <input type='radio' id='tran' name='tran' value={name} />
                <label for={name}> {name}</label>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
