import React from 'react'
import DpoNavBar from '../../NavBar/DpoNavBar'
import DpoDatabankCRUDGrid from '../../../components/Dpo/DpoDatabankCRUDGrid'

function DpoDatabankCRUD() {
  return (
    <>
    <DpoNavBar />
    <div className='container'><DpoDatabankCRUDGrid /> </div>
    </>
  )
}

export default DpoDatabankCRUD