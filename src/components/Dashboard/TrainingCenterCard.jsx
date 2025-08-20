import React from 'react'
import '../../assets/css/dashboard.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function TrainingCenterCard() {
    const data = [
        { name: "Create & Publish Course (Inside State)", cost: 10, grad: " #f7256e, #cc0c48",path:"TCCreateCourse" },
        { name: "Collate Shortlisted List for Approval", cost: 5, grad: " #f7ea1f, #f87d2c",path:"TCCollateandsent" },
        { name: "Approved List internal Communication", cost: 19, grad: " #f280b6, #f72589",path:"TCApprovedListInternalCom" },
        { name: "Course Completion Certificate Upload", cost: 29, grad: " #9ad366, #8df82c",path:"TCCCupload" },
        { name: "Status Tracking", cost: 29, grad: " #a16ac1, #d191f6",path:"TrainingCenter" },
      ];
      const n = data.length;

  return (

    <>
        <div className='col-md-12 mt-3 container dashboard-card-body'>
            <div className="d-flex justify-content-center flex-wrap pricing-body col-md-12" style={{ "--n": n }}>
      {data.map((c, i) => (
        <article 
          key={i}
          style={{
            "--i": i,
            "--cost": c.cost,
            "--grad": c.grad,
          }}
        >
          <header>
          <h5 data-name={c.name}>{c.name}</h5>
          </header>
          <section>
            <button><a href={c.path}><ArrowCircleRightIcon color="secondary" fontSize="large"/></a></button>
          </section>
        </article>
      ))}
    </div>
        
        </div>
    </>
  )
}

export default TrainingCenterCard