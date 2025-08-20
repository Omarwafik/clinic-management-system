import React, { useState } from "react";
import styles from "./servicedetails.module.css";
import { useReservations } from "../../context/ReservationContext"; // استورد الـ context

function ReservationForm({ doctorId, doctorName }) {
  const currentUser = JSON.parse(localStorage.getItem("auth_user"));
  const { reservations, setReservations } = useReservations(); // استخدم الـ context

  const [form, setForm] = useState({ date: "", time: "", pet: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.date || !form.time) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!currentUser) {
      alert("User data not found. Please log in again.");
      return;
    }

    const reservationData = {
      patient: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || "",
      ...form,
      doctorId,
      doctorName,
    };

    try {
      const res = await fetch("https://clinic-backend-production-9c79.up.railway.app/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      const result = await res.json();

      if (result.id) {
        // حدث الـ context مباشرة
        setReservations([...reservations, result]);

        setSuccessMsg("✅ Reservation successful!");
        setForm({ date: "", time: "", pet: "" });
      } else {
        setErrorMsg(result.message || "❌ Server did not confirm success.");
      }
    } catch (err) {
      console.error("Error submitting reservation:", err);
      setErrorMsg("Error submitting reservation. Please try again.");
    }
  }

  return (
    <div className={styles.reservationContainer}>
      <h3 className={styles.reservationTitle}>Reserve an Appointment</h3>
      <div className={styles.userInfo}>
        <p><strong>Name:</strong> {currentUser?.name}</p>
        <p><strong>Email:</strong> {currentUser?.email}</p>
        {currentUser?.phone && <p><strong>Phone:</strong> {currentUser.phone}</p>}
      </div>

      <form className={styles.reservationForm} onSubmit={handleSubmit}>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className={styles.reservationInput}
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
          className={styles.reservationInput}
        />
        <input
          name="pet"
          placeholder="Pet Name/Type"
          value={form.pet}
          onChange={handleChange}
          className={styles.reservationInput}
        />
        <button type="submit" className={styles.reservationButton}>
          Reserve
        </button>
      </form>

      {successMsg && <p className={styles.reservationSuccess}>{successMsg}</p>}
      {errorMsg && <p className={styles.reservationError}>{errorMsg}</p>}
    </div>
  );
}

export default ReservationForm;
