import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import SubdivisionList from '../../../components/MasterComponent/Directorate/SubdivisionList'

function MasterSubdivision() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><SubdivisionList /></div>
    </>
  )
}

export default MasterSubdivision