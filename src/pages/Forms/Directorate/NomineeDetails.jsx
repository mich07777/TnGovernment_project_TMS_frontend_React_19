import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, IconButton, Box, CircularProgress, Alert } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TrainingcenterCCUploadModal from '../../../components/Modal/TrainingcenterCCUploadModal';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import CenterNavBar from '../../NavBar/CenterNavBar'

function NomineeDetails() {
  const hardcodedCourses = [
    {
      id: 1,
      name: "Advanced React Development",
      contact_person_name: "John Doe",
      phone_number: "9876543210",
      whatsapp_number: "9876543210",
      email_id: "john@example.com",
      to_date: "2023-12-31",
      training_center: "Tech Training Institute",
      seats: 30,
      nominations: 25,
      course_code: "REACT101"
    },
    {
      id: 2,
      name: "Node.js Fundamentals",
      contact_person_name: "Jane Smith",
      phone_number: "8765432109",
      whatsapp_number: "8765432109",
      email_id: "jane@example.com",
      to_date: "2023-11-30",
      training_center: "Web Dev Academy",
      seats: 25,
      nominations: 20,
      course_code: "NODE202"
    },
    {
      id: 3,
      name: "Python for Data Science",
      contact_person_name: "Mike Johnson",
      phone_number: "7654321098",
      whatsapp_number: "7654321098",
      email_id: "mike@example.com",
      to_date: "2024-01-15",
      training_center: "Data Science Institute",
      seats: 20,
      nominations: 18,
      course_code: "PYTHON303"
    }
  ];

  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [courseDetails, setCourseDetails] = React.useState({
    trainingCenter: "Tech Training Institute",
    course: "Advanced React Development",
    seats: 30,
    nominations: 25,
    courseId: "REACT101"
  });
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

  const fetchCourses = () => {
    try {
      setLoading(true);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let filteredCourses = hardcodedCourses.filter(course => {
        const toDate = new Date(course.to_date);
        toDate.setHours(0, 0, 0, 0);
        return toDate < today;
      });

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredCourses = filteredCourses.filter(course =>
          course.name.toLowerCase().includes(query) ||
          course.training_center.toLowerCase().includes(query)
        )
      }

      setCourses(filteredCourses);
      setRowCount(filteredCourses.length);

      if (filteredCourses.length > 0) {
        const firstCourse = filteredCourses[0];
        setCourseDetails({
          trainingCenter: firstCourse.training_center || "N/A",
          course: firstCourse.name || "N/A",
          seats: firstCourse.seats || "N/A",
          nominations: firstCourse.nominations || "N/A",
          courseId: firstCourse.course_code || "N/A"
        });
      }
    } catch (err) {
      console.error('Error processing courses:', err);
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


  const handleUploadSubmit = async (formData) => {
    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append('document', formData.file);
      uploadData.append('course_id', selectedCourse.id);
      uploadData.append('nomine_id', formData.nomineeId);

      console.log('Uploading to:', `${BASE_URL}/outside-courses/upload-certificate`);

      const response = await axios.post(
        `${BASE_URL}/outside-courses/upload-certificate`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.data.status === 'success') {
        alert('Certificate uploaded successfully!');
        setModalOpen(false);
        fetchCourses();
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message ||
        err.message ||
        'Failed to upload certificate';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
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
    { field: "name", headerName: "Name", width: 180 },
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
    <>
      <CenterNavBar />
      <div className='container'>
        <main className="pt-3">
          <div className="container-fluid">
            <div className="row mt-5">
              <div className="col-md-12 mb-3">
                <div className="card bg-white">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <button
                      className="btn mt-3 btn-outline-fill"
                      onClick={() => navigate(-1)}
                      style={{
                        color: '#3f51b5',
                        border: '1px solid #3f51b5',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <h4 className='title-clr m-0'>
                      <i className="bi bi-table me-2"></i>
                      Course Completion Certificate Upload
                    </h4>
                    <div></div>
                  </div>
                  <div className="card-body">
                    <div className="col-md-12 row p-3">
                      <div className='col-md-12'>
                        <h3 className='txtred border-2'>Course ID: {courseDetails.courseId}</h3>
                      </div>
                    </div>

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
                      <div className='col-md-12 d-flex justify-content-center gap-5'>
                        <button className='btn btn-info text-white mt-3'>
                          Download as Excel
                        </button>
                        <button className='btn btn-light mt-3'>Forward to DG Approval</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Upload Modal */}
        <TrainingcenterCCUploadModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          handleSubmit={handleUploadSubmit}
          course={selectedCourse}
        />
        {/* Multiple Modal */}

        {/* <TrainingcenterCCUploadModal
        open={isOpen}
        handleClose={handleClose}
        handleSubmit={uploadHandler}
        multiple={true} // set false if single
      /> */}
      </div>
    </>
  );
}

export default NomineeDetails;