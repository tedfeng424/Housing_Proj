import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import MainDrop from './MainDrop'

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme, profilePic }) => (
        <nav className='row space-between distinct'>
          <NavLink
            to='/'
            exact
            className='nav-link'
          >
            <img src='./app/resources/logo.png' alt='logo' width='50%' height='50px' style={{ marginLeft: '20px', marginBottom: '5px', marginTop: '5px' }} />
          </NavLink>
          <ul className='row nav' style={{ marginRight: '20px' }}>
            <li />
            <li>
              <MainDrop img={profilePic} />
            </li>
          </ul>
        </nav>
      )}
    </ThemeConsumer>
  )
}
