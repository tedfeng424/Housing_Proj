import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function TenantCard ({ moveTime, stayPeriod, timeToSchool, timeToBus, rType, priceRange, name, others, intro, mainPic, email }) {
  return (
    <ThemeConsumer>
      {({ uid }) =>
        (
          <div className='t-card'>
            <div className='norm_row'>
              <div className='col'>
                <div className='norm_row' style={{ marginLeft: '15px' }}>
                  <img src={mainPic} alt='login' style={{ 'border-radius': '100%', marginTop: '5px', width: '52px', height: '52px' }} />
                </div>
                <div className='norm_row' style={{ marginLeft: '5px' }}>
                  <div><img src='./app/resources/love.png' alt='love' width='32px' height='32px' style={{ marginTop: '5px', marginRight: '5px' }} /></div>
                  <NavLink
                    to={{ pathname: '/streamapi', one2one: [email, uid] }}
                    className='nav-link'
                  >
                    <img src='./app/resources/chat.svg' alt='chat' width='52px' height='52px' />
                  </NavLink>
                </div>
              </div>
              <div className='col' style={{ marginLeft: '5px' }}>
                <div className='norm_row' style={{ color: '#9D9D9D', 'font-size': '15px', marginTop: '15px' }}>Move in Time:</div>
                <div className='norm_row'>{moveTime}</div>
                <div className='norm_row' style={{ color: '#9D9D9D', 'font-size': '15px', marginTop: '15px' }}>Minimum Stay Period:</div>
                <div className='norm_row'>{stayPeriod}</div>
              </div>

            </div>
            <div
              className='col' style={{
                'font-style': 'normal',
                'font-weight': 'normal',
                marginLeft: '15px'
              }}
            >
              <div className='norm_row' style={{ 'font-size': '20px' }}>Looking for housing: </div>
              <div className='norm_row' style={{ marginTop: '10px' }}>{timeToBus}</div>
              <div className='norm_row'>{timeToSchool}</div>
              <div className='norm_row'>
                <span style={{ color: '#9D9D9D', 'font-size': '18px', marginTop: '15px', marginRight: '5px' }}>Room type:</span>
                <span style={{ 'font-size': '20px', marginTop: '15px' }}>{rType}</span>
              </div>
              <div className='norm_row'>
                <div style={{ color: '#9D9D9D', 'font-size': '18px', marginTop: '8px', marginRight: '5px' }}>Price range:</div>
                <div className='col' style={{ marginTop: '8px' }}>
                  <span>{priceRange}</span>
                  <span>- {('negotiable' in others && 'Negotiable') || 'Not Negotiable'}</span>
                  <span>- {('utility' in others && 'Negotiable') || 'Utility not included'} </span>
                </div>
              </div>
            </div>
          </div>
        )}
    </ThemeConsumer>
  )
}
