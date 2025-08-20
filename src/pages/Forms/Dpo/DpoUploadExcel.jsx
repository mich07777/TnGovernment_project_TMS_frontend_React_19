import React from 'react'
import DpoNavBar from '../../NavBar/DpoNavBar'
import DpoUploadExcelForm from '../../../components/Dpo/DpoUploadExcelForm'

function DpoUploadExcel() {
  return (
    <>
    <DpoNavBar />
    <div className='container'><DpoUploadExcelForm/> </div>
    </>
  )
}

export default DpoUploadExcel