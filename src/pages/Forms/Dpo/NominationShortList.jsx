import React from 'react'
import DpoNavBar from '../../NavBar/DpoNavBar'
import NominationShortListGrid from '../../../components/Dpo/NominationShortListGrid'

function NominationShortList() {
  return (
    <>
    <DpoNavBar />
    <div className='container'><NominationShortListGrid /></div>
    </>
  )
}

export default NominationShortList