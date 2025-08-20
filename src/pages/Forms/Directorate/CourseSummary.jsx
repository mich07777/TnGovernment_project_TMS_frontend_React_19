import React from 'react'
import CourseSummaryDetails from '../../../components/DirectorateComponent/CourseSummaryDetails'
import NavBar from '../../NavBar/DirectorateNavBar'

function CourseSummary() {
  return (
    <>
      <NavBar />
        <div className='container'><CourseSummaryDetails /></div>
    </>
  )
}

export default CourseSummary