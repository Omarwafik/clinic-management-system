import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const defaultDoctor = {
  name: "",
  email: "",
  jobTitle: "",
  phone: "",
  image: "", // هيتعامل في backend مع default لو فاضية
  specialization: "General Pet Care",
  qualifications: "DVM, Diploma in Veterinary Medicine",
  experienceYears: 13,
  bio: "Experienced in comprehensive pet care including cats, dogs, and small mammals.",
  workingHours: "Saturday - Wednesday: 1:00 PM - 7:00 PM",
  location: "Cairo, Egypt",
  googleMaps: "https://maps.google.com/?q=30.0619,31.2197",
  languages: ["Arabic", "English", "German"],
  services: ["Pet Health Checkups", "Vaccinations", "Pet Nutrition Consultation"],
  rating: 2.5,
};

export default function CreateDoctorModal({ show, onClose, onDoctorAdded }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    imageFile: null,
    preview: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({
        ...defaultDoctor,
        ...values,
        imageFile: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // القيم اللي المستخدم يدخلها
      formData.append("name", values.name || defaultDoctor.name);
      formData.append("email", values.email || defaultDoctor.email);
      formData.append("jobTitle", values.jobTitle || defaultDoctor.jobTitle);
      formData.append("phone", values.phone || defaultDoctor.phone);

      // القيم الثابتة (defaults)
      formData.append("specialization", defaultDoctor.specialization);
      formData.append("qualifications", defaultDoctor.qualifications);
      formData.append("experienceYears", defaultDoctor.experienceYears);
      formData.append("bio", defaultDoctor.bio);
      formData.append("workingHours", defaultDoctor.workingHours);
      formData.append("location", defaultDoctor.location);
      formData.append("googleMaps", defaultDoctor.googleMaps);
      formData.append("rating", defaultDoctor.rating);
      formData.append("services", JSON.stringify(defaultDoctor.services));
      formData.append("languages", JSON.stringify(defaultDoctor.languages));

      if (values.imageFile) {
        formData.append("image", values.imageFile);
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/doctors",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onDoctorAdded(data);

      // Reset form
      setValues({ name: "", email: "", jobTitle: "Pet Specialist", phone: "", imageFile: null, preview: "" });
      onClose();
      alert("Doctor added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add doctor.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Doctor</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Job Title</label>
            <select
              className="form-control"
              value={values.jobTitle}
              onChange={(e) => setValues({ ...values, jobTitle: e.target.value })}
            >
              <option value="Pet Specialist">Pet Specialist</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Surgery Specialist">Surgery Specialist</option>
              <option value="Veterinary Specialist">Veterinary Specialist</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Photo</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
          </div>
          {values.preview && (
            <div className="mb-2 text-center">
              <img src={values.preview} alt="preview" style={{ maxWidth: "150px", maxHeight: "150px", borderRadius: "8px" }} />
            </div>
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
