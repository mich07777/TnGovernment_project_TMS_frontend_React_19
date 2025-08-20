import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import SplUnits from '../../../components/MasterComponent/Directorate/SplUnits'

function MasterSplUnits() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><SplUnits /></div>
    </>
  )
}

export default MasterSplUnits