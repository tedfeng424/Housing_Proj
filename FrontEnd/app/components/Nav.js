  
import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import MainDrop from './MainDrop'

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme, profile_pic }) => (
        <nav className='row space-between distinct'>
          <NavLink
            to='/'
            exact
            className='nav-link'>
              <img src="./app/resources/logo.png" alt="logo" width="50%" height="50px" style={{marginLeft:"20px",marginBottom:"5px",marginTop:"5px"}}/>
          </NavLink>
          <ul className='row nav'>
            <li>
              <button
              style={{fontSize: 30}}
              className='btn-clear'
              onClick={toggleTheme}
              >
              {theme === 'love' ? <img src="./app/resources/love.png" alt="love" width="30px" height="30px"/> : 
              <img src="./app/resources/loved.png" alt="loved" width="30px" height="30px"/>}
              </button>
            </li>
            <li>
              <MainDrop img={profile_pic}></MainDrop>
            </li>
          </ul>
        </nav>
      )}
    </ThemeConsumer>
  )
}