import React from 'react'
import DocumentType from '../../../components/MasterComponent/Directorate/DocumentType'
import DirectorateNavBar from '../../NavBar/DirectorateNavBar'
function MasterDocumentType() {
  return (
       <>
         <DirectorateNavBar />
    <div className='container'><DocumentType />   </div>
    </>
  )
}

export default MasterDocumentType