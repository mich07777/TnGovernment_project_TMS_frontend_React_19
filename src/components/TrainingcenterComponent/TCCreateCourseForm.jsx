import React, { useState, useMemo } from "react";
import { Button, Card, Col, Row, Form, Table, Badge, FormControl, Spinner, Alert } from 'react-bootstrap';

import axios from "axios";
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import useDropdowns from '../../hooks/useDropdowns';
import Select, { components } from 'react-select';

function TCCreateCourseForm() {
  const navigate = useNavigate();

  const requestedTables = useMemo(() => [
    'm_rank',
    'm_qualification',
    'm_doc_type',
    'm_publish_to'
  ], []);

  const { dropdowns, loading, error } = useDropdowns(requestedTables);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "",
      type: "",
      refNumber: "",
      file: null,
      fileName: ""
    }
  ]);

const [formErrors, setFormErrors] = useState({
  courseName: false,
  publishTo: false,
  contact_person_name: false,
  phone_number: false,
  whatsapp_number: false,
  email_id: false,
  documents: documents.map(() => ({
    name: false,
    type: false,
    refNumber: false,
    file: false
  })),
  noOfSeats: false,
  fromDate: false,
  toDate: false,
  lastDate: false,
  internalDate: false,
  venue: false
});

  const validateForm = () => {
    let isValid = true;

const newErrors = {
    courseName: !formData.courseName,
    publishTo: formData.publishToId.length === 0,
    contact_person_name: !formData.contact_person_name || !/^[a-zA-Z\s]+$/.test(formData.contact_person_name),
    phone_number: !formData.phone_number || !/^\d{10}$/.test(formData.phone_number),
    whatsapp_number: formData.whatsapp_number && !/^\d{10}$/.test(formData.whatsapp_number),
    email_id: !formData.email_id || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id),
    noOfSeats: !formData.noOfSeats || formData.noOfSeats <= 0,
    fromDate: !formData.fromDate,
    toDate: !formData.toDate,
    lastDate: !formData.lastDate,
    internalDate: !formData.internalDate,
    venue: !formData.venue,
    documents: documents.map(doc => ({
      name: !doc.name,
      type: !doc.type,
      refNumber: !doc.refNumber,
      file: !doc.file
    }))
  };

    const documentErrors = documents.map(doc => ({
      name: !doc.name,
      type: !doc.type,
      refNumber: !doc.refNumber,
      file: !doc.file
    }));
     setFormErrors(newErrors);

  const hasDocumentErrors = newErrors.documents.some(docError =>
    docError.name || docError.type || docError.refNumber || docError.file
  );

  if (Object.values(newErrors).some(error => error === true) || hasDocumentErrors) {
    isValid = false;
  }

  return isValid;
};

  const [formData, setFormData] = useState({
    courseName: "",
    onlineOfflineOption: "Online",
    noOfSeats: "",
    fromDate: "",
    toDate: "",
    noOfDays: "",
    lastDate: "",
    internalDate: "",
    rankId: [],
    qualificationId: [],
    anyOther: "",
    dressCode: "",
    comments: "",
    venue: "",
    documentName: "",
    documentTypeId: "",
    referenceNumber: "",
    publishToId: [],
    file: [],

    contact_person_name: "",
    phone_number: "",
    whatsapp_number: "",
    email_id: ""
  });


  const addDocumentRow = () => {
    setDocuments([...documents, {
      id: documents.length + 1,
      name: "",
      type: "",
      refNumber: "",
      file: null,
      fileName: ""
    }]);
  };

  const removeDocumentRow = (id) => {
    if (documents.length > 1) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleDocumentChange = (id, field, value) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const DropdownIndicator = () => null;
  const ClearIndicator = () => null;
  const IndicatorSeparator = () => null;

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      display: 'block',
      width: '100%',
      minHeight: 'auto',
      height: 'auto',
      padding: '0.375rem 2.25rem 0.375rem 0.75rem',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6C7293',
      backgroundColor: '#f2f0f0',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right .75rem center',
      backgroundSize: '16px 12px',
      border: '1px solid #000',
      borderColor: formErrors.publishTo ? '#dc3545' : state.isFocused ? '#f58b8b' : '#000',
      borderRadius: '5px',
      appearance: 'none',
      boxShadow: state.isFocused ? '0 0 0 .25rem rgba(235, 22, 22, 0.25)' : 'none',
      // borderColor: state.isFocused ? '#f58b8b' : '#000',
      '&:hover': {
        borderColor: formErrors.publishTo ? '#dc3545' : '#f58b8b',
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6C7293',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#d1d1d1',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  if (formErrors[name]) {
    setFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  }
};

  const handleDocumentFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("File size should be less than or equal to 2MB.");
        e.target.value = "";
        return;
      }
      setDocuments(documents.map(doc =>
        doc.id === id ? {
          ...doc,
          file: file,
          fileName: file.name
        } : doc
      ));
    }
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, onlineOfflineOption: value }));
  };


  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    const fromDate = newFormData.fromDate ? new Date(newFormData.fromDate) : null;
    const toDate = newFormData.toDate ? new Date(newFormData.toDate) : null;

    if (fromDate && toDate && fromDate > toDate) {
      if (name === 'fromDate') {
        newFormData.toDate = value;
      } else {
        newFormData.fromDate = value;
      }
    }

    const updatedFrom = newFormData.fromDate ? new Date(newFormData.fromDate) : null;
    const updatedTo = newFormData.toDate ? new Date(newFormData.toDate) : null;

    if (updatedFrom && updatedTo) {
      const diffTime = Math.abs(updatedTo - updatedFrom);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      newFormData.noOfDays = diffDays.toString();
    }

    if (newFormData.fromDate) {
      const from = new Date(newFormData.fromDate);
      from.setDate(from.getDate() - 1);
      newFormData.lastDate = from.toISOString().split('T')[0];
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      const courseData = {
        course_name: formData.courseName,
        online_offline: formData.onlineOfflineOption,
        number_of_seats: formData.noOfSeats,
        from_date: formData.fromDate,
        to_date: formData.toDate,
        number_of_days: formData.noOfDays,
        last_date: formData.lastDate,
        internal_cutoff_date: formData.internalDate,
        rank: JSON.stringify(formData.rankId),
        qualification: JSON.stringify(formData.qualificationId),
        any_other: formData.anyOther,
        dress_code: formData.dressCode,
        comments: formData.comments,
        venue: formData.venue,
        publish_to: JSON.stringify(formData.publishToId),

        contact_person_name: formData.contact_person_name,
        phone_number: formData.phone_number,
        whatsapp_number: formData.whatsapp_number,
        email_id: formData.email_id
      };

      Object.entries(courseData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      documents.forEach((doc) => {
        formDataToSend.append('document_names[]', doc.name);
        formDataToSend.append('document_types[]', doc.type);
        formDataToSend.append('document_refs[]', doc.refNumber);
        if (doc.file) {
          formDataToSend.append('documents', doc.file);
        }
      });

      const response = await axios.post(`${BASE_URL}/courses`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      navigate(`/TCCourseSummary?courseId=${response.data.data.id}`);
    } catch (error) {
      console.error("Course creation failed:", error);
      alert(error.response?.data?.message || "Failed to create course");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading form data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        <h5>Error Loading Form Data</h5>
        <p>{error.message}</p>
      </Alert>
    );
  }

  const onlineOptions = ['Online', 'Offline'];
  const rankOptions = dropdowns.rank || [];
  const qualificationOptions = dropdowns.qualification || [];
  const documentTypeOptions = dropdowns.doctype || [];
  const publishToOptions = dropdowns.publishto || [];

  const handleSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));
    if (name === 'publishToId' && selectedValues.length > 0) {
      setFormErrors(prev => ({
        ...prev,
        publishTo: false
      }));
    }
  };

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'><i className="bi bi-table me-2"></i> Create Course</h4>
              </div>
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2 mb-3'><h5 className='text-danger'>Course Details</h5></div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Course Name</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="text"
                          name="courseName"
                          value={formData.courseName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Online/Offline</h6></div>
                      <div className='col-md-7 align-self-center'>
                        {onlineOptions.map((option) => (
                          <Form.Check
                            key={option}
                            inline
                            label={option}
                            name="onlineOfflineOption"
                            type="radio"
                            id={`radio-${option}`}
                            checked={formData.onlineOfflineOption === option}
                            onChange={() => handleRadioChange(option)}
                            className="me-2"
                          />
                        ))}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>No. of Seats</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="number"
                          name="noOfSeats"
                          min="1"
                          value={formData.noOfSeats}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>From Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleDateChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>To Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleDateChange}
                          required
                          min={formData.fromDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>No. of Days</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="number"
                          name="noOfDays"
                          min="1"
                          value={formData.noOfDays}
                          onChange={handleChange}
                          required
                          readOnly
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Last Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="lastDate"
                          value={formData.lastDate}
                          onChange={handleChange}
                          required
                          max={formData.fromDate ? new Date(new Date(formData.fromDate).getTime() - 86400000).toISOString().split('T')[0] : ''}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Internal Cut Off Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="internalDate"
                          value={formData.internalDate}
                          onChange={handleChange}
                          required
                          max={formData.lastDate || (formData.fromDate ? new Date(new Date(formData.fromDate).getTime() - 86400000).toISOString().split('T')[0] : '')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2 mb-3'><h5 className='text-danger'>Eligibility</h5></div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'>
                        <h6 className='title-clr pt-2'>Rank</h6>
                      </div>
                      <div className='col-md-7'>
                        <Select
                          name="rankId"
                          value={rankOptions
                            .filter(option => formData.rankId.includes(option.id.toString()))
                            .map(option => ({
                              value: option.id.toString(),
                              label: option.name
                            }))
                          }
                          onChange={(selectedOptions) => handleSelectChange('rankId', selectedOptions)}
                          options={rankOptions.map(item => ({
                            value: item.id.toString(),
                            label: item.name
                          }))}
                          isMulti
                          placeholder="- Select Ranks -"
                          classNamePrefix="select"
                          styles={customSelectStyles}
                          components={{
                            DropdownIndicator,
                            ClearIndicator,
                            IndicatorSeparator
                          }}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Qualification</h6></div>
                      <div className='col-md-7'>
                        <Select
                          name="qualificationId"
                          value={qualificationOptions
                            .filter(option => formData.qualificationId.includes(option.id.toString()))
                            .map(option => ({
                              value: option.id.toString(),
                              label: option.name
                            }))
                          }
                          onChange={(selectedOptions) => handleSelectChange('qualificationId', selectedOptions)}
                          options={qualificationOptions.map(item => ({
                            value: item.id.toString(),
                            label: item.name
                          }))}
                          isMulti
                          placeholder="- Select Qualifications -"
                          classNamePrefix="select"
                          styles={customSelectStyles}
                          components={{
                            DropdownIndicator,
                            ClearIndicator,
                            IndicatorSeparator
                          }}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Any Other</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="anyOther"
                          value={formData.anyOther}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* contact details */}

                  <div className="col-md-12 row p-3">
                    <div className="col-md-12 bg-gray p-2 mb-3">
                      <h5 className="text-danger">Contact Details</h5>
                    </div>

                    <div className="col-md-4 row p-2">
                      <div className="col-md-5">
                        <h6 className="title-clr pt-2">Contact Person</h6>
                      </div>
                      <div className="col-md-7">
                        {/* <Form.Control
                          type="text"
                          name="contact_person_name"
                          value={formData.contact_person_name}
                          onChange={handleChange}
                        /> */}
                        <Form.Control
                          type="text"
                          name="contact_person_name"
                          value={formData.contact_person_name}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[a-zA-Z\s]*$/; 
                            if (regex.test(value)) {
                              handleChange(e);
                            }
                          }}
                          isInvalid={formErrors.contact_person_name}
                        />
                        {formErrors.contact_person_name && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid contact person name
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 row p-2">
                      <div className="col-md-5">
                        <h6 className="title-clr pt-2">Phone Number</h6>
                      </div>
                      <div className="col-md-7">
                        {/* <Form.Control
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                        /> */}
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[0-9]{0,10}$/; // allows up to 10 digits
                            if (regex.test(value)) {
                              handleChange(e);
                            }
                          }}
                          isInvalid={formErrors.phone_number}
                        />
                        {formErrors.phone_number && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid 10-digit phone number
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 row p-2">
                      <div className="col-md-5">
                        <h6 className="title-clr pt-2">WhatsApp Number</h6>
                      </div>
                      <div className="col-md-7">
                        {/* <Form.Control
                          type="text"
                          name="whatsapp_number"
                          value={formData.whatsapp_number}
                          onChange={handleChange}
                        /> */}
                        <Form.Control
                          type="text"
                          name="whatsapp_number"
                          value={formData.whatsapp_number}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[0-9]{0,10}$/; 
                            if (regex.test(value)) {
                              handleChange(e);
                            }
                          }}
                          isInvalid={formErrors.whatsapp_number}
                        />
                        {formErrors.whatsapp_number && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid 10-digit WhatsApp number
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 row p-2">
                      <div className="col-md-5">
                        <h6 className="title-clr pt-2">Email ID</h6>
                      </div>
                      <div className="col-md-7">
                        <Form.Control
                          type="email"
                          name="email_id"
                          value={formData.email_id}
                          onChange={handleChange}
                          isInvalid={formErrors.email_id}
                        />
                        {formErrors.email_id && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email address
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>
                  </div>


                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2 mb-3'><h5 className='text-danger'>Other Details</h5></div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Dress Code</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="dressCode"
                          value={formData.dressCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Comments</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="comments"
                          value={formData.comments}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Venue</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="text"
                          name="venue"
                          value={formData.venue}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12 row p-3">
                      <div className='col-md-12 bg-gray p-2 mb-3'>
                        <h5 className='text-danger'>Document Details</h5>
                      </div>

                      <div className="text-end mb-3">
                        <Button
                          variant="success"
                          onClick={addDocumentRow}
                          className="me-2"
                        >
                          <i className="bi bi-plus"></i> Add
                        </Button>
                      </div>

                      <div className="col-md-12">
                        <Table bordered hover responsive>
                          <thead>
                            <tr>
                              <th>Document Name</th>
                              <th>Document Type</th>
                              <th>Refernce Number</th>
                              <th>Upload</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((doc, index) => (
                              <tr key={doc.id}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={doc.name}
                                    onChange={(e) => handleDocumentChange(doc.id, 'name', e.target.value)}
                                    placeholder="Document name"
                                    isInvalid={formErrors.documents[index]?.name}
                                  />
                                  {formErrors.documents[index]?.name && (
                                    <Form.Control.Feedback type="invalid">
                                      Document name required
                                    </Form.Control.Feedback>
                                  )}
                                </td>
                                <td>
                                  <Form.Select
                                    value={doc.type}
                                    onChange={(e) => handleDocumentChange(doc.id, 'type', e.target.value)}
                                    isInvalid={formErrors.documents[index]?.type}
                                  >
                                    <option value="">- Select Type -</option>
                                    {documentTypeOptions.map(item => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                  </Form.Select>
                                  {formErrors.documents[index]?.type && (
                                    <Form.Control.Feedback type="invalid">
                                      Document type required
                                    </Form.Control.Feedback>
                                  )}
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={doc.refNumber}
                                    onChange={(e) => handleDocumentChange(doc.id, 'refNumber', e.target.value)}
                                    placeholder="Reference number"
                                    isInvalid={formErrors.documents[index]?.refNumber}
                                  />
                                  {formErrors.documents[index]?.refNumber && (
                                    <Form.Control.Feedback type="invalid">
                                      Reference number required
                                    </Form.Control.Feedback>
                                  )}
                                </td>
                                <td>
                                  <Form.Control
                                    type="file"
                                    onChange={(e) => handleDocumentFileChange(doc.id, e)}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpeg,.jpg,.png,.txt"
                                    isInvalid={formErrors.documents[index]?.file}
                                  />
                                  {formErrors.documents[index]?.file && (
                                    <Form.Control.Feedback type="invalid">
                                      File upload required
                                    </Form.Control.Feedback>
                                  )}
                                  {doc.fileName && (
                                    <small className="text-muted">{doc.fileName}</small>
                                  )}
                                </td>
                                <td className="text-center">
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeDocumentRow(doc.id)}
                                    disabled={documents.length <= 1}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    <div className="row col-md-12 p-2 align-items-center">
                      <div className="col-md-1">
                        <h6 className="title-clr ">Publish To</h6>
                      </div>

                      <div className="col-md-3">
                        <Select
                          name="publishToId"
                          value={publishToOptions
                            .filter(option => formData.publishToId.includes(option.id.toString()))
                            .map(option => ({
                              value: option.id.toString(),
                              label: option.name
                            }))
                          }
                          onChange={(selectedOptions) => handleSelectChange('publishToId', selectedOptions)}
                          options={publishToOptions.map(item => ({
                            value: item.id.toString(),
                            label: item.name
                          }))}
                          isMulti
                          placeholder="- Select Publish -"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          styles={customSelectStyles}
                          components={{
                            DropdownIndicator,
                            ClearIndicator,
                            IndicatorSeparator
                          }}
                        />
                        {formErrors.publishTo && (
                          <div className="invalid-feedback d-block">
                            Please select at least one publish option
                          </div>
                        )}
                      </div>

                      <div className="col-md-3 text-end">
                        <Button
                          variant="success"
                          type="submit"
                          className="px-4 py-2"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TCCreateCourseForm;