import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Button } from 'react-bootstrap';

export default function TableContact() {
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleView = (msg) => {
    setSelectedMsg(msg);
    setShowModal(true);
  };

  const columns = [
    { name: 'Name'
      , selector: row => row.name,
      sortable: true,
          minWidth: 'fit-content',

     },
    { name: 'Email', 
      selector: row => row.email,
      sortable: true 
      ,    minWidth: 'fit-content',

    },
    { name: 'Phone',
      selector: row => row.phone,
          minWidth: 'fit-content',

     },
    {
      name: 'Message',
      selector: row => row.message,
      minWidth: 'fit-content',
      cell: row => (
        <div style={{ whiteSpace: 'pre-wrap', maxHeight: '80px', overflow: 'hidden' }}>
          {row.message.length > 25 ? (
            <>
              {row.message.slice(0, 25)}...
              <Button variant="link" size="sm" onClick={() => handleView(row.message)}>View</Button>
            </>
          ) : row.message}
        </div>
      ),
      wrap: true,
      minWidth: '250px'
    }
  ];

  return (
    <>
      <DataTable
        title="Messages List"
        columns={columns}
        data={messages}
        pagination
        highlightOnHover
        striped
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {selectedMsg}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
