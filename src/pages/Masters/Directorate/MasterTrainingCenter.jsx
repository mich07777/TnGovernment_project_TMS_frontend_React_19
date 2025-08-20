import React from 'react'
import TrainingCenterList from '../../../components/MasterComponent/Directorate/TrainingCenterList'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
function MasterTrainingCenter() {
  return (
       <>
         <DirectorateNavBar />
    <div className='container'> <TrainingCenterList /></div>
    </>
  )
}

export default MasterTrainingCenter