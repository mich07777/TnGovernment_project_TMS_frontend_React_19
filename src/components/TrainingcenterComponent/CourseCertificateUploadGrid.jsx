import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, IconButton, Tooltip, Box, CircularProgress, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TrainingcenterCCUploadModal from '../Modal/TrainingcenterCCUploadModal';
import { BASE_URL } from '../../utils/config';

export default function CourseCertificateUploadGrid() {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const navigate = useNavigate();

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

      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      const completedCourses = response.data.data.filter(course => {
        const toDate = new Date(course.to_date);
        toDate.setHours(0, 0, 0, 0);
        return toDate < today;
      });

      setCourses(completedCourses);
      setRowCount(completedCourses.length);
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

  const handleUploadSubmit = (formData) => {
    console.log('Submitting formData:', formData);
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
    { field: "venue", headerName: "Location", width: 150 },
    // { field: "training_center", headerName: "Training Center", width: 130 },
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
    { field: "phone_number", headerName: "Phone No.", width: 150 },
    { field: "whatsapp_number", headerName: "WhatsApp No.", width: 180 },
    { field: "email_id", headerName: "Email ID", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: () => "Completed"
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const today = new Date();
        const toDate = new Date(params.row.to_date);
        const isCompleted = today > toDate;

        return isCompleted ? (
          <Tooltip title="Upload Certificate">
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedCourse(params.row);
                setModalOpen(true);
              }}
            >
              <CloudUploadIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Certificate upload not allowed until course is completed">
            <span style={{ opacity: 0.3 }}>
              <IconButton disabled>
                <CloudUploadIcon />
              </IconButton>
            </span>
          </Tooltip>
        );
      }
    }
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
                <h4 className='title-clr'>
                  <i className="bi bi-table me-2"></i>
                  Course Completion Certificate Upload
                </h4>
              </div>
              <div className="card-body">
                <div className="col-md-12 row p-3">
                  <div className='col-md-5 row'>
                    <div className='col-md-12'>
                      <input
                        type="text"
                        className="form-control"
                        name="search"
                        placeholder="Search by course, training center, location"
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
                    autoHeight
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrainingcenterCCUploadModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSubmit={handleUploadSubmit}
        course={selectedCourse}
      />
    </main>
  );
}