import React from 'react'
import NavBar from '../../NavBar/DirectorateNavBar'
import DownloadTemplateForm from '../../../components/DirectorateComponent/DownloadTemplateForm'

function DownloadTemplate() {
  return (
    <>
    <NavBar />
    <div className='container'><DownloadTemplateForm /></div>
    </>
  )
}

export default DownloadTemplate