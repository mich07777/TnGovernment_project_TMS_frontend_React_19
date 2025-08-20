import React from 'react'
import '../../assets/css/dashboard.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function DpoCard() {
    const data = [
        { name: "Data Bank", cost: 10, grad: "#0fcf7b, #0c9f30",path:"DataBankCRUD" },
        // { name: "Call for Nominations from Personnel", cost: 19, grad: " #f7256e, #cc0c48",path:"CreateCourse"},
        { name: "Shortlist List for Nomination", cost: 29, grad: " #f7ea1f, #f87d2c",path:"CollateandSent" },
        // { name: "Feedback from Personnel on course", cost: 9, grad: " #5eefea, #0c9f9a",path:"HopfLetterOutside" },
        { name: "Reports", cost: 19, grad: " #f280b6, #f72589" ,path:"ApprovedListInternalCommunication" },
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

export default DpoCard