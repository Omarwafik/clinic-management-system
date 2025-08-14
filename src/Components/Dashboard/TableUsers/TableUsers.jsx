import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function TableUsers() {
  const [Users , setUsers] =useState([])
  useEffect(()=>{
    axios.get('http://localhost:4004/users')
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  },[])
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
  return (
    <>
      <DataTable
            title="Users List"
            style={{padding:"0"}}
            columns={columns}
            data={Users}
            pagination
            paginationRowsPerPageOptions={[5,20,50]}
            highlightOnHover
            striped
            allowOverflow
            />
    </>
  )
}
