// room type
import React from 'react'
import { optionsRoom } from './options'
export default function RMT () {
  return (
    <div className='col'>
      <div className='row'>
        <input style={{ marginLeft: '40px', marginRight: '10px', width: '30%' }} type='number' min='0' step='1' placeholder='Enter #' />
                Bedroom
      </div>
      <div className='row'>
        <input style={{ marginLeft: '40px', marginRight: '10px', width: '30%' }} type='number' min='0' step='1' placeholder='Enter #' />
                Bathroom
      </div>
      <img style={{ marginTop: '10px' }} src='./app/resources/horizontal_div.svg' />
      <div className='col' style={{ marginTop: '10px', marginLeft: '40px', float: 'left', display: 'flex', 'flex-wrap': 'wrap' }}>
        {
          optionsRoom.map(({ name }) => {
            console.log(name)
            return (
              // TODO: Missing "key" prop for element in iterator
              <div>
                <input type='checkbox' id={name} name={name} value={name} />
                <label for={name}> {name}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
