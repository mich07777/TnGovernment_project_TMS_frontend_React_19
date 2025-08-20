import React from 'react'
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaCheck, FaEdit } from 'react-icons/fa';

function SendProfileEndUserGrid() {
  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "firstName", headerName: "First Name", width: 180 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "cpfGdf", headerName: "CPF / GDF No", width: 150 },
    { field: "rank", headerName: "Rank", width: 120 },
    { field: "phoneNo", headerName: "Phone.No", width: 150 },
    { field: "whatsapp", headerName: "WhatsApp No.", width: 180 },
    { field: "email", headerName: "Email ID", width: 180 },
    { field: "zone", headerName: "Zone", width: 180 },
    { field: "range", headerName: "Range", width: 180 },
    { field: "dist", headerName: "Dist.", width: 180 },
    { field: "city", headerName: "City", width: 120 },
    { field: "splUnit", headerName: "Spl.Unit", width: 180 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.value?.btn1 && (
            <Button variant="contained" color="primary" onClick={() => handleAction(params.row, "Publish")}>
              <a href='#' className='text-white'><FaEdit /></a>
            </Button>
          )}&nbsp;
          {params.value?.btn2 && (
            <Button variant="contained" color="success" onClick={() => handleAction(params.row, "Publish")}>
              <a href='#' className='text-white'><FaCheck /></a>
            </Button>
          )}
        </div>
      ),
    },
  ];

  const GridData = [
    {
      id: 1,
      firstName: 'Sujatha',
      lastName: 'Rao',
      cpfGdf: 'CPF123456',
      rank: 'Inspector',
      phoneNo: '9876543000',
      whatsapp: '9876543210',
      email: 'sujatha@example.com',
      zone: 'South Zone',
      range: 'Chennai Range',
      dist: 'Chennai',
      city: 'Chennai',
      splUnit: 'Cyber Crime',
      action: { btn1: "add", btn2: "edit", btn3: "delete" },
    }
  ];
  
  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'><i className="bi bi-table me-2"></i> Send Profile Update Link - End User</h4>
              </div>
              <div className="card-body">
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SendProfileEndUserGrid
