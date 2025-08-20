import React from 'react'
import Locations from '../../../components/MasterComponent/Directorate/Locations'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
function MasterLocations() {
  return (
       <>
         <DirectorateNavBar />
    <div className='container'><Locations /></div>
    </>
  )
}

export default MasterLocations