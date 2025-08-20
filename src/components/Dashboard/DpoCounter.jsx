import React from 'react'
import "../../assets/css/dashboard.css"
import Counter from './Counter'

function DpoCounter() {
    return (
      <>
      <div className='col-md-12 mt-3 container-fluid' style={{width:'70%'}}>
          <div className="section-counter">
              <div className="counter-item">
                  <div className="counter">
                  <h2 className="counter-number" id="studentsEnrolled"><Counter target="10"  duration={2000}/></h2>
                  <span className="counter-label"> Total No. of Courses</span>
                  </div>
              </div>
              <div className="counter-item">
                  <div className="counter">
                  <h2 className="counter-number" id="successRate"><Counter target="10"  duration={2000}/></h2>
                  <span className="counter-label">Call for Nominations </span>
                  </div>
              </div>
              <div className="counter-item">
                  <div className="counter">
                  <h2 className="counter-number" id="certifiedTeachers"><Counter target="8"  duration={2000}/></h2>
                  <span className="counter-label">Awaiting list </span>
                  </div>
              </div>
              <div className="counter-item">
                  <div className="counter">
                  <h2 className="counter-number" id="completeCourses"><Counter target="2"  duration={2000}/></h2>
                  <span className="counter-label">Shortlisting Pending</span>
                  </div>
              </div>
          </div>
      </div>
      </>
    )
  }

export default DpoCounter