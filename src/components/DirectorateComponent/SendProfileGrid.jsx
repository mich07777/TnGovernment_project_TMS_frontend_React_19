import React, { useState } from 'react';
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';
import useFetch from '../../hooks/useDropdowns';
import { BASE_URL } from '../../utils/config';

function SendProfileGrid() {
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: sendProfiles, loading, error, refetch } = useFetch(`${BASE_URL}/sendProfile/getAll`);

  const filteredRows = (sendProfiles || []).filter(profile =>
    profile?.Initial_Name?.toLowerCase().includes(searchText.toLowerCase()) ||
    profile?.Current_Post?.toLowerCase().includes(searchText.toLowerCase()) ||
    profile?.Department?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "IFHRMS_Employee_Number", headerName: "IFHRMS Emp No", width: 150 },
    { field: "CPS_GPF_TPF_PRAN_Number", headerName: "CPS / GPF / TPF / PRAN No", width: 200 },
    { field: "Salutation", headerName: "Salutation", width: 100 },
    { field: "Initial_Name", headerName: "Initial Name", width: 160 },
    { field: "Father_Spouse_Name", headerName: "Father / Spouse Name", width: 180 },
    { field: "Nationality", headerName: "Nationality", width: 120 },
    { field: "Present_Address", headerName: "Address", width: 200 },
    { field: "Mobile_Number", headerName: "Mobile", width: 150 },
    { field: "Whatsapp_Number", headerName: "WhatsApp", width: 150 },
    { field: "CUG_Number", headerName: "CUG Number", width: 150 },
    { field: "Email_Address", headerName: "Email", width: 200 },
    { field: "Gender", headerName: "Gender", width: 100 },
    { field: "Date_Of_Birth", headerName: "DOB", width: 140 },
    { field: "Home_District", headerName: "Home District", width: 150 },
    { field: "Mother_Toungue", headerName: "Mother Tongue", width: 150 },
    { field: "Qualification", headerName: "Qualification", width: 150 },
    { field: "Current_Post", headerName: "Current Post", width: 150 },
    { field: "Department", headerName: "Department", width: 150 },
    { field: "Current_Posting_District", headerName: "Posting District", width: 160 },
    { field: "Current_Posting_Location", headerName: "Posting Location", width: 180 },
    { field: "Joining_Service", headerName: "Joining Year", width: 130 },
    { field: "Joining_Post", headerName: "Joining Post", width: 150 },
    { field: "Joining_Date", headerName: "Joining Date", width: 150 },
    { field: "Probation_Completion", headerName: "Probation Completion", width: 170 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="contained" color="success" size="small">
            <a href='SendProfileEndUser' className='text-white' style={{ color: 'white', textDecoration: 'none' }}>
              <FaPaperPlane />
            </a>
          </Button>
        </div>
      ),
    },
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/file/filteredUpload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert(`Upload Successful: ${result.message || "File uploaded"}`);
        refetch();
      } else {
        alert(`Upload Failed: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Upload error: " + error.message);
    }
  };

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className='title-clr mb-0'>
                  <i className="bi bi-table me-2"></i> Send Profile
                </h4>
                <div className="d-flex gap-2 p-2">
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<FaUpload />}
                    onClick={() => document.getElementById("excel-file-input").click()}
                  >
                    Upload Excel
                  </Button>

                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<FaPaperPlane />}
                  >
                    Send Bulk Mail
                  </Button>
                </div>
                <input
                  id="excel-file-input"
                  type="file"
                  accept=".csv,"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                </div>
                <div style={{ height: 600, width: '100%' }}>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error loading data.</p>}
                  {!loading && !error && (
                    <DataGrid
                      rows={filteredRows.map((item, index) => ({ id: index + 1, ...item }))}
                      columns={columns}
                      pageSizeOptions={[10, 25, 50]}
                      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                      slots={{ toolbar: GridToolbar }}
                      showToolbar
                      density="comfortable"
                      disableRowSelectionOnClick
                    />
                  )}
                </div>
              </div>
              <div className='ms-5'>
                <p><strong>Note:</strong> Only training details can be updated</p>
                <p><strong>Note:</strong> Once the Excel is uploaded a pop-up with the message
                  “Link will be sent to 1560 personnel based on Excel data, confirm to proceed”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SendProfileGrid;
