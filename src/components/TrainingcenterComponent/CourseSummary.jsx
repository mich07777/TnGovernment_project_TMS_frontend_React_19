import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Row, Form, Table, Badge, FormControl, Spinner, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import Select, { components } from 'react-select';
import useDropdowns from '../../hooks/useDropdowns';

function CourseSummary() {
  const requestedTables = useMemo(() => [
    'm_rank',
    'm_qualification',
    'm_doc_type',
    'm_publish_to'
  ], []);

  const { dropdowns, loading: dropdownLoading, error: dropdownError } = useDropdowns(requestedTables);
  const [course, setCourse] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});
  const [editingDocumentId, setEditingDocumentId] = useState(null);
  const [editedDocument, setEditedDocument] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');

  const handlePublish = () => {
    navigate('/TCPublishCourseDetails', { state: { courseId } });
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
      borderRadius: '5px',
      appearance: 'none',
      boxShadow: state.isFocused ? '0 0 0 .25rem rgba(235, 22, 22, 0.25)' : 'none',
      // borderColor: state.isFocused ? '#f58b8b' : '#000',
      '&:hover': {
        borderColor: '#f58b8b',
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-GB');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const handleInputChange = (field, value) => {
    setEditedCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field, value) => {
    const updatedCourse = { ...editedCourse, [field]: value };

    const fromDate = updatedCourse.from_date ? new Date(updatedCourse.from_date) : null;
    const toDate = updatedCourse.to_date ? new Date(updatedCourse.to_date) : null;

    if (fromDate && toDate && fromDate > toDate) {
      if (field === 'from_date') {
        updatedCourse.to_date = value;
      } else if (field === 'to_date') {
        updatedCourse.from_date = value;
      }
    }

    if (updatedCourse.from_date && updatedCourse.to_date) {
      const d1 = new Date(updatedCourse.from_date);
      const d2 = new Date(updatedCourse.to_date);
      const diff = Math.abs(d2 - d1);
      updatedCourse.number_of_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    }

    if (updatedCourse.from_date) {
      const last = new Date(updatedCourse.from_date);
      last.setDate(last.getDate() - 1);
      updatedCourse.last_date = last.toISOString().split('T')[0];
    }

    setEditedCourse(updatedCourse);
  };

  const formatDateToDDMMYYYY = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSelectChange = (field, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => ({
      id: parseInt(option.value),
      name: option.label
    })) : [];
    setEditedCourse(prev => ({ ...prev, [field]: selectedValues }));
  };

  useEffect(() => {
    if (!courseId) {
      setError(new Error("No course ID provided in URL"));
      setLoading(false);
      return;
    }

    async function fetchCourse() {
      try {
        const response = await axios.get(`${BASE_URL}/courses/${courseId}?include_documents=true`);
        const courseData = response.data.data || response.data;

        if (!courseData) throw new Error("Course data not found in response");

        const parsedCourseData = {
          ...courseData,
          rank: Array.isArray(courseData.rank) ? courseData.rank : JSON.parse(courseData.rank || '[]'),
          qualification: Array.isArray(courseData.qualification) ? courseData.qualification : JSON.parse(courseData.qualification || '[]'),
          publish_to: Array.isArray(courseData.publish_to) ? courseData.publish_to : JSON.parse(courseData.publish_to || '[]'),
        };

        setCourse(parsedCourseData);
        setEditedCourse(parsedCourseData);
        setDocuments(courseData.documents || []);
      } catch (error) {
        console.error("Failed to fetch course", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditingDocumentId(null);
    setEditedDocument({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCourse(course);
    setEditingDocumentId(null);
    setEditedDocument({});
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append('course_name', editedCourse.course_name || '');
      formData.append('online_offline', editedCourse.online_offline || 'Online');
      formData.append('number_of_seats', editedCourse.number_of_seats || '');
      formData.append('from_date', editedCourse.from_date || '');
      formData.append('to_date', editedCourse.to_date || '');
      formData.append('number_of_days', editedCourse.number_of_days || '');
      formData.append('last_date', editedCourse.last_date || '');
      formData.append('internal_cutoff_date', editedCourse.internal_cutoff_date || '');
      formData.append('rank', JSON.stringify(editedCourse.rank?.map(r => r.id) || []));
      formData.append('qualification', JSON.stringify(editedCourse.qualification?.map(q => q.id) || []));
      formData.append('any_other', editedCourse.any_other || '');
      formData.append('dress_code', editedCourse.dress_code || '');
      formData.append('comments', editedCourse.comments || '');
      formData.append('venue', editedCourse.venue || '');
      formData.append('publish_to', JSON.stringify(editedCourse.publish_to?.map(p => p.id) || []));

      formData.append('contact_person_name', editedCourse.contact_person_name || '');
      formData.append('phone_number', editedCourse.phone_number || '');
      formData.append('whatsapp_number', editedCourse.whatsapp_number || '');
      formData.append('email_id', editedCourse.email_id || '');
      

      documents.forEach(doc => {
        if (doc.file instanceof File) {
          formData.append('document_names[]', doc.name);
          formData.append('document_types[]', doc.type);
          formData.append('document_refs[]', doc.refNumber);
          formData.append('documents', doc.file);
        }
      });

      const response = await axios.put(`${BASE_URL}/courses/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success') {
        const courseResponse = await axios.get(`${BASE_URL}/courses/${courseId}`);
        const raw = courseResponse.data.data;

        const updatedCourse = {
          ...raw,
          rank: Array.isArray(raw.rank) ? raw.rank : JSON.parse(raw.rank || '[]'),
          qualification: Array.isArray(raw.qualification) ? raw.qualification : JSON.parse(raw.qualification || '[]'),
          publish_to: Array.isArray(raw.publish_to) ? raw.publish_to : JSON.parse(raw.publish_to || '[]'),
        };

        const updatedDocs = (raw.documents || []).map((doc) => ({
          ...doc,
          name: doc.document_name,
          type: doc.document_type?.id || doc.document_type_id,
          refNumber: doc.reference_number,
          file: null
        }));

        setCourse(updatedCourse);
        setEditedCourse(updatedCourse);
        setDocuments(updatedDocs);
        setIsEditing(false);
        // alert('Course updated successfully');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert(`Failed to update course: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditDocument = (document) => {
    setEditingDocumentId(document.id);
    setEditedDocument({
      document_name: document.document_name,
      document_type_id: document.document_type?.id || document.document_type_id || '',
      reference_number: document.reference_number,
      file: null,
      existingFileName: document.file_name
    });
  };

  const handleCancelEditDocument = () => {
    setEditingDocumentId(null);
    setEditedDocument({});
  };

  const handleUpdateDocument = async () => {
    const formData = new FormData();
    formData.append('document_name', editedDocument.document_name);
    formData.append('document_type_id', editedDocument.document_type_id);
    formData.append('reference_number', editedDocument.reference_number);

    if (editedDocument.file) {
      formData.append('document', editedDocument.file);
    }

    try {
      const { data } = await axios.put(
        `${BASE_URL}/courses/${courseId}/documents/${editingDocumentId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setDocuments(prev => prev.map(doc =>
        doc.id === editingDocumentId
          ? {
            ...doc,
            document_name: editedDocument.document_name,
            document_type: dropdowns.doctype.find(d => d.id == editedDocument.document_type_id),
            reference_number: editedDocument.reference_number,
            file_name: editedDocument.file?.name || doc.file_name
          }
          : doc
      ));

      handleCancelEditDocument();
      alert('Updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteDocument = async (docId) => {
    const confirmed = window.confirm('Are you sure you want to delete this document?');
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${BASE_URL}/courses/${courseId}/documents/${docId}`);

      if (response.data.status === 'success') {
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
        alert('Document deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Failed to delete document');
    }
  };

  const renderEditableField = (field, value) => {
    return isEditing ? (
      <FormControl
        type="text"
        value={value || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    ) : (
      value || '-'
    );
  };

  const renderEditableTextarea = (field, value) => {
    return isEditing ? (
      <Form.Control
        as="textarea"
        rows={2}
        value={value || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    ) : (
      value || '-'
    );
  };

  const renderEditableSelect = (field, value, options) => {
    if (!isEditing) {
      if (!value || value.length === 0) return '-';
      return value.map(item => item.name).join(', ') || '-';
    }

    return (
      <Select
        value={value.map(item => ({ value: item.id, label: item.name }))}
        onChange={(selected) => handleSelectChange(field, selected)}
        options={options?.map(item => ({ value: item.id, label: item.name })) || []}
        isMulti
        classNamePrefix="select"
        placeholder={`Select ${field.replace('_', ' ')}`}
        styles={customSelectStyles}
        components={{
          DropdownIndicator,
          ClearIndicator,
          IndicatorSeparator
        }}
      />
    );
  };

  const renderEditableDate = (field, value) => {
    const maxDate = (() => {
      if (field === 'last_date') {
        return editedCourse.from_date
          ? new Date(new Date(editedCourse.from_date).getTime() - 86400000).toISOString().split('T')[0]
          : '';
      }
      if (field === 'internal_cutoff_date') {
        if (editedCourse.last_date) {
          return new Date(new Date(editedCourse.last_date).getTime() - 86400000).toISOString().split('T')[0];
        } else if (editedCourse.from_date) {
          return new Date(new Date(editedCourse.from_date).getTime() - 86400000).toISOString().split('T')[0];
        }
      }
      return '';
    })();

    return isEditing ? (
      <FormControl
        type="date"
        value={value ? value.split('T')[0] : ''}
        onChange={(e) => handleDateChange(field, e.target.value)}
        max={maxDate}
      />
    ) : (
      formatDateToDDMMYYYY(value)
    );
  };

  if (loading || dropdownLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading course details...</p>
      </div>
    );
  }

  if (error || dropdownError) {
    return (
      <Alert variant="danger">
        <h5>Error Loading Data</h5>
        <p>{error?.message || dropdownError?.message}</p>
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert variant="warning">
        <h5>No Course Data Found</h5>
        <p>No course was found with ID: {courseId}</p>
      </Alert>
    );
  }

  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className='title-clr'>
                  <i className="bi bi-table me-2"></i> Summary of Course: {course.course_name}
                </h4>
                {isEditing ? (
                  <div>
                    <Button variant="success" onClick={handleSave} className="me-2">
                      <i className="bi bi-save me-1"></i> Save
                    </Button>
                    <Button variant="danger" onClick={handleCancelEdit}>
                      <i className="bi bi-x-circle me-1"></i> Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="success" onClick={handleEditClick}>
                    <i className="bi bi-pencil-square me-1"></i> Edit
                  </Button>
                )}
              </div>
              <div className="card-body">
                <div className="col-md-12 p-3">
                  <Card>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Course Name: </h6>
                          <div>{renderEditableField('course_name', editedCourse.course_name)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Mode: </h6>
                          <div>
                            {isEditing ? (
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Online"
                                  name="online_offline"
                                  checked={editedCourse.online_offline === 'Online'}
                                  onChange={() => handleInputChange('online_offline', 'Online')}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Offline"
                                  name="online_offline"
                                  checked={editedCourse.online_offline === 'Offline'}
                                  onChange={() => handleInputChange('online_offline', 'Offline')}
                                />
                              </div>
                            ) : (
                              editedCourse.online_offline || '-'
                            )}
                          </div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>No of Seats: </h6>
                          <div>{renderEditableField('number_of_seats', editedCourse.number_of_seats)}</div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>From Date: </h6>
                          <div>{renderEditableDate('from_date', editedCourse.from_date)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>To Date: </h6>
                          <div>{renderEditableDate('to_date', editedCourse.to_date)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>No of Days: </h6>
                          <div>
                            {isEditing ? (
                              <FormControl
                                type="number"
                                value={editedCourse.number_of_days || ''}
                                readOnly
                              />
                            ) : (
                              editedCourse.number_of_days || '-'
                            )}
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Last Date: </h6>
                          <div>{renderEditableDate('last_date', editedCourse.last_date)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Internal Cut Off Date: </h6>
                          <div>{renderEditableDate('internal_cutoff_date', editedCourse.internal_cutoff_date)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Rank: </h6>
                          <div>{renderEditableSelect('rank', editedCourse.rank, dropdowns.rank || [])}</div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Qualification: </h6>
                          <div>{renderEditableSelect('qualification', editedCourse.qualification, dropdowns.qualification || [])}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Other Qualification: </h6>
                          <div>{renderEditableTextarea('any_other', editedCourse.any_other)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Dress Code: </h6>
                          <div>{renderEditableTextarea('dress_code', editedCourse.dress_code)}</div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Comments: </h6>
                          <div>{renderEditableTextarea('comments', editedCourse.comments)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Location: </h6>
                          <div>{renderEditableField('venue', editedCourse.venue)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>publish To: </h6>
                          <div>{renderEditableSelect('publish_to', editedCourse.publish_to, dropdowns.publishto || [])}</div>
                        </Col>
                      </Row>

                      {/* Contact Details Section */}
                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Contact Person: </h6>
                          <div>{renderEditableField('contact_person_name', editedCourse.contact_person_name)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>Phone Number: </h6>
                          <div>{renderEditableField('phone_number', editedCourse.phone_number)}</div>
                        </Col>
                        <Col md={4}>
                          <h6 className='txtred'>WhatsApp Number: </h6>
                          <div>{renderEditableField('whatsapp_number', editedCourse.whatsapp_number)}</div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <h6 className='txtred'>Email ID: </h6>
                          <div>{renderEditableField('email_id', editedCourse.email_id)}</div>
                        </Col>
                      </Row>

                      <div className='col-md-12 row mb-3'>
                        <div className='col-md-12'>
                          <h5 className='txtred mb-3'>Documents</h5>
                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Document Name</th>
                                <th>Document Type</th>
                                <th>Reference Number</th>
                                <th>File</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {documents.length > 0 ? (
                                documents.map((doc) => (
                                  <tr key={doc.id}>
                                    <td>
                                      {editingDocumentId === doc.id ? (
                                        <Form.Control
                                          type="text"
                                          value={editedDocument.document_name ?? doc.document_name ?? ''}
                                          onChange={(e) => setEditedDocument({
                                            ...editedDocument,
                                            document_name: e.target.value
                                          })}
                                        />
                                      ) : (
                                        doc.document_name || '-'
                                      )}
                                    </td>
                                    <td>
                                      {editingDocumentId === doc.id ? (
                                        <Form.Select
                                          value={editedDocument.document_type_id}
                                          onChange={e => setEditedDocument({
                                            ...editedDocument,
                                            document_type_id: e.target.value
                                          })}
                                        >
                                          <option value="">Select Type</option>
                                          {dropdowns.doctype?.map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                          ))}
                                        </Form.Select>
                                      ) : doc.document_type?.name || 'Unknown'}
                                    </td>
                                    <td>
                                      {editingDocumentId === doc.id ? (
                                        <Form.Control
                                          type="text"
                                          value={editedDocument.reference_number ?? doc.reference_number ?? ''}
                                          onChange={(e) => setEditedDocument({
                                            ...editedDocument,
                                            reference_number: e.target.value
                                          })}
                                        />
                                      ) : (
                                        doc.reference_number || '-'
                                      )}
                                    </td>
                                    <td>
                                      {editingDocumentId === doc.id ? (
                                        <>
                                          <Form.Control
                                            type="file"
                                            onChange={e => setEditedDocument({
                                              ...editedDocument,
                                              file: e.target.files[0]
                                            })}
                                          />
                                          {doc.file_name && <div>Current file: {doc.file_name}</div>}
                                        </>
                                      ) : doc.file_name || 'No file'}
                                    </td>
                                    <td className="text-center">
                                      <div className="d-flex align-items-center justify-content-center gap-2">
                                        {editingDocumentId === doc.id ? (
                                          <>
                                            <Button
                                              variant="success"
                                              size="sm"
                                              className="table-action-btn"
                                              onClick={handleUpdateDocument}
                                            >
                                              <i className="bi bi-check"></i>
                                            </Button>
                                            <Button
                                              variant="danger"
                                              size="sm"
                                              className="table-action-btn"
                                              onClick={handleCancelEditDocument}
                                            >
                                              <i className="bi bi-x"></i>
                                            </Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button
                                              variant="warning"
                                              size="sm"
                                              className="text-white table-action-btn"
                                              onClick={() => handleEditDocument(doc)}
                                            >
                                              <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button
                                              variant="danger"
                                              size="sm"
                                              className="table-action-btn"
                                              onClick={() => handleDeleteDocument(doc.id)}
                                            >
                                              <i className="bi bi-trash"></i>
                                            </Button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={isEditing ? 5 : 4} className="text-center">No documents found</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>

                      <div className='col-md-12 mt-4 d-flex justify-content-center'>
                        <Row>
                          <Col>
                            <Button variant="success" className="text-white" onClick={handlePublish}>
                              Send To Training Direct
                            </Button>
                          </Col>
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
  );
}

export default CourseSummary;