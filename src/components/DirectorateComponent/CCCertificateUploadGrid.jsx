import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, IconButton, Tooltip, CircularProgress, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BASE_URL } from '../../utils/config';
import DirectorateCCUploadModal from '../Modal/DirecterateCCUploadModal';

export default function CCCertificateUploadGrid() {
  const [coursesData, setCoursesData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [dropdowns, setDropdowns] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, dropdownRes] = await Promise.all([
          axios.get(`${BASE_URL}/outside-courses`, {
            params: { 
              page: paginationModel.page + 1, 
              limit: paginationModel.pageSize,
              search: searchTerm 
            }
          }),
          axios.get(`${BASE_URL}/outside-courses/dropdowns`)
        ]);

        if (!coursesRes.data) {
          throw new Error('Invalid response from courses fetch');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredCourses = (coursesRes.data.data || coursesRes.data).filter(course => {
          const toDate = new Date(course.to_date);
          toDate.setHours(0, 0, 0, 0);
          return toDate < today;
        });

        setCoursesData(filteredCourses);
        setTotalCount(filteredCourses.length);

        setDropdowns(dropdownRes.data || {});
      } catch (err) {
        console.error('Error during fetch:', err);
        setError(err);
        setCoursesData([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  };

  const handleUploadSubmit = (formData) => {
    // Send formData to backend via axios/fetch
    console.log('Submitting formData:', formData);
    // You can add your API call here to upload the certificate
  };

  if (loading) {
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

  const formattedData = coursesData.map((course, index) => {
    const trainingCenterMap = dropdowns?.trainingCenter?.reduce((map, tc) => {
      map[tc.id] = tc.name;
      return map;
    }, {});

    const locationMap = dropdowns?.locations?.reduce((map, loc) => {
      map[loc.id] = loc.name;
      return map;
    }, {});

    const trainingCenterName = course.training_center 
      ? trainingCenterMap?.[course.training_center] || 'N/A'
      : 'N/A';

    const locationName = locationMap?.[course.location] || 'N/A';

    return {
      id: course.id || index,
      courseCode: course.course_code || 'N/A',
      courseName: course.course_name || 'N/A',
      trainingCenter: trainingCenterName,
      location: locationName,
      fromDate: course.from_date ? new Date(course.from_date).toLocaleDateString() : 'N/A',
      toDate: course.to_date ? new Date(course.to_date).toLocaleDateString() : 'N/A',
      numberOfDays: course.number_of_days || 'N/A',
      status: "Course Completed", 
      mode: course.online_offline || 'Online',
      contactPerson: course.contact_person_name || 'N/A',
      phoneNumber: course.phone_number || 'N/A',
      whatsappNumber: course.whatsapp_number || 'N/A',
      emailId: course.email_id || 'N/A',
      action: { btn1: "Upload" } 
    };
  });

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        return (paginationModel.page * paginationModel.pageSize) + index + 1;
      },
    },
    { field: "courseCode", headerName: "Course Code", width: 180 },
    { field: "courseName", headerName: "Course Name", width: 180 },
    { field: "trainingCenter", headerName: "Training Center", width: 130 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "contactPerson", headerName: "Contact Person", width: 120 },
    { field: "phoneNumber", headerName: "Phone No.", width: 150 },
    { field: "whatsappNumber", headerName: "WhatsApp No.", width: 180 },
    { field: "emailId", headerName: "Email ID", width: 180 },
    { field: "fromDate", headerName: "From Date", width: 120 },
    { field: "toDate", headerName: "To Date", width: 120 },
    { field: "numberOfDays", headerName: "No. of Days", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.action?.btn1 && (
            <Tooltip title="Upload">
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
          )}
        </div>
      ),
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
                  Course Completion Certificate Upload
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
                        placeholder='Search by course, training center, location'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-md-2 row'>
                    <button 
                      className='btn btn-danger'
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;Search
                    </button>
                  </div>
                </div>
                <div className="table-responsive p-3">
                  <DataGrid
                    rows={formattedData}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[10, 25, 50]}
                    rowCount={totalCount}
                    paginationMode="server"
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
      <DirectorateCCUploadModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSubmit={handleUploadSubmit}
        course={selectedCourse}
      />
    </main>
  );
}
