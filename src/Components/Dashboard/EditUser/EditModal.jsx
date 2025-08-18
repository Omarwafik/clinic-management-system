import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditModal({ show, onClose, onDoctorEdit, doctor }) {
  const [Values, setValues] = useState({
    _id: '',
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
  });

  useEffect(() => {
    if (doctor) {
      setValues({
        _id: doctor._id,
        name: doctor.name || '',
        email: doctor.email || '',
        jobTitle: doctor.jobTitle || '',
        phone: doctor.phone || '',
      });
    }
  }, [doctor]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://clinic-management-system-d9b4.vercel.app/api/doctors/${Values._id}`, Values);
      onDoctorEdit(data); // استخدم response من backend
      onClose();
    } catch (err) {
      console.log(err);
      alert("Error Updating Doctor");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Doctor Info</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleEdit}>
        <Modal.Body>
          <div className="mb-1">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={Values.name} onChange={e => setValues({ ...Values, name: e.target.value })} />
          </div>
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={Values.email} onChange={e => setValues({ ...Values, email: e.target.value })} />
          </div>
          <div className="mb-1">
            <label className="form-label">Job Title</label>
            <input type="text" className="form-control" value={Values.jobTitle} onChange={e => setValues({ ...Values, jobTitle: e.target.value })} />
          </div>
          <div className="mb-1">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" value={Values.phone} onChange={e => setValues({ ...Values, phone: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">Update</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
