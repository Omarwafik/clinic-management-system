import React, { useState } from "react";
import axios from "axios";
import { Clock, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import Footer from "../Footer";
import { useToast } from "../../context/ToastContext"; // تأكد المسار

export default function Contact() {
  const currentUser = JSON.parse(localStorage.getItem("auth_user"));
  const [message, setMessage] = useState("");
  const { showToast } = useToast(); // استخدم showToast بدل alert

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      showToast("Please type a message!", "danger");
      return;
    }

    if (!currentUser) {
      showToast("User not found. Please log in.", "warning");
      return;
    }

    const contactEntry = {
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || "",
      message,
      createdAt: new Date().toISOString()
    };

    try {
      await axios.post("https://clinic-backend-production-9c79.up.railway.app/ContactUs", contactEntry);

      showToast("Message sent successfully!", "success");

      setMessage(""); // reset textarea
    } catch (err) {
      console.error("Failed to send message:", err);
      showToast("Failed to send message. Please try again.", "danger");
    }
  };

  return (
    <>
      <div className="container my-5">
        {/* Get in Touch */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get in Touch</h2>
          <p>We're here to help with all your pet care needs. Contact us to schedule an appointment or ask any questions about our services.</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-4 rounded shadow-sm mb-5">
          {/* ... نفس محتوى Contact Info ... */}
        </div>

        {/* Contact Form */}
        <div className="bg-white p-4 rounded shadow-sm mb-5">
          <h4 className="fw-bold mb-3">Send us a Message</h4>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label">Message *</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Tell us how we can help you and your pet..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-5">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Emergency Section */}
        <div className="p-4 rounded mb-5" style={{ backgroundColor: "#ffe6e6", color: "#ff4d4f" }}>
          <h5 className="fw-bold text-center">Emergency Care Available 24/7</h5>
          <p className="text-center">
            If your pet is experiencing a medical emergency, don't wait - call us immediately!
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="tel:+15551234567" className="btn fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>
              <PhoneCall size={18} /> Call Emergency Line
            </a>
            <a href="mailto:emergency@pawcareclinic.com" className="btn fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>
              <Mail size={18} /> Emergency Email
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
