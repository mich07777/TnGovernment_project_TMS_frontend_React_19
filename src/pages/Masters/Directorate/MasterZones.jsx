import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import Zones from '../../../components/MasterComponent/Directorate/Zones'

function MasterZones() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><Zones /></div>
    </>
  )
}

export default MasterZones