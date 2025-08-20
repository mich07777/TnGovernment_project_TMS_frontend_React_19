import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import Units from '../../../components/MasterComponent/Directorate/Units'

function MasterUnits() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><Units /></div>
    </>
  )
}

export default MasterUnits