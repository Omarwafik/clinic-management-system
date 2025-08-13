import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer/index";
import dogImage from "../../assets/img/Dig_Defence.jpeg";
import dog2Image from "../../assets/img/dog.png";
import { Users, Heart, Stethoscope, Syringe, Hospital, Scissors } from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isGuest = !user || user.email === "guest@example.com";

  const handleGuestClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/login");
  };

  return (
    <div style={{ position: "relative" }}>
      {isGuest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={handleGuestClick}
        />
      )}

      {/* Hero Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Caring for Your <span className="text-warning">Beloved Pets</span>
          </h1>
          <p className="lead mt-3">
            Experience compassionate veterinary care with our team of expert veterinarians. 
            We provide comprehensive health services to keep your pets healthy and happy.
          </p>
          <div className="mt-4">
            <Link to={isGuest ? "/login" : "/appointments"} className="btn btn-warning me-3">
              Book Appointment
            </Link>
            <Link to={isGuest ? "/login" : "/products"} className="btn btn-outline-light">
              View Products
            </Link>
          </div>
          <img
            src={dogImage}
            alt="Dog"
            className="img-fluid rounded shadow mt-4"
            style={{ maxHeight: "400px" }}
            onClick={isGuest ? handleGuestClick : undefined}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <h2 className="fw-bold">5000+</h2>
              <p>Happy Pets Treated</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold">10+</h2>
              <p>Years of Experience</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold">15</h2>
              <p>Expert Veterinarians</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold">24/7</h2>
              <p>Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Veterinary Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Our Veterinary Services</h2>
          <p className="text-center text-muted mb-5">
            We offer a complete range of veterinary services to keep your pets healthy, 
            from routine check-ups to advanced medical treatments.
          </p>
          <div className="row g-4">
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Stethoscope size={48} className="text-primary" />
                <h5 className="mt-3">General Health Check-ups</h5>
                <p className="text-muted">
                  Comprehensive health examinations for your pets to ensure they stay healthy and happy.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Syringe size={48} className="text-success" />
                <h5 className="mt-3">Vaccinations</h5>
                <p className="text-muted">
                  Essential vaccinations to protect your pets from serious diseases and infections.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Hospital size={48} className="text-danger" />
                <h5 className="mt-3">Emergency Care</h5>
                <p className="text-muted">
                  24/7 emergency services for critical situations when every second counts.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Scissors size={48} className="text-warning" />
                <h5 className="mt-3">Surgery Services</h5>
                <p className="text-muted">
                  Advanced surgical procedures performed by our skilled veterinarians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Veterinary Services Icons */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Our Veterinary Services</h2>
          <p className="text-center text-muted mb-5">
            We offer a complete range of veterinary services to keep your pets healthy,
            from routine check-ups to advanced medical treatments.
          </p>
          <div className="row g-4">
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Stethoscope size={48} className="text-primary" />
                <h5 className="mt-3">General Health Check-ups</h5>
                <p className="text-muted">
                  Comprehensive health examinations for your pets to ensure they stay healthy and happy.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Syringe size={48} className="text-success" />
                <h5 className="mt-3">Vaccinations</h5>
                <p className="text-muted">
                  Essential vaccinations to protect your pets from serious diseases and infections.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Hospital size={48} className="text-danger" />
                <h5 className="mt-3">Emergency Care</h5>
                <p className="text-muted">
                  24/7 emergency services for critical situations when every second counts.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                <Scissors size={48} className="text-warning" />
                <h5 className="mt-3">Surgery Services</h5>
                <p className="text-muted">
                  Advanced surgical procedures performed by our skilled veterinarians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Why Choose PawCare Clinic?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <Users size={56} className="text-primary" />
              <h5 className="mt-3">Experienced Team</h5>
              <p className="text-muted">
                Our team of certified veterinarians has over 10 years of combined experience in animal healthcare.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <Heart size={56} className="text-success" />
              <h5 className="mt-3">Compassionate Care</h5>
              <p className="text-muted">
                We treat every pet with love and compassion, understanding the special bond between you and your furry friend.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <Hospital size={56} className="text-info" />
              <h5 className="mt-3">Modern Equipment</h5>
              <p className="text-muted">
                State-of-the-art medical equipment and facilities ensure your pets receive the highest quality care.
              </p>
            </div>
          </div>

          {/* Clinic image */}
          <div className="text-center mt-5">
            <img 
              src={dog2Image}
              alt="Clinic overview" 
              className="img-fluid rounded shadow" 
              style={{ maxHeight: "300px" }}
              onClick={isGuest ? handleGuestClick : undefined}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h3 className="fw-bold">Ready to Give Your Pet the Best Care?</h3>
          <p className="mb-4">
            Contact us today to schedule an appointment or learn more about our services.
            Your pet's health is our priority.
          </p>
          <div className="mt-3">
            <Link to={isGuest ? "/login" : "/appointments"} className="btn btn-warning me-3">
              Schedule Appointment
            </Link>
            <a href="tel:+15551234567" className="btn btn-outline-light">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
