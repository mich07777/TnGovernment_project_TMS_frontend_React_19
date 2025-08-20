import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function MTrainingCenterForm() {
  return (
      <main className="pt-3">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-12 mb-3">
              <div className="card bg-white">
                <div className="card-header">
                  <h4 className='title-clr'><i className="bi bi-table me-2"></i> Add Training Center</h4>
                </div>
                <div className="card-body">
                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2'><h5 className='txtred'>Training Center Details</h5></div>
                    <div className='col-md-4 row p-2'>
                    <div className='col-md-5'><h6 className='title-clr pt-2'>Parent Organisation</h6></div>
                    <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Training Center Name</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>City</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Address1</h6></div>
                      <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Address2</h6></div>
                      <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>State</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Pincode</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Contact Person</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Designation</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Phone No.with STD</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Mobile No</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Whatsapp No</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control"  /></div>
                    </div>
                    <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr pt-2'>Comments</h6></div>
                        <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                    </div>
                    </div>
                  <Row>
                    <Col dir="rtl" className='txt-align-center'><Button className="btn btn-success mb-2"><a   href='/CourseSummary' className='text-white'>Add</a></Button></Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default MTrainingCenterForm