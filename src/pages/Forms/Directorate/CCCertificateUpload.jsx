import React from 'react'
import CCCertificateUploadGrid from '../../../components/DirectorateComponent/CCCertificateUploadGrid'
import NavBar from '../../NavBar/DirectorateNavBar'

function CCCertificateUpload() {
  return (
    <>
    <NavBar />
    <div className='container'><CCCertificateUploadGrid/></div>
    </>
  )
}

export default CCCertificateUpload