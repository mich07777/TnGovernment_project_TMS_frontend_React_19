import React from 'react'
import NavBar from '../../NavBar/DirectorateNavBar'
import DataBankCRUDGrid from '../../../components/DirectorateComponent/DataBankCRUDGrid'

function DataBankCRUD() {
  return (
    <>
    <NavBar />
    <div className='container'><DataBankCRUDGrid /></div>
    </>
  )
}

export default DataBankCRUD