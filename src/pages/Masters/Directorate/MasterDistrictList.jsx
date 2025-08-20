import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import DistrictList from '../../../components/MasterComponent/Directorate/DistrictList'

function MasterDistrictList() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><DistrictList /></div>
    </>
  )
}

export default MasterDistrictList