import React, { useState } from "react";
import axios from "axios";
import { Clock, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import Footer from "../Footer";
import { useToast } from "../../context/ToastContext";
import ScrollToTop from "../Animations/ScrollToTop";
import { 
  ScrollFadeIn, 
  ScrollSlideInLeft, 
  ScrollSlideInRight, 
  ScrollScaleIn, 
  ScrollStaggerContainer, 
  ScrollStaggerItem, 
  AnimatedButton,
  ScrollBounce,
  ScrollRotateIn 
} from "../Animations/AnimationComponents";

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

      showToast("✅ Message sent successfully!", "success");

      setMessage(""); // reset textarea
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      showToast("❌ Failed to send message. Please try again.", "danger");
    }
  };

  return (
    <>
      <div className="container my-5">
        {/* Get in Touch */}
        <ScrollFadeIn>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Get in Touch</h2>
            <p>We're here to help with all your pet care needs. Contact us to schedule an appointment or ask any questions about our services.</p>
          </div>
        </ScrollFadeIn>

        {/* Contact Info */}
        <ScrollSlideInLeft>
          <div className="bg-white p-4 rounded shadow-sm mb-5">
            <ScrollStaggerContainer>
              <div className="row g-4">
                <ScrollStaggerItem className="col-md-4 text-center">
                  <ScrollRotateIn>
                    <div className="p-3">
                      <Phone size={32} className="text-primary mb-2" />
                      <h6 className="fw-bold">Phone</h6>
                      <p className="text-muted mb-0">+1 (555) 123-4567</p>
                    </div>
                  </ScrollRotateIn>
                </ScrollStaggerItem>
                <ScrollStaggerItem className="col-md-4 text-center">
                  <ScrollRotateIn delay={0.1}>
                    <div className="p-3">
                      <Mail size={32} className="text-success mb-2" />
                      <h6 className="fw-bold">Email</h6>
                      <p className="text-muted mb-0">info@pawcareclinic.com</p>
                    </div>
                  </ScrollRotateIn>
                </ScrollStaggerItem>
                <ScrollStaggerItem className="col-md-4 text-center">
                  <ScrollRotateIn delay={0.2}>
                    <div className="p-3">
                      <MapPin size={32} className="text-warning mb-2" />
                      <h6 className="fw-bold">Address</h6>
                      <p className="text-muted mb-0">123 Pet Care Street, City, State 12345</p>
                    </div>
                  </ScrollRotateIn>
                </ScrollStaggerItem>
              </div>
            </ScrollStaggerContainer>
          </div>
        </ScrollSlideInLeft>

        {/* Contact Form */}
        <ScrollSlideInRight>
          <div className="bg-white p-4 rounded shadow-sm mb-5">
            <ScrollFadeIn>
              <h4 className="fw-bold mb-3">Send us a Message</h4>
            </ScrollFadeIn>
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
                <AnimatedButton type="submit" className="btn btn-primary px-5">
                  Send Message
                </AnimatedButton>
              </div>
            </form>
          </div>
        </ScrollSlideInRight>

        {/* Emergency Section */}
        <ScrollScaleIn>
          <div className="p-4 rounded mb-5" style={{ backgroundColor: "#ffe6e6", color: "#ff4d4f" }}>
            <ScrollFadeIn>
              <h5 className="fw-bold text-center">Emergency Care Available 24/7</h5>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.2}>
              <p className="text-center">
                If your pet is experiencing a medical emergency, don't wait - call us immediately!
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.4}>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <AnimatedButton as="a" href="tel:+15551234567" className="btn fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>
                  <PhoneCall size={18} /> Call Emergency Line
                </AnimatedButton>
                <AnimatedButton as="a" href="mailto:emergency@pawcareclinic.com" className="btn fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>
                  <Mail size={18} /> Emergency Email
                </AnimatedButton>
              </div>
            </ScrollFadeIn>
          </div>
        </ScrollScaleIn>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
