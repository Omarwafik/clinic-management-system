import { Modal ,  Button  } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

                 // zabat di 3shan el hydaf da hysama3 fe el site fa etefe2 m3 hany 3ala el yet3ered fe el makan
//  "id": "1",
//       "name": "Dr. kamal Hassan",
//       "jobTitle": "Pet Specialist",
//       "specialization": "General Pet Care",
//       "image": "https://randomuser.me/api/portraits/men/71.jpg",
//       "qualifications": "DVM, Diploma in Veterinary Medicine",
//       "experienceYears": 13,
//       "bio": "Experienced in comprehensive pet care including cats, dogs, and small mammals.",
//       "phone": "+201278945612",
//       "email": "dr.Kamal@example.com",
//       "workingHours": "Saturday - Wednesday: 1:00 PM - 7:00 PM",
//       "location": "Cairo, Egypt",
//       "googleMaps": "https://maps.google.com/?q=30.0619,31.2197",
//       "languages": [
//         "Arabic",
//         "English",
//         "German"
//       ],
//       "services": [
//         "Pet Health Checkups",
//         "Vaccinations",
//         "Pet Nutrition Consultation"
//       ],
//       "rating": 4.7
//     }


export default function CreateModal({show , onClose , onDoctorAdded}) {
  const [Values , setValues]=useState({
    name:'',
    email:'',
    jobTitle:'',
    phone:'',
  });
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{

      const response = await axios.get('http://localhost:4004/doctors');
      const AllDoctors = response.data;
                                  // 2 Option Here
      // const MaxId = AllDoctors.length > 0 ? Math.max(...AllDoctors.map(d => d.id)) : 0 ;
      const MaxId = AllDoctors.length > 0 ? AllDoctors[AllDoctors.length - 1].id : 0 ;
      const newDoctor ={
        ...Values,
        id: String(Number(MaxId) + 1),
        name : `Dr. ${Values.name}`,
        createdAt: new Date().toISOString().split("T")[0],
      }
      axios.post('http://localhost:4004/doctors' ,newDoctor)
      onDoctorAdded(AllDoctors)

      alert("doctor Added Successfully")
      onClose();
    }catch(err){
      console.log(err)
      alert("Error Adding Doctor")
    }
  }
  return (
    <Modal show={show} onHide={onClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Doctor</Modal.Title>
  </Modal.Header>
  <form onSubmit={handleSubmit}>
    <Modal.Body>
      <div className="mb-1">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" onChange={e => setValues({...Values ,name: e.target.value})} />
      </div>
      <div className="mb-1">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" onChange={e => setValues({...Values ,email: e.target.value})} />
      </div>
      <div className="mb-1">
        <label className="form-label">Job Title</label>
        <input type="text" className="form-control" onChange={e => setValues({...Values ,jobTitle: e.target.value})} />
      </div>
      <div className="mb-1">
        <label className="form-label">Phone</label>
        <input type="tel" className="form-control" onChange={e => setValues({...Values ,phone: e.target.value})} />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      <Button type='submit' variant="primary">Save</Button>
    </Modal.Footer>
  </form>
</Modal>

  )
}
