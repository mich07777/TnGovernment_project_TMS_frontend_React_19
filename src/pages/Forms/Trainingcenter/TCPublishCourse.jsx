import React from 'react'
import { PublishCourseGrid } from '../../../components/TrainingcenterComponent/PublishCourseGrid'
import CenterNavBar from '../../NavBar/CenterNavBar'

function TCPublishCourse() {
  return (
    <>
    <CenterNavBar />
    <div className='container'><PublishCourseGrid/></div>
    </>
  )
}

export default TCPublishCourse