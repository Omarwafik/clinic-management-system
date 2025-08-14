import { useReservations } from '../../context/ReservationContext';

export default function UserReservation() {
  const { reservations, deleteReservation } = useReservations();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Pet</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id}>
                  <td>{r.patient}</td>
                  <td>{r.phone}</td>
                  <td>{r.doctorName}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.pet}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ minWidth: "70px" }}
                      onClick={() => deleteReservation(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
