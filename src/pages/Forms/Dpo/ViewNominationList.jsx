import React from 'react'
import DpoNavBar from '../../NavBar/DpoNavBar'
import ViewNominationListSummary from '../../../components/Dpo/ViewNominationListSummary'

function ViewNominationList() {
  return (
    <>
    <DpoNavBar />
    <div className='container'><ViewNominationListSummary /></div>
    </>
  )
}

export default ViewNominationList