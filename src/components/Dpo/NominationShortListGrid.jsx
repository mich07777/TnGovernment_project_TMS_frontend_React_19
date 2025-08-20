import React from 'react'
import { Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPaperPlane } from "react-icons/fa";


function NominationShortListGrid() {
 const navigate = useNavigate();
    const columns = [
     { field: "id", headerName: "S.No", width: 70 },
     { field: "courseName", headerName: "Course Name", width: 180 },
     { field: "trainingCenter", headerName: "Training Center", width: 130 },
     { field: "location", headerName: "Location", width: 150 },
     { field: "stateinout", headerName: "Outside / Inside State", width: 150 },
     { field: "fromDate", headerName: "From Date", width: 180 },
     { field: "toDate", headerName: "To Date", width: 180 },
     { field: "noOfDays", headerName: "No. of Days", width: 180 },
     { field: "status", headerName: "Status", width: 120 },
     {
       field: "action",
       headerName: "Actions",
       width: 150,
       renderCell: (params) => (
         <div>
           {params.value?.btn1 && (
             <>
               <Tooltip title="Send For Approval">
                 <IconButton
                   color="primary"
                   onClick={() => navigate(`/ViewNominationList`)}
                 >
                  <FaEye />
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
       courseName: 'Cyber Security',
       trainingCenter: 'Bhopal',
       location: 'Bhopal',
       stateinout:'Inside',
       fromDate: "2024-04-01",
       toDate: "2024-04-05",
       noOfDays: 5,
       status: "Pending",
       action: { btn1: "Upload" },
     },
     {
       id: 2,
       courseName: 'Cyber Security',
       trainingCenter: 'Bhopal',
       location: 'Bhopal',
       stateinout:'Outside',
       fromDate: "2024-04-06",
       toDate: "2024-04-10",
       noOfDays: 5,
       status: "Approved",
       action: { btn1: "Upload"},
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
                   Nomination Shortlist
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
 
export default NominationShortListGrid