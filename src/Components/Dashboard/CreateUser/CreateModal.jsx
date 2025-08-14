import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateModal({ show, onClose, onDoctorAdded }) {
  const [Values, setValues] = useState({
    name: '',
    email: '',
    jobTitle: 'Pet Specialist',
    phone: '',
    image: '',      // رابط صالح للعرض
    preview: '',    // preview مؤقت للعرض في الفورم
    imageFile: null // الملف نفسه للرفع أو المعالجة
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues(prev => ({
        ...prev,
        imageFile: file,
        preview: URL.createObjectURL(file),
        image: `/images/${file.name}` // هذا الرابط سيخزن في JSON
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4004/doctors');
      const AllDoctors = response.data;
      const MaxId = AllDoctors.length > 0 ? AllDoctors[AllDoctors.length - 1].id : 0;

      const newDoctor = {
        id: String(Number(MaxId) + 1),
        name: `Dr. ${Values.name}`,
        email: Values.email,
        jobTitle: Values.jobTitle,
        phone: Values.phone,
        image: Values.image,       // رابط صالح للعرض
        specialization: 'General Pet Care',
        qualifications: 'DVM, Diploma in Veterinary Medicine',
        experienceYears: 13,
        bio: 'Experienced in comprehensive pet care including cats, dogs, and small mammals.',
        workingHours: 'Saturday - Wednesday: 1:00 PM - 7:00 PM',
        location: 'Cairo, Egypt',
        googleMaps: 'https://maps.google.com/?q=30.0619,31.2197',
        languages: ['Arabic','English','German'],
        services: ['Pet Health Checkups','Vaccinations','Pet Nutrition Consultation'],
        rating: 4.7,
        createdAt: new Date().toISOString().split("T")[0]
      };

      await axios.post('http://localhost:4004/doctors', newDoctor);
      onDoctorAdded([...AllDoctors, newDoctor]);
      alert("Doctor added successfully");
      onClose();

      // Reset form
      setValues({
        name: '',
        email: '',
        jobTitle: 'Pet Specialist',
        phone: '',
        image: '',
        preview: '',
        imageFile: null
      });
    } catch (err) {
      console.log(err);
      alert("Error adding doctor");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Doctor</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-1">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={Values.name}
              onChange={e => setValues({ ...Values, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={Values.email}
              onChange={e => setValues({ ...Values, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Job Title</label>
            <select
              className="form-control"
              value={Values.jobTitle}
              onChange={e => setValues({ ...Values, jobTitle: e.target.value })}
            >
              <option value="Pet Specialist">Pet Specialist</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Surgery Specialist">Surgery Specialist</option>
              <option value="Veterinary Specialist">Veterinary Specialist</option>
            </select>
          </div>
          <div className="mb-1">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={Values.phone}
              onChange={e => setValues({ ...Values, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Image</label>
           <input
  type="file"
  className="form-control"
  accept="image/*"
  onChange={e => {
    const file = e.target.files[0];
    if (file) {
      setValues(prev => ({
        ...prev,
        imageFile: file, // فقط للرفع
        preview: URL.createObjectURL(file), // للعرض فوراً
        image: `/images/${file.name}` // هيتحفظ في JSON كالرابط
      }));
    }
  }}
/>
          </div>

{Values.preview && (
  <img
    src={Values.preview}
    alt="preview"
    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
  />
)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
