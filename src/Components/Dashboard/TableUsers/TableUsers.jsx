import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function TableUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://clinic-management-system-d9b4.vercel.app/api/users');
      // أضف رقم متسلسل لكل مستخدم
      const numberedUsers = res.data.map((user, index) => ({
        ...user,
        number: index + 1, // للعرض فقط
      }));
      setUsers(numberedUsers);
      setFilteredUsers(numberedUsers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'ID',
      selector: row => row.number, // استخدم number بدل _number
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
    if (!inputVal.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(inputVal)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      <DataTable
        title="Users List"
        columns={columns}
        data={filteredUsers}
        pagination
        paginationRowsPerPageOptions={[5, 20, 50]}
        highlightOnHover
        striped
        allowOverflow
        actions={
          <div className="text-right">
            <input
              type="text"
              placeholder="Search by name"
              style={{ fontSize: '15px', width: '200px' }}
              className="p-2 border border-none rounded"
              onChange={handleSearch}
            />
          </div>
        }
      />
    </>
  );
}
