import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./servicedetails.module.css";
import ReservationForm from "./ReservationForm";

export default function ServiceDetails() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4004/doctors/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error(err));
  }, [doctorId]);

  if (!doctor) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <img src={doctor.image} alt={doctor.name} className={styles.img} />
            <div className={styles.details}>
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
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <ReservationForm doctorId={doctorId} doctorName={doctor.name} />
        </div>
      </div>
    </div>
  );
}
