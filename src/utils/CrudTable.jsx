import React, { useEffect, useState,useCallback } from 'react';
import { Button, Col, Table, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrudTable = ({ api, title, entityName }) => {
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const fetchItems = useCallback(async () => {
        try {
            const data = await api.getAll();
            setItems(data);
        } catch (error) {
            toast.error(`Failed to fetch ${entityName}s`);
        }
    }, [api, entityName]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    
    const handleSave = async () => {
        if (!itemName.trim()) {
            toast.warning(`Please enter a ${entityName} name`);
            return;
        }

        try {
            await api.create(itemName);
            toast.success(`${entityName} added successfully!`);
            setItemName('');
            fetchItems();
        } catch (error) {
            toast.error(`Failed to add ${entityName}`);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditName(items[index].name);
    };

    const handleUpdate = async (index) => {
        if (!editName.trim()) {
            toast.warning(`${entityName} name cannot be empty`);
            return;
        }

        const itemId = items[index].id;
        try {
            await api.update(itemId, editName);
            const updatedList = [...items];
            updatedList[index].name = editName;
            setItems(updatedList);
            setEditIndex(null);
            setEditName('');
            toast.success(`${entityName} updated successfully!`);
        } catch (error) {
            toast.error(`Failed to update ${entityName}`);
        }
    };

    const handleDelete = async (index) => {
        const itemId = items[index].id;
        try {
            await api.delete(itemId);
            const updatedList = items.filter((_, i) => i !== index);
            setItems(updatedList);
            toast.success(`${entityName} deleted`);
            fetchItems();
        } catch (error) {
            toast.error(`Failed to delete ${entityName}`);
        }
    };

    return (
        <main className="pt-3">
            <ToastContainer />
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-12 mb-3">
                        <div className="card bg-white">
                            <div className="card-header">
                                <h4 className="title-clr">
                                    <i className="bi bi-table me-2"></i> Add {title}
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="col-md-12 mb-3 align-items-center justify-content-center row p-2">
                                    <div className="col-md-3">
                                        <h6 className="title-clr pt-2">{title} Name :</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                            placeholder={`Enter ${entityName} name`}
                                        />
                                    </div>
                                </div>
                                <Row>
                                    <Col dir="rtl" className="txt-align-center">
                                        <Button className="btn btn-success mb-2" onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                                <hr />
                                <div className="table p-3 mb-3">
                                    <Table bordered className="smtbl responsive w-100">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Sl.No</th>
                                                <th>{title} Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.length === 0 ? (
                                                <tr>
                                                    <td colSpan="3" className="text-center">
                                                        No {title}s added yet.
                                                    </td>
                                                </tr>
                                            ) : (
                                                items.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td className="text-center">
                                                            {editIndex === index ? (
                                                                <input
                                                                    type="text"
                                                                    value={editName}
                                                                    onChange={(e) => setEditName(e.target.value)}
                                                                    className="form-control w-75"
                                                                />
                                                            ) : (
                                                                item.name
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {editIndex === index ? (
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    className="me-2"
                                                                    onClick={() => handleUpdate(index)}
                                                                >
                                                                    Update
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    variant="warning"
                                                                    size="sm"
                                                                    className="me-2"
                                                                    onClick={() => handleEdit(index)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setDeleteIndex(index);
                                                                    setShowModal(true);
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            <div
                className={`modal fade ${showModal ? 'show d-block' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this {entityName}?</p>
                        </div>
                        <div className="modal-footer">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDelete(deleteIndex);
                                    setShowModal(false);
                                }}
                            >
                                Yes, Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CrudTable;