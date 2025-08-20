import React from 'react'
import NavBar from '../../NavBar/DirectorateNavBar'
import AddProfileForm from '../../../components/DirectorateComponent/AddProfileForm'

function AddProfile() {
  return (
    <>
    <NavBar />
    <div className='container'><AddProfileForm /></div>
    </>
  )
}

export default AddProfile