import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import CourseAttendedCenter from '../../../components/MasterComponent/Directorate/CourseAttendedCenter'

function MasterCourseAttendedCenter() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><CourseAttendedCenter /></div>
    </>
  )
}

export default MasterCourseAttendedCenter