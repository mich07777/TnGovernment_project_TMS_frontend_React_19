import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function AddProfileForm() {
  return (
        <main className="pt-3">
          <div className="container-fluid">
            <div className="row mt-5">
              <div className="col-md-12 mb-3">
                <div className="card bg-white">
                  <div className="card-header">
                    <h4 className='title-clr'><i className="bi bi-table me-2"></i> Add Profile</h4>
                  </div>
                  <div className="card-body">
                    <div className="col-md-12 row p-3">
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Course Name</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control" name="fromDate" /></div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Date of Completion</h6></div>
                        <div className='col-md-7'><input type='date' className="form-control" name="fromDate" /></div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Within/Outside Department</h6></div>
                        <div className='col-md-7'>
                          {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="Within"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                              />
                              <Form.Check
                                inline
                                label="Outside"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Details</h6></div>
                        <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Upload Comminication</h6></div>
                        <div className='col-md-7'><Form.Control type="file" /></div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Major Subject in Academic (UG,PG,etc.,)</h6></div>
                        <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                      </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Any Other Interest</h6></div>
                        <div className='col-md-7'><Form.Control as="textarea" rows={2} /></div>
                      </div>
                        <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Qualification</h6></div>
                        <div className='col-md-7'>
                            <Form.Select className="form-control" aria-label="Default select example">
                            <option>- Select - </option>
                            <option value="1">BE</option>
                            <option value="2">MBA</option>
                            <option value="3">BSc</option>
                            </Form.Select>
                        </div>
                        </div>
                      <div className='col-md-4 row p-2'>
                        <div className='col-md-5'><h6 className='title-clr'>Major</h6></div>
                        <div className='col-md-7'><input type='text' className="form-control" name="fromDate" /></div>
                      </div>
                    </div>
                    <Row>
                      <Col dir="rtl" className='txt-align-center'><Button className="btn btn-success mb-2"><a   href='CourseSummary' className='text-white'>Save</a></Button></Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    )
  }
  
export default AddProfileForm