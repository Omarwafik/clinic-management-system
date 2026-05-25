import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function ReservationTable() {
  const [Reserve , setReserve] =useState([])
  useEffect(()=>{
    axios.get('https://clinic-backend-production-9c79.up.railway.app/reservations')
    .then(res => setReserve(res.data))
    .catch(err => console.log(err))
  },[])
  const columns = [
    {
    name: 'UserName',
    selector: row => row.patient,
    sortable: true,
    minWidth: 'fit-content',
    },
    {
    name: 'DrName',
    selector: row => row.doctorName,
    sortable: true,
    minWidth: 'fit-content',
    },
    {
    name: 'Phone',
    selector: row => row.phone,
    minWidth: 'fit-content',
    },
    {
    name: 'Date',
    selector: row => row.date,
    minWidth: 'fit-content',
    },
    {
    name: 'Time',
    selector: row => row.time,
    minWidth: 'fit-content',
    },
    {
    name: 'Pet',
    selector: row => row.pet,
    minWidth: 'fit-content',
    }
];
  return (
    <>
      <DataTable
            title="Reservations List"
            style={{padding:"0"}}
            columns={columns}
            data={Reserve}
            pagination
            paginationRowsPerPageOptions={[5,20,50]}
            highlightOnHover
            striped
            allowOverflow
            />
    </>
  )
}
