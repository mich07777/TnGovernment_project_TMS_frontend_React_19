import React from 'react'
import IgpNavBar from '../../NavBar/IgpNavBar'
import IgpApprovalSummaryDetails from '../../../components/Igp/IgpApprovalSummaryDetails'

function IgpApprovalSummary() {
  return (
    <>
    <IgpNavBar />
    <div className='container'><IgpApprovalSummaryDetails /></div>
    </>
  )
}

export default IgpApprovalSummary