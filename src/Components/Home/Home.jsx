import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/index";
import dog2Image from "../../assets/img/dog.png";
import { Stethoscope, Syringe, Hospital, Scissors, Users, Heart } from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isGuest = !!user && user.role === "guest";

  const handleGuestClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/login");
  };

  return (
    <div className="container" style={{ position: "relative" }}>
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
      <section className="hero-section py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to PawCare Clinic
              <span className="d-block h4 text-muted mt-2">Hello there!</span>
            </h1>
            <p className="lead mb-4">
              Your trusted partner in pet healthcare. We provide comprehensive veterinary
              services to keep your furry friends happy and healthy.
            </p>
            <div className="d-flex gap-3">
              <Link to={isGuest ? "/login" : "/appointments"} className="btn btn-primary">
                Book an Appointment
              </Link>
              <Link to={isGuest ? "/login" : "/services"} className="btn btn-outline">
                Our Services
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src="/pet-hero.jpg"
              alt="Happy pets"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px" }}
              onClick={isGuest ? handleGuestClick : undefined}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5 my-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row g-4">
          {[
            {
              title: "Wellness Exams",
              description: "Regular check-ups to ensure your pet is in top condition.",
            },
            {
              title: "Vaccinations",
              description: "Keep your pet protected with our vaccination programs.",
            },
            {
              title: "Dental Care",
              description: "Professional dental cleaning and oral health services.",
            },
            {
              title: "Surgery",
              description: "Expert surgical procedures performed by our skilled veterinarians.",
            },
            {
              title: "Emergency Care",
              description: "24/7 emergency services for urgent pet healthcare needs.",
            },
            {
              title: "Grooming",
              description: "Professional grooming services to keep your pet looking their best.",
            },
          ].map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                onClick={isGuest ? handleGuestClick : undefined}
                style={{ cursor: isGuest ? "pointer" : "default" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                  <div className="mt-2">
                    <Link
                      to={isGuest ? "/login" : "/services"}
                      className="btn btn-sm btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

          <div className="text-center mt-4">
            <img
              src={dog2Image}
              alt="Clinic overview"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h3 className="fw-bold">Ready to Give Your Pet the Best Care?</h3>
          <p>
            Contact us today to schedule an appointment or learn more about our services.
            Your pet’s health is our priority.
          </p>
          <div className="mt-3">
            <Link to="/appointments" className="btn btn-warning me-3">
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
