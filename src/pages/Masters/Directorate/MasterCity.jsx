import React from 'react'
import CityList from '../../../components/MasterComponent/Directorate/CityList'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
function MasterCity() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><CityList /></div>
    </>
  )
}

export default MasterCity