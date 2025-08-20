import React from 'react'
import "../../assets/css/dashboard.css"
import Counter from './Counter'

function TrainingCenterCounter() {
  return (
    <>
    <div className='col-md-12 mt-3 container-fluid'>
        <div className="section-counter">
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="studentsEnrolled"><Counter target="40"  duration={2000}/></h2>
                <span className="counter-label"> Total No. of Courses – Current Year</span>
                </div>
            </div>
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="successRate"><Counter target="300"  duration={2000}/></h2>
                <span className="counter-label">No. of Personnels Trained</span>
                </div>
            </div>
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="certifiedTeachers"><Counter target="10"  duration={2000}/></h2>
                <span className="counter-label">Total No. of Running Courses</span>
                </div>
            </div>
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="completeCourses"><Counter target="10"  duration={2000}/></h2>
                <span className="counter-label"> Process to be Initiated</span>
                </div>
            </div>
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="certifiedTeachers"><Counter target="10"  duration={2000}/></h2>
                <span className="counter-label">Awaiting Nominations</span>
                </div>
            </div>
            <div className="counter-item">
                <div className="counter">
                <h2 className="counter-number" id="completeCourses"><Counter target="10"  duration={2000}/></h2>
                <span className="counter-label"> Awaiting DG Approvals</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TrainingCenterCounter