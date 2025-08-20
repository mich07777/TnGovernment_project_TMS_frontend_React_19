import React from 'react'
import MTrainingCenterForm from '../../components/MasterComponent/MTrainingCenterForm'
import NavBar from '../NavBar/DirectorateNavBar'

function MTrainingCenter() {
  return (
    <>
    <NavBar />
    <div className='container'><MTrainingCenterForm />
    </div></>
  )
}

export default MTrainingCenter