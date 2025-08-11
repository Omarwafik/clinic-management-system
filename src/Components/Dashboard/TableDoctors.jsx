import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TableDoctors() {
    const [doctors,setDoctors]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4004/doctors')
        .then(res => setDoctors(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div>
      <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job Title</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((dr , index)=>
                                    <tr key={index}>
                                        <td>{dr.id}</td>
                                        <td>{dr.name}</td>
                                        <td>{dr.email}</td>
                                        <td>{dr.jobTitle}</td>
                                        <td>{dr.phone}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
