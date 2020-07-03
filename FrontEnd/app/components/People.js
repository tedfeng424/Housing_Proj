import React from 'react'
import DropDown from './DropDown'
import TenantCard from './TenantCard'
import { NavLink } from 'react-router-dom'

export default class People extends React.Component {
  constructor (props) {
    super(props)

    this.state = { post: [] }
  }

  componentDidMount () {
    fetch('http://localhost:3001/getPeople', {
      mode: 'cors'
    }).then((res) => res.json())
      .then((data) => this.setState({ post: data }))
  }

  componentDidUpdate () {
    if (this.props.location.update) {
      fetch('http://localhost:3001/getPeople', {
        mode: 'cors'
      }).then((res) => res.json())
        .then((data) => this.setState({ post: data }))
        .then(this.props.location.update = false)
        .then(console.log('debugging update'))
    }
  }

  render () {
    return (
      <>
        <DropDown />
        <ul style={{ float: 'left', display: 'flex', 'flex-wrap': 'wrap' }}>
          {this.state.post.map((personInfo) => {
            const { moveTime, stayPeriod, timeToSchool, timeToBus, rType, priceRange, name, others, intro, id, mainPic, email } = personInfo
            console.log(personInfo)
            return (
              <li key={id}>
                <TenantCard
                  moveTime={moveTime} stayPeriod={stayPeriod} timeToSchool={timeToSchool} timeToBus={timeToBus} rType={rType} priceRange={priceRange} name={name} others={others} intro={intro}
                  mainPic={mainPic} email={email}
                />
              </li>
            )
          })}
        </ul>
        <NavLink
          to={{
            pathname: '/hosting_form',
            endpoint: 'http://localhost:3001/addtenant'
          }}

          style={{
            position: 'fixed',
            bottom: 0,
            right: 0
          }}
        >
          <img src='./app/resources/add_post.svg' alt='form' width='52px' height='52px' />
        </NavLink>
      </>
    )
  }
}
