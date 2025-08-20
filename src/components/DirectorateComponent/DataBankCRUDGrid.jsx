import React from 'react';
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaEdit, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import useFetch from '../../hooks/useDropdowns';
import { BASE_URL } from '../../utils/config';

function DataBankCRUDGrid() {

  const columns = [
    { field: "IFHRMS_Employee_Number", headerName: "IFHRMS Employee Number", width: 180 },
    { field: "CPS_GPF_TPF_PRAN_Number", headerName: "CPS/GPF/TPF/PRAN Number", width: 200 },
    { field: "Salutation", headerName: "Salutation", width: 130 },
    { field: "Initial_Name", headerName: "Initial Name", width: 150 },
    { field: "Father_Spouse_Name", headerName: "Father/Spouse Name", width: 180 },
    { field: "Nationality", headerName: "Nationality", width: 150 },
    { field: "Present_Address", headerName: "Present Address", width: 200 },
    { field: "Mobile_Number", headerName: "Mobile Number", width: 150 },
    { field: "Whatsapp_Number", headerName: "Whatsapp Number", width: 150 },
    { field: "CUG_Number", headerName: "CUG Number", width: 150 },
    { field: "Email_Address", headerName: "Email Address", width: 220 },
    { field: "Gender", headerName: "Gender", width: 120 },
   {
  field: "Date_Of_Birth",
  headerName: "DOB",
  width: 130,
  renderCell: (params) => {
    const dateValue = params.row?.Date_Of_Birth || params.value;
    if (!dateValue) return "";
    try {
      return new Date(dateValue).toISOString().split('T')[0];
    } catch (error) {
      return error
    }
  }
},
    { field: "Home_District", headerName: "Home District", width: 150 },
    { field: "Mother_Toungue", headerName: "Mother Tongue", width: 150 },
    { field: "Qualification", headerName: "Qualification", width: 150 },
    { field: "Current_Post", headerName: "Current Post", width: 180 },
    { field: "Department", headerName: "Department", width: 180 },
    { field: "Current_Posting_District", headerName: "Current Posting District", width: 200 },
    { field: "Current_Posting_Location", headerName: "Current Posting Location", width: 200 },
    { field: "Joining_Service", headerName: "Joining Service", width: 180 },
    { field: "Joining_Post", headerName: "Joining Post", width: 180 },
  {
  field: "Joining_Date",
  headerName: "Joining Date",
  width: 130,
  renderCell: (params) => {
    const dateValue = params.row?.Joining_Date || params.value;
    if (!dateValue) return "";
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-IN');
    } catch (error) {
      return error;
    }
  }
},
    { field: "Probation_Completion", headerName: "Probation Completion", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small" style={{ marginRight: 8 }}>
            <a href="AddProfile" className="text-white" style={{ color: 'white', textDecoration: 'none' }}>
              <FaPlus />
            </a>
          </Button>
          <Button variant="contained" color="secondary" size="small" style={{ marginRight: 8 }}>
            <a href="AddProfile" className="text-white" style={{ color: 'white', textDecoration: 'none' }}>
              <FaEdit />
            </a>
          </Button>
          <Button variant="contained" color="error" size="small">
            <a href="#" className="text-white" style={{ color: 'white', textDecoration: 'none' }}>
              <FaTrash />
            </a>
          </Button>
        </div>
      ),
    },
  ];

  const { data: bulkData, loading, error } = useFetch(`${BASE_URL}/bulkData/getAllData`);

  const rows = bulkData?.map((item, index) => ({
    id: index,
    ...item,
  })) || [];

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className="title-clr">
                  <i className="bi bi-table me-2"></i> Add / Edit / Delete Profile
                </h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className="col-md-2 ms-2 row">
                    <Button variant="contained" color="info" startIcon={<FaUpload />}>
                      Upload Excel
                    </Button>
                  </div>
                </div>
                {!loading && !error && bulkData ? (
                  <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSizeOptions={[10, 25, 50]}
                      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                      slots={{ toolbar: GridToolbar }}
                      showToolbar
                      density="comfortable"
                      disableRowSelectionOnClick
                    />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                {error && <p>Error loading data</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DataBankCRUDGrid;





