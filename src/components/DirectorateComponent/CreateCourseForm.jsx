import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { BASE_URL } from '../../utils/config';

function CreateCourseForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatedCourseCode, setGeneratedCourseCode] = useState('');
  const [dropdowns, setDropdowns] = useState({
    trainingCenters: [],
    locations: [],
    ranks: [],
    qualifications: [],
    documentTypes: [],
    publishToOptions: [],
    modeOfReceiving: [],
    onlineOfflineOptions: ['Online', 'Offline']
  });

  const [formData, setFormData] = useState({
    training_center: '',
    location: '',
    course_name: '',
    online_offline: 'Online',
    number_of_seats: '',
    from_date: '',
    to_date: '',
    number_of_days: '',
    last_date: '',
    internal_cut_off_date: '',
    rank: [],
    qualification: [],
    any_other: '',
    mode_of_receiving: '',
    from_date_receiving: '',
    dated: '',
    received_on: '',
    dress_code: '',
    comments: '',
    publish_to: [],
    contact_person_name: "",
    phone_number: "",
    whatsapp_number: "",
    email_id: ""
  });

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: '',
      type: '',
      refNumber: '',
      file: null,
      fileName: ''
    }
  ]);

  const [formErrors, setFormErrors] = useState({
    training_center: false,
    location: false,
    course_name: false,
    number_of_seats: false,
    from_date: false,
    to_date: false,
    last_date: false,
    internal_cut_off_date: false,
    mode_of_receiving: false,
    from_date_receiving: false,
    dated: false,
    received_on: false,
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
    publish_to: false
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/outside-courses/dropdowns`);
        setDropdowns({
          trainingCenters: response.data.trainingCenter || [],
          locations: response.data.locations || [],
          ranks: response.data.rank || [],
          qualifications: response.data.qualification || [],
          documentTypes: response.data.documentTypes || [],
          publishToOptions: response.data.publishToOptions || [],
          modeOfReceiving: response.data.modesOfReceiving || [],
          onlineOfflineOptions: response.data.onlineOfflineOptions || ['Online', 'Offline']
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

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

  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      online_offline: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === 'from_date' || name === 'to_date') {
      const fromDate = newFormData.from_date ? new Date(newFormData.from_date) : null;
      const toDate = newFormData.to_date ? new Date(newFormData.to_date) : null;

      if (fromDate && toDate) {
        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        newFormData.number_of_days = diffDays.toString();
      }

      if (newFormData.from_date) {
        const from = new Date(newFormData.from_date);
        from.setDate(from.getDate() - 1);
        newFormData.last_date = from.toISOString().split('T')[0];
      }
    }

    setFormData(newFormData);
  };

  const handleSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleTrainingCenterChange = async (e) => {
  const centerId = e.target.value;
  handleChange(e);
  
  if (centerId) {
    try {
      const response = await axios.get(`${BASE_URL}/outside-courses/generate-code-preview`, {
        params: { training_center: centerId }
      });
      setGeneratedCourseCode(response.data.code);
    } catch (err) {
      console.error("Error generating course code preview:", err);
      setGeneratedCourseCode('');
    }
  } else {
    setGeneratedCourseCode('');
  }
};

  const addDocumentRow = () => {
    setDocuments([...documents, {
      id: documents.length + 1,
      name: '',
      type: '',
      refNumber: '',
      file: null,
      fileName: ''
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

  const handleDocumentFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      training_center: !formData.training_center,
      location: !formData.location,
      course_name: !formData.course_name,
      number_of_seats: !formData.number_of_seats,
      from_date: !formData.from_date,
      to_date: !formData.to_date,
      last_date: !formData.last_date,
      internal_cut_off_date: !formData.internal_cut_off_date,
      mode_of_receiving: !formData.mode_of_receiving,
      from_date_receiving: !formData.from_date_receiving,
      dated: !formData.dated,
      received_on: !formData.received_on,
      contact_person_name: !formData.contact_person_name || !/^[a-zA-Z\s]+$/.test(formData.contact_person_name),
      phone_number: !formData.phone_number || !/^\d{10}$/.test(formData.phone_number),
      whatsapp_number: formData.whatsapp_number && !/^\d{10}$/.test(formData.whatsapp_number),
      email_id: !formData.email_id || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id),
      documents: documents.map(doc => ({
        name: !doc.name,
        type: !doc.type,
        refNumber: !doc.refNumber,
        file: !doc.file
      })),
      publish_to: formData.publish_to.length === 0
    };

    setFormErrors(newErrors);

    const hasDocumentErrors = newErrors.documents.some(docError =>
      docError.name || docError.type || docError.refNumber || docError.file
    );

    if (Object.values(newErrors).some(error => error === true) || hasDocumentErrors) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();

      const keyMapping = {
        courseName: 'course_name',
        onlineOfflineOption: 'online_offline',
        noOfSeats: 'number_of_seats',
        fromDate: 'from_date',
        toDate: 'to_date',
        noOfDays: 'number_of_days',
        lastDate: 'last_date',
        internalDate: 'internal_cutoff_date',
        rankId: 'rank',
        qualificationId: 'qualification',
        anyOther: 'any_other',
        dressCode: 'dress_code',
        comments: 'comments',
        venue: 'venue',
        publishToId: 'publish_to',
        contactPersonName: 'contact_person_name',
        phoneNumber: 'phone_number',
        whatsappNumber: 'whatsapp_number',
        emailId: 'email_id',
      };

      Object.entries(formData).forEach(([key, value]) => {
        const backendKey = keyMapping[key] || key;

        if (Array.isArray(value)) {
          formDataToSend.append(backendKey, JSON.stringify(value));
        } else {
          formDataToSend.append(backendKey, value);
        }
      });

      documents.forEach((doc) => {
        formDataToSend.append('document_names[]', doc.name);
        formDataToSend.append('document_types[]', doc.type);
        formDataToSend.append('document_refs[]', doc.refNumber);
        if (doc.file) {
          formDataToSend.append('documents', doc.file);
        }
      });

      for (const [key, val] of formDataToSend.entries()) {
        // console.log(`${key}:`, val);
      }

      const response = await axios.post(`${BASE_URL}/outside-courses`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/CourseSummary?courseId=${response.data.data.id}`);
    } catch (err) {
      console.error("Course creation failed:", err);
      alert(err.response?.data?.message || "Failed to create course");
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

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'><i className="bi bi-table me-2"></i> Create Course (Outside State)</h4>
              </div>
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2 mb-3'><h5 className='text-danger'>Course Details</h5></div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Training Center</h6></div>
                      <div className='col-md-7'>
                        <Form.Select
                          name="training_center"
                          value={formData.training_center}
                          onChange={handleChange}
                          isInvalid={formErrors.training_center}
                        >
                          <option value="">- Select -</option>
                          {dropdowns.trainingCenters.map(center => (
                            <option key={center.id} value={center.id}>{center.name}</option>
                          ))}
                        </Form.Select>
                        {formErrors.training_center && (
                          <Form.Control.Feedback type="invalid">
                            Please select a training center
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    {/* <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Course Code</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="text"
                          value={generatedCourseCode || 'Will be generated on save'}
                          readOnly
                        />
                      </div>
                    </div> */}

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Location</h6></div>
                      <div className='col-md-7'>
                        <Form.Select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          isInvalid={formErrors.location}
                        >
                          <option value="">- Select -</option>
                          {dropdowns.locations.map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                          ))}
                        </Form.Select>
                        {formErrors.location && (
                          <Form.Control.Feedback type="invalid">
                            Please select a location
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Course Name</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="text"
                          name="course_name"
                          value={formData.course_name}
                          onChange={handleChange}
                          isInvalid={formErrors.course_name}
                        />
                        {formErrors.course_name && (
                          <Form.Control.Feedback type="invalid">
                            Course name is required
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Online/Offline</h6></div>
                      <div className='col-md-7 align-self-center'>
                        <Form.Check
                          inline
                          label="Online"
                          name="online_offline"
                          type="radio"
                          id="online"
                          checked={formData.online_offline === 'Online'}
                          onChange={() => handleRadioChange('Online')}
                          className="me-2"
                        />
                        <Form.Check
                          inline
                          label="Offline"
                          name="online_offline"
                          type="radio"
                          id="offline"
                          checked={formData.online_offline === 'Offline'}
                          onChange={() => handleRadioChange('Offline')}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>No. of Seats</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="number"
                          name="number_of_seats"
                          min="1"
                          value={formData.number_of_seats}
                          onChange={handleChange}
                          isInvalid={formErrors.number_of_seats}
                        />
                        {formErrors.number_of_seats && (
                          <Form.Control.Feedback type="invalid">
                            Please enter number of seats
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>From Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="from_date"
                          value={formData.from_date}
                          onChange={handleDateChange}
                          isInvalid={formErrors.from_date}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {formErrors.from_date && (
                          <Form.Control.Feedback type="invalid">
                            Please select from date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>To Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="to_date"
                          value={formData.to_date}
                          onChange={handleDateChange}
                          isInvalid={formErrors.to_date}
                          min={formData.from_date || new Date().toISOString().split('T')[0]}
                        />
                        {formErrors.to_date && (
                          <Form.Control.Feedback type="invalid">
                            Please select to date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>No. of Days</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="number"
                          name="number_of_days"
                          min="1"
                          value={formData.number_of_days}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Last Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="last_date"
                          value={formData.last_date}
                          onChange={handleChange}
                          isInvalid={formErrors.last_date}
                          max={formData.from_date ? new Date(new Date(formData.from_date).getTime() - 86400000).toISOString().split('T')[0] : ''}
                        />
                        {formErrors.last_date && (
                          <Form.Control.Feedback type="invalid">
                            Please select last date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Internal Cut Off Date</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="internal_cut_off_date"
                          value={formData.internal_cut_off_date}
                          onChange={handleChange}
                          isInvalid={formErrors.internal_cut_off_date}
                          max={formData.last_date || (formData.from_date ? new Date(new Date(formData.from_date).getTime() - 86400000).toISOString().split('T')[0] : '')}
                        />
                        {formErrors.internal_cut_off_date && (
                          <Form.Control.Feedback type="invalid">
                            Please select internal cut off date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 row p-3">
                    <div className='col-md-12 bg-gray p-2 mb-3'><h5 className='text-danger'>Eligibility</h5></div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Rank</h6></div>
                      <div className='col-md-7'>
                        <Select
                          isMulti
                          options={dropdowns.ranks.map(rank => ({
                            value: rank.id,
                            label: rank.name
                          }))}
                          value={dropdowns.ranks
                            .filter(rank => formData.rank.includes(rank.id))
                            .map(rank => ({
                              value: rank.id,
                              label: rank.name
                            }))
                          }
                          onChange={(selected) => handleSelectChange('rank', selected)}
                          placeholder="- Select Ranks -"
                          styles={customSelectStyles}
                        />
                      </div>
                    </div>

                    

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Qualification</h6></div>
                      <div className='col-md-7'>
                        <Select
                          isMulti
                          options={dropdowns.qualifications.map(qual => ({
                            value: qual.id,
                            label: qual.name
                          }))}
                          value={dropdowns.qualifications
                            .filter(qual => formData.qualification.includes(qual.id))
                            .map(qual => ({
                              value: qual.id,
                              label: qual.name
                            }))
                          }
                          onChange={(selected) => handleSelectChange('qualification', selected)}
                          placeholder="- Select Qualifications -"
                          styles={customSelectStyles}
                        />
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Any Other</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="any_other"
                          value={formData.any_other}
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
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[0-9]{0,10}$/; 
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
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Mode of Receiving</h6></div>
                      <div className='col-md-7'>
                        <Form.Select
                          name="mode_of_receiving"
                          value={formData.mode_of_receiving}
                          onChange={handleChange}
                          isInvalid={formErrors.mode_of_receiving}
                        >
                          <option value="">- Select -</option>
                          {dropdowns.modeOfReceiving.map(mode => (
                            <option key={mode.id} value={mode.id}>{mode.name}</option>
                          ))}
                        </Form.Select>
                        {formErrors.mode_of_receiving && (
                          <Form.Control.Feedback type="invalid">
                            Please select mode of receiving
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>From</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="from_date_receiving"
                          value={formData.from_date_receiving}
                          onChange={handleChange}
                          isInvalid={formErrors.from_date_receiving}
                        />
                        {formErrors.from_date_receiving && (
                          <Form.Control.Feedback type="invalid">
                            Please select from date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Dated</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="dated"
                          value={formData.dated}
                          onChange={handleChange}
                          isInvalid={formErrors.dated}
                        />
                        {formErrors.dated && (
                          <Form.Control.Feedback type="invalid">
                            Please select dated
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Received on</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          type="date"
                          name="received_on"
                          value={formData.received_on}
                          onChange={handleChange}
                          isInvalid={formErrors.received_on}
                        />
                        {formErrors.received_on && (
                          <Form.Control.Feedback type="invalid">
                            Please select received date
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </div>

                    <div className='col-md-4 row p-2'>
                      <div className='col-md-5'><h6 className='title-clr pt-2'>Dress Code</h6></div>
                      <div className='col-md-7'>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="dress_code"
                          value={formData.dress_code}
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
                            <th>Reference Number</th>
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
                                  {dropdowns.documentTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
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
                      <h6 className="title-clr">Publish To</h6>
                    </div>

                    <div className="col-md-3">
                      <Select
                        isMulti
                        options={dropdowns.publishToOptions.map(option => ({
                          value: option.id,
                          label: option.name
                        }))}
                        value={dropdowns.publishToOptions
                          .filter(option => formData.publish_to.includes(option.id))
                          .map(option => ({
                            value: option.id,
                            label: option.name
                          }))
                        }
                        onChange={(selected) => handleSelectChange('publish_to', selected)}
                        placeholder="- Select Publish Options -"
                        styles={customSelectStyles}
                      />
                      {formErrors.publish_to && (
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateCourseForm;