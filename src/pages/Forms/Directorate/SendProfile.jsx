import React from 'react'
import NavBar from '../../NavBar/DirectorateNavBar'
import SendProfileGrid from '../../../components/DirectorateComponent/SendProfileGrid'

function SendProfile() {
  return (
    <>
    <NavBar />
    <div className='container'><SendProfileGrid /></div>
    </>
  )
}

export default SendProfile