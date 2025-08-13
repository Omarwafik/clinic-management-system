import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TableUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4004/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err)); // handle error
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">DataTables For User</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  {/* user id m3 aya */}
                  <td>{user.id}</td> 
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
