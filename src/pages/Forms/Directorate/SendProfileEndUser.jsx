import React from 'react'
import NavBar from '../../NavBar/DirectorateNavBar'
import SendProfileEndUserGrid from '../../../components/DirectorateComponent/SendProfileEndUserGrid'
import AddEditTrainingProfile from '../../../components/DirectorateComponent/AddEditTrainingProfile'

function SendProfileEndUser() {
  return (
    <>
    <NavBar />
    <div className='container'><SendProfileEndUserGrid /><AddEditTrainingProfile /></div>
    </>
  )
}

export default SendProfileEndUser