import React from 'react'
import AddProfileForm from '../../../components/DirectorateComponent/AddProfileForm'
import DpoNavBar from '../../NavBar/DpoNavBar'

function DpoAddProfile() {
  return (
    <>
    <DpoNavBar />
    <div className='container'><AddProfileForm /></div>
    </>
  )
}

export default DpoAddProfile