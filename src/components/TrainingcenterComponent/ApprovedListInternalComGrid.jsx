import React from 'react';
import { Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from "react-icons/fa";

function ApprovedListInternalComGrid() {
    const navigate = useNavigate();



  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "courseName", headerName: "Course Name", width: 180 },
    { field: "trainingCenter", headerName: "Training Center", width: 130 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "contactPerson", headerName: "Contact Person", width: 120 },
    { field: "phone", headerName: "Phone No.", width: 150 },
    { field: "whatsapp", headerName: "WhatsApp No.", width: 180 },
    { field: "email", headerName: "Email ID", width: 180 },
    { field: "fromDate", headerName: "From Date", width: 180 },
    { field: "toDate", headerName: "To Date", width: 180 },
    // { field: "noOfDays", headerName: "No. of Days", width: 180 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "keywords", headerName: "Keywords", width: 180 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value?.btn1 && (
            <>
              <Tooltip title="Approved List">
                <IconButton
                  color="primary"
                   onClick={() => navigate(`/TCApprovedListInternalCom/${params.row.id}`)}
                >
                 <FaPaperPlane />
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
      courseName: 'PTS/Vellore/Dec2024',
      trainingCenter: 'Training Center 1',
      location: 'Vellore',
      contactPerson: "Sujatha",
      phone: "9876543210",
      whatsapp: "9876543210",
      email: "sujatha@example.com",
      fromDate: "2024-04-01",
      toDate: "2024-04-05",
    //   noOfDays: 5,
      status: "Pending",
      keywords: "keyword1, keyword2",
      action: { btn1: "Upload", },
    },
    {
      id: 2,
      courseName: 'PTS/Vellore/Dec2024',
      trainingCenter: 'Training Center 2',
      location: 'Vellore',
      contactPerson: "Rithika",
      phone: "9876543222",
      whatsapp: "9876543222",
      email: "rithika@example.com",
      fromDate: "2024-04-06",
      toDate: "2024-04-10",
    //   noOfDays: 5,
      status: "Approved",
      keywords: "keyword1, keyword2",
      action: { btn1: "Upload", },
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
                  Approved List Internal Communication
                </h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className='col-md-5 row'>
                    <div className='col-md-12'>
                      <input
                        type='text'
                        className="form-control"
                        name="search"
                        placeholder='Search by course, training center, location, date'
                      />
                    </div>
                  </div>
                  <div className='col-md-2 row'>
                    <button className='btn btn-danger'>
                      <i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;
                      Search
                    </button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ApprovedListInternalComGrid;

