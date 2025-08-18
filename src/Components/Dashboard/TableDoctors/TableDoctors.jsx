import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CreateModal from '../CreateUser/CreateModal';
import EditModal from '../EditUser/EditModal';

export default function TableDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [AddModal, setAddModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors');
      const numberedDoctors = res.data.map((doc, index) => ({
        ...doc,
        number: index + 1,
      }));
      setDoctors(numberedDoctors);
      setFilteredDoctors(numberedDoctors);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add doctor
  const handleDoctorAdded = (newDoctor) => {
    const docWithNumber = { ...newDoctor, number: doctors.length + 1 };
    setDoctors((prev) => [...prev, docWithNumber]);
    setFilteredDoctors((prev) => [...prev, docWithNumber]);
  };

  // Edit doctor
  const handleDoctorEdited = (updatedDoctor) => {
    const updatedWithNumber = {
      ...updatedDoctor,
      number: doctors.findIndex((d) => d._id === updatedDoctor._id) + 1,
    };
    setDoctors((prev) =>
      prev.map((doc) => (doc._id === updatedDoctor._id ? updatedWithNumber : doc))
    );
    setFilteredDoctors((prev) =>
      prev.map((doc) => (doc._id === updatedDoctor._id ? updatedWithNumber : doc))
    );
  };

  // Delete doctor
  const handleDelete = (row) => {
    if (!window.confirm('Do You Want to Delete?')) return;

    axios
      .delete(`http://localhost:5000/api/doctors/${row._id}`)
      .then(() => {
        setDoctors((prev) => prev.filter((doc) => doc._id !== row._id));
        setFilteredDoctors((prev) => prev.filter((doc) => doc._id !== row._id));
      })
      .catch((err) => console.error(err));
  };

  const handleOpenEdit = (doctor) => {
    setSelectedDoctor({ ...doctor });
    setShowEditModal(true);
  };

  const handleCloseEdit = () => setShowEditModal(false);

  const handleSearch = (e) => {
    const inputVal = e.target.value.toLowerCase();
    if (!inputVal.trim()) {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter((doc) =>
        doc.name.toLowerCase().includes(inputVal)
      ));
    }
  };

  const columns = [
    { name: 'ID', selector: (row) => row.number, sortable: true, width: '60px' },
    { name: 'Name', selector: (row) => row.name, sortable: true, minWidth: 'fit-content' },
    { name: 'Email', selector: (row) => row.email, minWidth: 'fit-content' },
    { name: 'Job Title', selector: (row) => row.jobTitle, minWidth: 'fit-content' },
    { name: 'Phone', selector: (row) => row.phone, minWidth: 'fit-content' },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="btn btn-sm btn-primary me-2" onClick={() => handleOpenEdit(row)}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>Delete</button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '180px',
    },
  ];

  return (
    <>
      <DataTable
        title="Doctors List"
        columns={columns}
        data={filteredDoctors}
        pagination
        paginationRowsPerPageOptions={[5, 20, 50]}
        highlightOnHover
        striped
        actions={
          <div className="d-flex gap-1 flex-column flex-sm-row w-100">
            <input
              type="text"
              placeholder="Search by name"
              style={{ fontSize: '15px', width: '200px' }}
              className="p-2 border border-none rounded"
              onChange={handleSearch}
            />
            <button className="btn btn-sm px-4 py-2 w-50 w-sm-100 btn-success" onClick={() => setAddModal(true)}>
              Add <span>+</span>
            </button>
          </div>
        }
      />

      <CreateModal show={AddModal} onClose={() => setAddModal(false)} onDoctorAdded={handleDoctorAdded} />
      <EditModal show={ShowEditModal} onClose={handleCloseEdit} doctor={selectedDoctor} onDoctorEdit={handleDoctorEdited} />
    </>
  );
}
