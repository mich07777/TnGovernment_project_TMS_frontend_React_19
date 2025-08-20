import { major } from '@mui/material';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import * as XLSX from 'xlsx';

function AddEditTrainingProfile() {

  const [fileName, setFileName] = useState("");
  const [profileData, setProfileData] = useState([
    { id: 1, courseName: '', completiondate: '', deptType: '', details: '', majSubject: '', othrInterest: '', qualification: '', major:'', fileName: '' }
  ]);
  

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      courseName: '',
      completiondate: '',
      deptType: '',
      details: '',
      majSubject: '',
      othrInterest: '',
      qualification: '',
      major:'',
      fileName: ''
    };
    setProfileData([...profileData, newRow]);
  };

  const handleDeleteRow = (id) => {
    setProfileData(profileData.filter(row => row.id !== id));
  };
  
  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log("Parsed Excel Data:", data);
    };
  
    reader.readAsBinaryString(file);
  
    // Update only the current row's fileName
    const updatedData = [...profileData];
    updatedData[index].fileName = file.name;
    setProfileData(updatedData);
  };
  
  return (
          <main className="pt-3">
            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-md-12 mb-3">
                  <div className="card bg-white">
                    <div className="card-header">
                      <h4 className='title-clr'><i className="bi bi-table me-2"></i> Add / Edit Training details</h4>
                    </div>
                    <div className="card-body">
                      <div className="col-md-12 row p-3">
                        <Container>
                        <Row>
                          <Col dir="rtl"><Button onClick={handleAddRow} className="btn btn-success mb-2">Add Row</Button></Col>
                        </Row>
                      </Container>
                      
                      <Table responsive bordered className='mdtbl'>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Course Name</th>
                            <th>Date of Completion</th>
                            <th>Department Type</th>
                            <th>Details</th>
                            <th>Upload Certificate</th>
                            <th>Major Subject in Academic (UG,PG,etc.,)</th>
                            <th>Other Interest</th>
                            <th>Qualification</th>
                            <th>Major</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileData.map((item, index) => (
                            <tr key={item.id}>
                              <td className='tblTitle'><label>{index + 1}</label></td>
                              <td><input type='text' className="form-control" name="courseName" defaultValue={item.courseName} /></td>
                              <td><input name="completiondate" defaultValue={item.completiondate} type="date" className="form-control" /></td>
                              <td><Form.Select aria-label="Default select example" name="deptType" defaultValue={item.deptType}>
                                <option> - Select - </option>
                                <option value="1">Within</option>
                                <option value="2">Outside</option>
                              </Form.Select></td>
                              <td><Form.Control as="textarea" rows={1} defaultValue={item.details} /></td>
                              <td>
                                <Form.Group controlId={`excelUpload-${index}`}>
                                  <Form.Label className="btn btn-info text-white mb-0">
                                    Upload
                                    <Form.Control
                                      type="file"
                                      // accept=".xlsx, .xls"
                                      hidden
                                      onChange={(e) => handleFileUpload(e, index)}
                                    />
                                  </Form.Label>
                                  {item.fileName && <p className="mt-2 text-muted">{item.fileName}</p>}
                                </Form.Group>
                              </td>

                              <td><Form.Control as="textarea" rows={1} defaultValue={item.majSubject} /></td>
                              <td><Form.Control as="textarea" rows={1} defaultValue={item.othrInterest} /></td>
                              <td><Form.Select aria-label="Default select example" name="qualification" defaultValue={item.qualification}>
                                <option> - Select - </option>
                                <option value="1">BE</option>
                                <option value="2">ME</option>
                              </Form.Select></td>
                              <td><input name="major" defaultValue={item.major} type="text" className="form-control" /></td>
                              <td><Button variant="danger" onClick={() => handleDeleteRow(item.id)}>Delete</Button></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <br></br>
                      <Container>
                        <Row>
                          <Col dir="rtl" className='txt-align-center'><Button className="btn btn-success mb-2">Save</Button></Col>
                        </Row>
                      </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
      )
    }
    
export default AddEditTrainingProfile