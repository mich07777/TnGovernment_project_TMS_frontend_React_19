import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button,Box  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, CircularProgress } from '@mui/material';
import { BASE_URL } from '../../utils/config'; 

export function PublishCourseDetailsGrid() {
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

        setCoursesData(coursesRes.data.data || coursesRes.data);
        setTotalCount(coursesRes.data.total || coursesRes.data.length || 0);
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
    status: "Draft",
    mode: course.online_offline || 'Online',
    contactPerson: course.contact_person_name,
    phoneNumber: course.phone_number,
    whatsappNumber: course.whatsapp_number,
    emailId: course.email_id
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
}
,
    { field: "courseCode", headerName: "Course Code", width: 180 },
    { field: "courseName", headerName: "Course Name", width: 180 },
    { field: "trainingCenter", headerName: "Training Center", width: 180 },
    { field: "mode", headerName: "Mode", width: 100 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "fromDate", headerName: "From Date", width: 120 },
    { field: "toDate", headerName: "To Date", width: 120 },
    { field: "numberOfDays", headerName: "No. of Days", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "contactPerson", headerName: "Contact Person", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "whatsappNumber", headerName: "WhatsApp Number", width: 150 },
    { field: "emailId", headerName: "Email ID", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="secondary"
          // onClick={() => {
          // }}
        >
          View Details
        </Button>
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
                  <i className="bi bi-table me-2"></i> Publish Outside State Course Details
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-md-2 row'>
                    <button 
                      className='btn btn-danger'
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