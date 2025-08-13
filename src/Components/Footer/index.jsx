import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons
import { Mail, Phone, MapPin,Clock ,Heart} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Clinic Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">
              <Heart size={25} className="text-primary" /> PawCare Clinic
            </h5>
            <p className="text-muted">
              Your trusted partner in pet health care. We provide comprehensive
              veterinary services with compassion and expertise, ensuring your
              beloved pets receive the best possible care.
            </p>
            <p>
                <Phone size={22} className="text-primary" /> 
              
              +1 (555) 123-4567
            </p>
            <p>
          <Mail size={22} className="text-primary" />
              info@pawcareclinic.com
            </p>
            <p>
                <MapPin size={22} className="text-primary" />
              123 Pet Street, Animal City, AC 12345
            </p>
            
          </div>

          {/* Services */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Our Services</h5>
            <ul className="list-unstyled">
              <li>General Check-ups</li>
              <li>Vaccinations</li>
              <li>Surgery</li>
              <li>Emergency Care</li>
              <li>Dental Care</li>
              <li>Pet Grooming</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Opening Hours</h5>
            <ul className="list-unstyled">
              <li>
                <Clock size={22} className="text-primary" />
                Monday - Friday: 8:00 AM - 8:00 PM
              </li>
              <li>
                <Clock size={22} className="text-primary" />
                Saturday: 9:00 AM - 6:00 PM
              </li>
              <li>
                <Clock size={22} className="text-primary" />
                Sunday: 10:00 AM - 4:00 PM
              </li>
            </ul>
            <button className="btn btn-danger btn-sm mt-2">
              24/7 Emergency Care
            </button>
          </div>
        </div>
        <div className="text-center border-top border-secondary pt-3 mt-3">
          <small>© 2024 PawCare Clinic. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;