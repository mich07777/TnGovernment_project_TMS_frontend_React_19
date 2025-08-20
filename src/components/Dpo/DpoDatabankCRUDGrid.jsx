import React from 'react'
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaCheck, FaEdit, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';

function DpoDatabankCRUDGrid() {
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
                <a href='DpoAddProfile' className='text-white'><FaPlus /></a>
            </Button>
            )}&nbsp;
            {params.value?.btn2 && (
            <Button variant="contained" color="secondary" onClick={() => handleAction(params.row, "Publish")}>
                <a href='#' className='text-white'><FaEdit /></a>
            </Button>
            )}&nbsp;
            {params.value?.btn3 && (
            <Button variant="contained" color="error" onClick={() => handleAction(params.row, "Publish")}>
                <a href='#' className='text-white'><FaTrash /></a>
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
    },
    {
      id: 2,
      firstName: 'Rithika',
      lastName: 'Sharma',
      cpfGdf: 'CPF654321',
      rank: 'SI',
      phoneNo: '9876543111',
      whatsapp: '9876543222',
      email: 'rithika@example.com',
      zone: 'North Zone',
      range: 'Salem Range',
      dist: 'Salem',
      city: 'Salem',
      splUnit: 'Women Safety',
      action: { btn1: "add", btn2: "edit", btn3: "delete" },
    },
    {
      id: 3,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      cpfGdf: 'CPF789123',
      rank: 'Head Constable',
      phoneNo: '9876543220',
      whatsapp: '9876543244',
      email: 'rajesh.kumar@example.com',
      zone: 'West Zone',
      range: 'Coimbatore Range',
      dist: 'Coimbatore',
      city: 'Coimbatore',
      splUnit: 'Traffic',
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
                <h4 className='title-clr'><i className="bi bi-table me-2"></i> Add / Edit / Delete Profile</h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className='col-md-5 row'>
                    <div className='col-md-12'><input type='text' className="form-control" name="search" placeholder='Search by course, training center, location, date'/></div>
                  </div>
                  <div className='col-md-2 row'>
                    <button className='btn btn-danger'><i class="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;
                    Search</button>
                  </div>
                  <div className='col-md-2 mt-2 row txt-align-center'>
                    <h6 className='title-clr'>OR</h6>
                  </div>
                  <div className='col-md-2 ms-2 row '>
                    <button className='btn btn-info text-white'><FaUpload />&nbsp;&nbsp;
                      Upload Excel</button>
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

export default DpoDatabankCRUDGrid
