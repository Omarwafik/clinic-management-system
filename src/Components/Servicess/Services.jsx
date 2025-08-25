import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./services.module.css";
import { motion } from "framer-motion";

export default function Services() {
  const [doc, setDoc] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://clinic-backend-production-9c79.up.railway.app/doctors")
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-4"
      >
        <h1 className={styles.servicesTitle}>Our Services</h1>
        <p className={styles.servicesIntro}>
          Browse our veterinary services and specialists.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className={styles.tabContainer}
      >
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
      </motion.div>

      <div className="row g-4">
        {filteredDocs.map((doctor, index) => (
          <div className="col-12 col-md-6" key={doctor.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              className={`d-flex ${styles.card}`}
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={doctor.image}
                alt={doctor.name}
                className={styles.img}
              />
              <div className={`${styles.details} flex-grow-1`}>
                <h2 className={styles.serviceTitle}>
                  {doctor.services?.[0] || "No services listed"}
                </h2>
                <p className={styles.doctorName}>{doctor.name}</p>
                <p className={styles.meta}>{doctor.jobTitle}</p>
                <p className={styles.meta}>{doctor.location}</p>
                <p className={styles.languages}>
                  Languages: {doctor.languages?.join(", ")}
                </p>
                <p className={styles.rating}>Rating: {doctor.rating} ⭐</p>
                <Link to={`/services/${doctor.id}`} className={styles.btn}>
                  View Details
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
