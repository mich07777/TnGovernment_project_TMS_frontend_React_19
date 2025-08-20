import React from 'react'
import Rank from '../../../components/MasterComponent/Directorate/Rank'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
function MasterRank() {
  return (
    <>
     <DirectorateNavBar />
    <div className='container'><Rank/></div>
    </>
  )
}

export default MasterRank