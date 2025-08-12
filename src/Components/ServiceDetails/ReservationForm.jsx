import React, { useState } from "react";
import styles from "./servicedetails.module.css";

function ReservationForm({ doctorId, doctorName }) {
  const [form, setForm] = useState({
    patient: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    pet: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.patient || !form.email || !form.date || !form.time) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:4004/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, doctorId, doctorName }),
      });
      const result = await res.json();
      if (result.id) {
        setSuccessMsg("✅ Reservation successful!");
        setForm({
          patient: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          pet: "",
        });
      } else {
        setErrorMsg(result.message || "❌ Server did not confirm success.");
      }
    } catch (err) {
      alert("Error submitting reservation. Please try again.");
    }
  }

  return (
    <div className={styles.reservationContainer}>
      <h3 className={styles.reservationTitle}>Reserve an Appointment</h3>
      <form className={styles.reservationForm} onSubmit={handleSubmit}>
        <input
          name="patient"
          placeholder="Your Name"
          value={form.patient}
          onChange={handleChange}
          required
          className={styles.reservationInput}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.reservationInput}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className={styles.reservationInput}
        />
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
    </div>
  );
}

export default ReservationForm;
