import API_BASE from '../../config/api';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./servicedetails.module.css";
import ReservationForm from "./ReservationForm";
import { motion } from "framer-motion";

export default function ServiceDetails() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_BASE}/doctors/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error(err));
  }, [doctorId]);

  if (!doctor) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <motion.div
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={doctor.image}
              alt={doctor.name}
              className={styles.img}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className={styles.details}
            >
              <h1 className={styles.serviceTitle}>
                {doctor.services[0] || "No service listed"}
              </h1>
              <p className={styles.doctorName}>{doctor.name}</p>
              <p className={styles.meta}>{doctor.specialization}</p>
              <p className={styles.meta}>{doctor.location}</p>
              <p className={styles.languages}>
                Languages: {doctor.languages.join(", ")}
              </p>
              <p className={styles.rating}>Rating: {doctor.rating} ⭐</p>
              <p className={styles.meta}>
                Working Hours: {doctor.workingHours}
              </p>
              <p className={styles.meta}>
                Contact: {doctor.phone} | {doctor.email}
              </p>
              <a
                href={doctor.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                📍 View on Google Maps
              </a>
              <div className={styles.servicesSection}>
                <h3>All Services:</h3>
                <ul className={styles.serviceList}>
                  {doctor.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
              <Link to="/services" className={styles.backBtn}>
                ← Back to Services
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ReservationForm doctorId={doctorId} doctorName={doctor.name} />
        </motion.div>
      </div>
    </div>
  );
}
