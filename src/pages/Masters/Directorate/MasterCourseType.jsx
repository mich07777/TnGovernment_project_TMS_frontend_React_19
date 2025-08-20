import React from 'react'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
import CourseType from '../../../components/MasterComponent/Directorate/CourseType'

function MasterCourseType() {
  return (
    <>
        <DirectorateNavBar />
        <div className='container'><CourseType /></div>
    </>
  )
}

export default MasterCourseType