import React from 'react'
import TrainingCenterCounter from '../../components/Dashboard/TrainingCenterCounter'
import TrainingCenterCard from '../../components/Dashboard/TrainingCenterCard'
import CenterNavBar from '../NavBar/CenterNavBar'

function TrainingCenter() {
  return (
    <>
    <CenterNavBar />
    <TrainingCenterCounter />     
    <TrainingCenterCard /> 
    </>
  )
}

export default TrainingCenter