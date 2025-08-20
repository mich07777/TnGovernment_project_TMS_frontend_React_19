import React from 'react'
import TCCreateCourseForm from '../../../components/TrainingcenterComponent/TCCreateCourseForm'
import CenterNavBar from '../../NavBar/CenterNavBar'

function TCCreateCourse() {
  return (
    <>
    <CenterNavBar />
    <div className='container'><TCCreateCourseForm/></div>
    </>
  )
}

export default TCCreateCourse