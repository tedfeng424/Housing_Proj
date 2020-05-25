import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'
import {toggleShow} from './Drop'




export default function MainDrop ({img}) {
    const activeStyle = {
        color: 'rgb(187, 46, 31)'
    }
	return(
    <ThemeConsumer>
    {({ toggleLogin, login}) => (
      <div className="dropdown">
        <button className="dropbtn">
            <img onClick={()=>toggleShow("main_bar" )} src={img} alt="login" width="32px" height="32px" style={{marginRight:"20px","border-radius": '100%'}}/>
        </button>
        <div id="main_bar" className="dropdown-content">
            
            {login &&
            <React.Fragment>
                <NavLink
                to='/logout'
                activeStyle={activeStyle}
                onClick={()=>{toggleLogin()}}
                className='nav-link'>
                    Logout
                </NavLink>
                <NavLink
                to='/streamapi'
                activeStyle={activeStyle}
                className='nav-link'>
                    Chat
                </NavLink>
            </React.Fragment>
            }

            {!login &&<NavLink
                to='/login'
                activeStyle={activeStyle}
                className='nav-link'>
                Login
            </NavLink>
            }
            
        
        </div>
      </div>
    )}
    </ThemeConsumer>

)
}