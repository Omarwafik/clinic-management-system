import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import CreateModal from './CreateUser/CreateModal';
import EditModal from './EditUser/EditModal';


export default function TableDoctors() {
    const [doctors,setDoctors]=useState([]);
    const [filteredDoctors,setfilteredDoctors]=useState();
    const [AddModal , setAddModal] = useState(false)
    const [ShowEditModal , setShowEditModal] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    // const [selectedDoctor, setSelectedDoctor] = useState(null);

const columns = [
    {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width : "60px",  
    maxWidth : "100px",
    // padding:"0px"    
    },
    {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    minWidth: 'fit-content',
    // maxWidth: '200px', 
    },
    {
    name: 'Email',
    selector: row => row.email,
    minWidth: 'fit-content',
    // maxWidth: '200px', 
    },
    {
    name: 'Job Title',
    selector: row => row.jobTitle,
    minWidth: 'fit-content',
    // maxWidth: '15%', 
    },
    {
    name: 'Phone',
    selector: row => row.phone,
    minWidth: 'fit-content',
    // maxWidth: '15%', 
    },
    {
    name: 'Actions',
    cell: row => (
    <>
        <button className='btn btn-sm btn-primary me-2' onClick={()=>handleOpenEdit(row)}>Edit</button>
        <button className='btn btn-sm btn-danger' onClick={()=>handleDelete(row)}>Delete</button>
    </>
    ),
    ignoreRowClick: true,  
    allowOverflow: true,
    button: true,
    width : "180px",  
    maxWidth: "200px"

    },
];

const fetchDoctors = async () => {
    const res = await axios.get('http://localhost:4004/doctors');
    setDoctors(res.data);
    setfilteredDoctors(res.data)
};

useEffect(() => {
    fetchDoctors();
}, []);


const handleDelete=(row)=>{
    console.log(row.id)
    const confirm = window.confirm("Do Yoy Want to Delete ?")
    if(confirm){
        axios.delete(`http://localhost:4004/doctors/${row.id}`)
        .then(()=> {
            setDoctors(prev => prev.filter(doc => doc.id !== row.id))
        }).catch(err => console.log(err))
    }
}

const handleOpenEdit=(doctor)=>{
    setSelectedDoctor(doctor)
    setShowEditModal(true)
}

const handleCloseEdit=()=>{
    setShowEditModal(false)
}

const handleSearch = (e) => {
  const inputVal = e.target.value.toLowerCase();
  if (inputVal.trim() === "") {
    setfilteredDoctors(doctors);
  } else {
    const filtered = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(inputVal)
    );
    setfilteredDoctors(filtered);
  }
  console.log(filteredDoctors)
};

// console.log(doctors)

return (
    <>  
        {/* <h3>Doctors List</h3> */}
        <DataTable
            title="Doctors List"
            style={{padding:"0"}}
            columns={columns}
            data={filteredDoctors}
            pagination
            paginationRowsPerPageOptions={[5,20,50]}
            highlightOnHover
            striped
            allowOverflow
            actions={
            <div className='d-flex gap-1 flex-column flex-sm-row w-100' >
            <input type="text" placeholder='Search by name' style={{fontSize:"15px" , width:"200px"}} className='p-2  border  border-none rounded'
            onChange={handleSearch}
            />
            <button className="btn btn-sm px-4 py-2 w-50 w-sm-100 btn-success " onClick={()=>setAddModal(true)}>
                Add <span>+</span>
            </button>
            </div>
            }
        />
        <CreateModal  show={AddModal} onClose={()=>setAddModal(false)} onDoctorAdded={(doctor) => setDoctors([...doctors, doctor])}/>
        <EditModal
            show={ShowEditModal}
            onClose={handleCloseEdit}
            doctor={selectedDoctor}
            onDoctorEdit={(updatedDoctor) => {
                setDoctors((prev) =>
                prev.map((doc) =>
                doc.id === updatedDoctor.id ? updatedDoctor : doc));}}
        />
    </>



    )
}
