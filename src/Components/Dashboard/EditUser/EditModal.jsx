import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
export default function EditModal({show , onClose ,onDoctorEdit , doctor }) {
const [Values , setValues]=useState({
      id:'',
      name:'',
      email:'',
      jobTitle:'',
      phone:'',
  });
  // const {id} =useParams()
  useEffect(() => {
  if (doctor) {
    setValues(doctor);
  } else if (show) { // مثلاً لما المودال مفتوح
    alert("Doctor data not found!");
  }
}, [doctor, show]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try{
       const { data } = await axios.put(`https://clinic-backend-production-9c79.up.railway.app/doctors/${doctor.id}`, Values);
      onDoctorEdit(data);
      alert("doctor Updated Successfully")
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
