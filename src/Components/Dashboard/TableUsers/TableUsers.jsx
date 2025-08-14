import axios from 'axios'
import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function TableUsers() {
  const [Users , setUsers] =useState([])
    const [filteredUsers, setFilteredUsers] = useState([]);
  
     const fetchDoctors = async () => {
    const res = await axios.get('http://localhost:4004/users');
    setUsers(res.data);
    setFilteredUsers(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);
  const columns = [
    {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    minWidth: 'fit-content',
    },
    {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    minWidth: 'fit-content',
    },
    {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
    minWidth: 'fit-content',
    },
    {
    name: 'Phone',
    selector: row => row.phone,
    minWidth: 'fit-content',
    },
    {
    name: 'Role',
    selector: row => row.role,
    minWidth: 'fit-content',
    },
];
  const handleSearch = (e) => {
    const inputVal = e.target.value.toLowerCase();
    if (inputVal.trim() === '') {
      // setFilteredDoctors(doctors);
      setFilteredUsers(Users)
    } else {
      const filtered = Users.filter((user) =>
        user.name.toLowerCase().includes(inputVal)
      );
      setFilteredUsers(filtered);
    }
  };


  return (
    <>
      <DataTable
      className=''
            title="Users List"
            style={{padding:"0"}}
            columns={columns}
            data={filteredUsers}
            pagination
            paginationRowsPerPageOptions={[5,20,50]}
            highlightOnHover
            striped
            allowOverflow
            actions={
          <div className="text-right ">
            <input
              type="text"
              placeholder="Search by name"
              style={{ fontSize: '15px', width: '200px' }}
              className="p-2 border border-none rounded"
              onChange={handleSearch}/>
            </div>
            }
          />
    </>
  )
}
