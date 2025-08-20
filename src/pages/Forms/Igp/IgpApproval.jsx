import React from 'react'
import IgpApprovalGrid from '../../../components/Igp/IgpApprovalGrid'
import IgpNavBar from '../../NavBar/IgpNavBar'

function IgpApproval() {
  return (
    <>
    <IgpNavBar />
    <div className='container'><IgpApprovalGrid /></div>
    </>
  )
}

export default IgpApproval