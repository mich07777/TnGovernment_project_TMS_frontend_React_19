import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Button } from "@mui/material";
import {  Card, Col, Form, Row } from 'react-bootstrap'
import { FaCheck, FaCross, FaTimes } from 'react-icons/fa';

function IgpApprovalSummaryDetails() {
// Dummy data

const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "nominee", headerName: "Nominee", width: 180 },
    { field: "rank", headerName: "Rank ", width: 130 },
    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "eligibilityChecked", headerName: "Eligibility Checked", width: 120 },
    {
      field: "action",
      headerName: "Approved / Reject",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value?.btn1 && (
            <Button variant="contained" color="success" onClick={() => handleAction(params.row, "ok")}>
            <a href='IgpApprovalSummary' className='text-white'><FaCheck /></a>
            </Button>
          )}&nbsp;
          {params.value?.btn2 && (
            <Button variant="contained" color="error" onClick={() => handleAction(params.row, "reject")}>
            <a href='#' className='text-white'><FaTimes /></a>
            </Button>
          )}
        </div>
      ),
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.value?.opt =='yes' && (
            <Form.Control as="textarea" className='mt-2' rows={1} />
          )}
        </div>
      ),
    },
  ];
    const GridData = [
        {
          id: 1,
          nominee: 'Hariharan',
          rank: 'SI',
          mobileNo: '9876543210',
          eligibilityChecked: "Yes",
          action: { btn1: "ok", btn2:"reject" },
          comments:{opt:"yes"},
        },
        {
          id: 2,
          nominee: 'Srikanth',
          rank: 'SI',
          mobileNo: '9876598765',
          eligibilityChecked: "Yes",
          action: { btn1: "ok", btn2:"reject" },
          comments:{opt:"no"},
        },
        // Add others similarly
      ];
    
    return (
      <main className="pt-3">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-12 mb-3">
              <div className="card bg-white">
                <div className="card-header">
                  <h4 className='title-clr'><i className="bi bi-table me-2"></i> Summary for IGP Approval</h4>
                </div>
                <div className="card-body">
                  <div className="col-md-12 row p-3">
                  <Card>
                    <Card.Body>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Course ID: </h6></div>
                        <div className='col-md-7'><p>Bhopal/CybSec/042025/020</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Course Name: </h6></div>
                        <div className='col-md-7'><p>Cyber Security Course</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Location: </h6></div>
                        <div className='col-md-7'><p>Bhopal</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>From Date: </h6></div>
                        <div className='col-md-7'><p>23/04/2025</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>To Date: </h6></div>
                        <div className='col-md-7'><p>25/04/2025</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Training Center: </h6></div>
                        <div className='col-md-7'><p>Bhopal Training Center</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>No of Seats: </h6></div>
                        <div className='col-md-7'><p>2</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Qualification: </h6></div>
                        <div className='col-md-7'><p>B.E, B.Tech</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Rank: </h6></div>
                        <div className='col-md-7'><p>SI</p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Other Qualification: </h6></div>
                        <div className='col-md-7'><p>Cyber Security Knowledge </p></div>
                      </div>
                      <div className='col-md-12 row'>
                        <div className='col-md-3'><h6 className='txtred'>Units: </h6></div>
                        <div className='col-md-7'><p>All Units </p></div>
                      </div>
                      <hr></hr>
                      <div className='col-md-12 mt-3'>
                        <h4 className='title-clr'>Nominated List</h4>
                      </div>
                      <div className='col-md-12 mt-3'>
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
                      <div className='col-md-12 mt-3'>
                        <Row>
                          <Col  className='txt-align-right'><Button variant='contained' color='success'>Save</Button></Col>
                          <Col  className='txt-align-left'><Button variant='contained' color='info'><a href='IgpApproval' className='text-white'>Approve</a></Button></Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
  
export default IgpApprovalSummaryDetails