import React from 'react'
import { PublishCourseDetailsGrid } from '../../../components/DirectorateComponent/PublishCourseDetailsGrid'
import NavBar from '../../NavBar/DirectorateNavBar'

function PublishCourseDetails() {
  return (
    <>
    <NavBar />
    <div className='container'><PublishCourseDetailsGrid/></div>
    </>
  )
}

export default PublishCourseDetails