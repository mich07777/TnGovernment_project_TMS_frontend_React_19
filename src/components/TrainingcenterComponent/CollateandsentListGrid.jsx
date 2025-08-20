import React from 'react';
import { DataGrid } from "@mui/x-data-grid";


function CollateandsentListGrid() {
    const counterData = [
        {
            id: 1,
            title:"Training Center",
            name:"Vellore",
            color:"primary",
        },
        {
            id: 2,
            title:"Course",
            name:"Cyber Security",
            color:"secondary",
        },
        {
            id: 3,
            title:"Total No. of Seats",
            name:"02",
            color:"success",
        },
        {
            id: 4,
            title:"Nominations",
            name:"10",
            color:"light",
        },
    ]
   

 

  const handleUploadSubmit = (formData) => {
    // Send formData to backend via axios/fetch
    console.log('Submitting formData:', formData);
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "splunit", headerName: "DPO/CPO/Special Unit", width: 200 },
    { field: "nominee", headerName: "Nominee", width: 140 },
    { field: "rank", headerName: "Rank", width: 100 },
    { field: "cpsno", headerName: "CPS No", width: 100 },
    { field: "eligibilityChecked", headerName: "Eligibility Checked", width: 180 },
    { field: "mainlist", headerName: "Main List/ Reserve", width: 180 },
    { field: "ranking", headerName: "Ranking (as per DPO/CPO)", width: 200 },

  ];

  const GridData = [
    {
      id: 1,
      splunit: 'Cuddalore',
      nominee: 'Hariharan',
      rank: 'SI', 
      cpsno: "CPS1234",
      eligibilityChecked: "No",
      mainlist: "Main",
      ranking: "1",
     
    },
    {
      id: 2,
      splunit: 'Vellore',
      nominee: 'Srikanth',
      rank: 'SI',
      cpsno: "CPS5236",
      eligibilityChecked: "Yes",
      mainlist: "Reserve",
      ranking: "4",
      
    },
    {
        id: 3,
        splunit: 'GCP',
        nominee: 'Hari',
        rank: 'SI',
        cpsno: "CPS9685",
        eligibilityChecked: "Yes",
        mainlist: "Main",
        ranking: "1",
       
      },
  ]; 

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'>
                  <i className="bi bi-table me-2"></i>
                  Collate and Send for Approval
                </h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className='col-md-12 row'>
                    <div className='col-md-12'>
                          <h3 className='txtred border-2'>Course ID: Vellore/CybSec/042025/020
                          </h3>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-5 justify-content-center">
                {counterData.map((item, index) => {
                      const bgClasses = ['#48A6A7', '#BBD8A3', '#FAD0C4', '#B9B28A'];
                      const bgColor = bgClasses[index % 4];                    

                      return (
                        <div className="col-md-2" key={index}>
                          <div className={`card h-100 shadow text-white`} style={{ backgroundColor: bgColor }}>
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                              <h3 className="card-text">{item.name}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                 
                </div>
                <div className="table-responsive p-3">
                  <DataGrid
                    rows={GridData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    autoHeight
                  />
                  <div className='col-md-12 d-flex justify-content-center gap-5'>
                   <button className='btn btn-primary mt-3' >Download as Excel</button>
                   <button className='btn btn-light mt-3'>Forward to DG Approval</button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CollateandsentListGrid;
