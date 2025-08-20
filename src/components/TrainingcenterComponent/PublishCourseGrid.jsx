import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField,Box  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, CircularProgress } from '@mui/material';
import { BASE_URL } from '../../utils/config';

export function PublishCourseGrid() {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  function NoDataOverlay() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        color: '#888'
      }}
    >
      No data found
    </Box>
  );
}

  const [rowCount, setRowCount] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await axios.get(`${BASE_URL}/courses`, { params });

      if (response.data && response.data.data) {
        setCourses(response.data.data);
        setRowCount(response.data.total || response.data.data.length);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses();
  }, [paginationModel, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 70,
      renderCell: (params) =>
        courses.findIndex(row => row.id === params.row.id) +
        1 + paginationModel.page * paginationModel.pageSize
    },
    { field: "course_name", headerName: "Course Name", width: 180 },
    // { field: "training_center", headerName: "Training Center", width: 130 },
    { field: "venue", headerName: "Location", width: 150 },
    {
      field: "from_date",
      headerName: "From Date",
      width: 120,
      renderCell: (params) =>
        params.row.from_date
          ? new Date(params.row.from_date).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      field: "to_date",
      headerName: "To Date",
      width: 120,
      renderCell: (params) =>
        params.row.to_date
          ? new Date(params.row.to_date).toLocaleDateString("en-GB")
          : "N/A",
    },
    { field: "number_of_days", headerName: "No. of Days", width: 120 },
    { field: "contact_person_name", headerName: "Contact Person", width: 150 },
    { field: "phone_number", headerName: "Phone Number", width: 130 },
    { field: "whatsapp_number", headerName: "WhatsApp Number", width: 150 },
    { field: "email_id", headerName: "Email ID", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: () => "Draft"
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/course-details`, { state: { courseId: params.row.id } })}
        >
          View Details
        </Button>
      ),
    },
  ];

  if (loading && courses.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        <strong>Error loading courses:</strong> {error.message}
      </Alert>
    );
  }

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'><i className="bi bi-table me-2"></i> Publish Course Details</h4>
              </div>
              <div className="card-body">

                <div className="col-md-12 row p-3">
                  <div className='col-md-5 row'>
                    <div className='col-md-12'>
                      <input
                        type="text"
                        className="form-control"
                        name="search"
                        placeholder="Search by course, training center, location, date"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-md-2 row'>
                    <button
                      className="btn btn-danger"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;Search
                    </button>
                  </div>
                </div>

                <div className="table-responsive p-3">
                  <DataGrid
                    rows={courses}
                    columns={columns}
                    paginationMode="server"
                    rowCount={rowCount}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[10, 25, 50]}
                    loading={loading}
                    slots={{ noRowsOverlay: NoDataOverlay }}
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
