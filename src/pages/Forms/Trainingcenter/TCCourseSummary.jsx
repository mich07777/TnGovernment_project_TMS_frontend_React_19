import React from 'react'
import CourseSummary from '../../../components/TrainingcenterComponent/CourseSummary'
import CenterNavBar from '../../NavBar/CenterNavBar'

function TCCourseSummary() {
  return (
    <>
    <CenterNavBar />
    <div className='container'><CourseSummary/></div>
    </>
  )
}

export default TCCourseSummary