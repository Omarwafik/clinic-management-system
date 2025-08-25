import { useReservations } from '../../context/ReservationContext';
import { motion } from 'framer-motion';

export default function UserReservation() {
  const { reservations, deleteReservation } = useReservations();

  return (
    <div className="container mt-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4"
      >
        My Reservations
      </motion.h2>
      {reservations.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, rotate: -10, scale: 0.95 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          You have no reservations.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="table-responsive"
        >
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
              {reservations.map((r, idx) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.05 }}
                >
                  <td>{r.patient}</td>
                  <td>{r.phone}</td>
                  <td>{r.doctorName}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.pet}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ minWidth: '70px' }}
                      onClick={() => deleteReservation(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
