// services.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./services.module.css"; // keep for exact look

export default function Services() {
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4004/doctors")
      .then((res) => setDoc(res.data))
      .catch((err) => console.log(err));
    }, []);
    
    console.log(doc)

  return (
    <div className={`container py-4 ${styles.container}`}>
      {/* Title section */}
      <div className="text-center mb-4">
        <h1 className={styles.servicesTitle}>Our Services</h1>
        <p className={styles.servicesIntro}>
          Browse our veterinary services and specialists.
        </p>
      </div>

    
      {/* Cards layout */}
      <div className="row g-4">
        {
        doc.map((doctor) => (
          <div className="col-12 col-md-6" key={doctor.id}>
            <div className={`d-flex ${styles.card}`}>
              <img
                src={doctor.image}
                alt={doctor.name}
                className={styles.img}
              />

              <div className={`${styles.details} flex-grow-1`}>
                <h2 className={styles.serviceTitle}>
                  {/* ta3del Omar 3shan lw el Dr el gded malosh data zy di*/}
                  {doctor.services?.[0] || "No services listed"}
                </h2>

                <p className={styles.doctorName}>{doctor.name}</p>

                <p className={styles.meta}>{doctor.specialization}</p>
                <p className={styles.meta}>{doctor.location}</p>

                <p className={styles.languages}>
                  {/* ta3del Omar 3shan lw el Dr el gded malosh data zy di*/}
                  Languages: {doctor.languages?.join(", ")|| "No Prefered Languages" }
                </p>

                <p className={styles.rating}>Rating: {doctor.rating} ⭐</p>

                <Link to={`/services/${doctor.id}`} className={styles.btn}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
