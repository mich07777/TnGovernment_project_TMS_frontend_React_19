import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import RangeList from '../../../components/MasterComponent/Directorate/RangeList'

function MasterRange() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><RangeList /></div>
    </>
  )
}

export default MasterRange