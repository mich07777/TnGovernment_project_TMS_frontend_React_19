import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import Status from '../../../components/MasterComponent/Directorate/Status'

function MasterStatus() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><Status /></div>
    </>
  )
}

export default MasterStatus