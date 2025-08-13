import React from "react";
import Footer from "../Footer/index";
import { Mail, Phone, MapPin, Clock, PhoneCall } from "lucide-react";

export default function Contact() {
  return (
    <>
      <div className="container my-5">
        {/* Get in Touch */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get in Touch</h2>
          <p>
            We're here to help with all your pet care needs. Contact us to
            schedule an appointment or ask any questions about our services.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-4 rounded shadow-sm mb-5">
          <div className="row g-4">
            <div className="col-md-3">
              <h5>
                <Phone size={22} className="text-primary" /> Phone
              </h5>
              <p className="mb-0">+1 (555) 123-4567</p>
              <small className="text-success">24/7 Emergency Line</small>
            </div>
            <div className="col-md-3">
              <h5>
                <Mail size={22} className="text-primary" /> Email
              </h5>
              <p className="mb-0">info@pawcareclinic.com</p>
              <p className="mb-0">emergency@pawcareclinic.com</p>
            </div>
            <div className="col-md-3">
              <h5>
                <MapPin size={22} className="text-primary" /> Address
              </h5>
              <p className="mb-0">
                123 Pet Street
                <br />
                Animal City, AC 12345
              </p>
            </div>
            <div className="col-md-3">
              <h5>
                <Clock size={22} className="text-primary" /> Business Hours
              </h5>
              <p className="mb-0">Mon - Fri: 8:00 AM - 8:00 PM</p>
              <p className="mb-0">Saturday: 9:00 AM - 6:00 PM</p>
              <p className="mb-0">Sunday: 10:00 AM - 4:00 PM</p>
              <small className="text-danger">
                Emergency services available 24/7
              </small>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-4 rounded shadow-sm mb-5">
          <h4 className="fw-bold mb-3">Send us a Message</h4>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Interested In</label>
              <select className="form-select">
                <option>Select a service</option>
                <option>General Check-ups</option>
                <option>Vaccinations</option>
                <option>Emergency Care</option>
                <option>Surgery</option>
                <option>Dental Care</option>
                <option>Pet Grooming</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Message *</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Tell us how we can help you and your pet..."
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

        {/* Emergency Banner - بوكس منفصل */}
<div
  className="p-4 rounded mb-5"
  style={{ backgroundColor: "#ffe6e6", color: "#ff4d4f" }}
>
  <h5 className="fw-bold text-center">Emergency Care Available 24/7</h5>
  <p className="text-center">
    If your pet is experiencing a medical emergency, don't wait - call us immediately!
  </p>
  <div className="d-flex justify-content-center gap-3 flex-wrap">
    {/* زر الاتصال */}
    <a
      href="tel:+15551234567"
      className="btn fw-bold d-flex align-items-center gap-2"
      style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
    >
      <PhoneCall size={18} />
      Call Emergency Line
    </a>
    {/* زر الإيميل */}
    <a
      href="mailto:emergency@pawcareclinic.com"
      className="btn fw-bold d-flex align-items-center gap-2"
      style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
    >
      <Mail size={18} />
      Emergency Email
    </a>
  </div>
</div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}