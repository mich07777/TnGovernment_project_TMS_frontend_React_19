import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import SexList from '../../../components/MasterComponent/Directorate/SexList'

function MasterSex() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><SexList /></div>
    </>
  )
}

export default MasterSex