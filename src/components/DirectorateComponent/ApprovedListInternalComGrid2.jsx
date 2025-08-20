import React from 'react';
import { Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import OutgoingMailIcon from '@mui/icons-material/OutgoingMail';

function ApprovedListInternalComGrid2() {
   
  const handleAction = (row, actionType) => {
    if (actionType === "Upload HoPF Approval") {
      
    }
   
  };

  const handleUploadSubmit = (formData) => {
    // Send formData to backend via axios/fetch
    console.log('Submitting formData:', formData);
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "nominee", headerName: "Nominee", width: 180 },
    { field: "rank", headerName: "Rank", width: 130 },
    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "eligibilityChecked", headerName: "Eligibility Checked", width: 120 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value?.btn1 && (
            <>
               <Tooltip title="Send internal approval communication">
                <IconButton
                  color="success"
                  // onClick={() => handleAction(params.row, "Upload HoPF Approval")}
                >
                  <OutgoingMailIcon />
                </IconButton>
              </Tooltip> 
             
            </>
          )}
        </div>
      ),
    },
  ];

  const GridData = [
    {
      id: 1,
      nominee: 'Hariharan',
      rank: 'SI', 
      mobileNo: "9876543210",
      eligibilityChecked: "No",
      action: { btn1: "send" },
    },
    {
      id: 2,
      nominee: 'Karthick',
      rank: 'SI',
      mobileNo: "9876543222",
      eligibilityChecked: "Yes",
      action: { btn1: "send"},
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
                  Approved List - Internal Communication
                </h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className='col-md-12 row'>
                    <div className='col-md-12'>
                          <h3 className='txtred border-2'>Course ID: Tamilnadu/CybSec/042025/020
                          </h3>
                    </div>
                  </div>
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
                  <div className='col-md-12 text-center'>
                   <button className='btn btn-primary mt-3' >Save</button>
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

export default ApprovedListInternalComGrid2;
