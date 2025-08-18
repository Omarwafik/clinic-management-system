import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./services.module.css";

export default function Services() {
  const [doc, setDoc] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://clinic-management-system-d9b4.vercel.app/api/doctors")
      .then((res) => setDoc(res.data))
      .catch((err) => console.log(err));
  }, []);

  const jobTitles = useMemo(() => {
    const titles = Array.from(new Set(doc.map((d) => d.jobTitle))).filter(Boolean);
    return ["All", ...titles];
  }, [doc]);

  const filteredDocs = useMemo(() => {
    if (activeFilter === "All") return doc;
    return doc.filter((d) => d.jobTitle === activeFilter);
  }, [doc, activeFilter]);

  return (
    <div className={`container py-4 ${styles.container}`}>
      <div className="text-center mb-4">
        <h1 className={styles.servicesTitle}>Our Services</h1>
        <p className={styles.servicesIntro}>
          Browse our veterinary services and specialists.
        </p>
      </div>

      <div className={styles.tabContainer}>
        {jobTitles.map((title) => (
          <button
            key={title}
            className={`${styles.tabButton} ${activeFilter === title ? styles.activeTab : ""}`}
            onClick={() => setActiveFilter(title)}
            type="button"
          >
            {title}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filteredDocs.map((doctor) => {
          const imageUrl = doctor.image.startsWith("http")
  ? doctor.image
  : `https://clinic-management-system-d9b4.vercel.app${doctor.image}`;

const services = Array.isArray(doctor.services) ? doctor.services : ["No services listed"];
const languages = Array.isArray(doctor.languages) ? doctor.languages : ["No languages"];
          return (
            <div className="col-12 col-md-6" key={doctor._id}>
              <div className={`d-flex ${styles.card}`}>
                <img src={imageUrl} alt={doctor.name} className={styles.img} />
                <div className={`${styles.details} flex-grow-1`}>
                  <h2 className={styles.serviceTitle}>
                    {services[0] || "No services listed"}
                  </h2>
                  <p className={styles.doctorName}>{doctor.name}</p>
                  <p className={styles.meta}>{doctor.jobTitle}</p>
                  <p className={styles.meta}>{doctor.location || "No location"}</p>
                  <p className={styles.languages}>
                    Languages: {languages.join(", ") || "No languages"}
                  </p>
                  <p className={styles.rating}>Rating: {doctor.rating || "N/A"} ⭐</p>
                  <Link to={`/services/${doctor._id}`} className={styles.btn}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
