import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import dogImage from "../../assets/img/Dig_Defence.jpeg";
import dog2Image from "../../assets/img/dog.png";
import { Users, Heart, Stethoscope, Syringe, Hospital, Scissors } from "lucide-react";
import Footer from "../Footer";
import ScrollToTop from "../Animations/ScrollToTop";
import { 
  ScrollFadeIn, 
  ScrollSlideInLeft, 
  ScrollSlideInRight, 
  ScrollScaleIn, 
  ScrollStaggerContainer, 
  ScrollStaggerItem, 
  HoverCard, 
  ScrollBounce,
  Pulse 
} from "../Animations/AnimationComponents";

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

      {/* Hero Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <ScrollFadeIn delay={0.2}>
            <h1 className="display-4 fw-bold">
              Caring for Your <span className="text-warning">Beloved Pets</span>
            </h1>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p className="lead mt-3">
              Experience compassionate veterinary care with our team of expert veterinarians. 
              We provide comprehensive health services to keep your pets healthy and happy.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.6}>
            <div className="mt-4">
              <a href="#about" className="btn btn-warning me-3">About Us</a>
              <Link to="/services" className="btn btn-outline-light">View Services</Link>
            </div>
          </ScrollFadeIn>
          <ScrollScaleIn delay={0.8}>
            <img
              src={dogImage}
              alt="Dog" 
              className="img-fluid rounded shadow mt-4"
              style={{ maxHeight: "400px" }}
              onClick={isGuest ? handleGuestClick : undefined}
            />
          </ScrollScaleIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <ScrollStaggerContainer>
            <div className="row g-4">
              <ScrollStaggerItem className="col-6 col-md-3">
                <ScrollBounce>
                  <h2 className="fw-bold text-primary">5000+</h2>
                  <p>Happy Pets Treated</p>
                </ScrollBounce>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-6 col-md-3">
                <ScrollBounce delay={0.1}>
                  <h2 className="fw-bold text-success">10+</h2>
                  <p>Years of Experience</p>
                </ScrollBounce>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-6 col-md-3">
                <ScrollBounce delay={0.2}>
                  <h2 className="fw-bold text-warning">15</h2>
                  <p>Expert Veterinarians</p>
                </ScrollBounce>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-6 col-md-3">
                <ScrollBounce delay={0.3}>
                  <h2 className="fw-bold text-danger">24/7</h2>
                  <p>Emergency Support</p>
                </ScrollBounce>
              </ScrollStaggerItem>
            </div>
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* Our Veterinary Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <ScrollFadeIn>
            <h2 className="fw-bold text-center mb-4">Our Veterinary Services</h2>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.2}>
            <p className="text-center text-muted mb-5">
              We offer a complete range of veterinary services to keep your pets healthy, 
              from routine check-ups to advanced medical treatments.
            </p>
          </ScrollFadeIn>
          <ScrollStaggerContainer>
            <div className="row g-4">
              <ScrollStaggerItem className="col-md-6 col-lg-6">
                <HoverCard>
                  <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                    <Pulse>
                      <Stethoscope size={48} className="text-primary" />
                    </Pulse>
                    <h5 className="mt-3">General Health Check-ups</h5>
                    <p className="text-muted">
                      Comprehensive health examinations for your pets to ensure they stay healthy and happy.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-md-6 col-lg-6">
                <HoverCard>
                  <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                    <Pulse>
                      <Syringe size={48} className="text-success" />
                    </Pulse>
                    <h5 className="mt-3">Vaccinations</h5>
                    <p className="text-muted">
                      Essential vaccinations to protect your pets from serious diseases and infections.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-md-6 col-lg-6">
                <HoverCard>
                  <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                    <Pulse>
                      <Hospital size={48} className="text-danger" />
                    </Pulse>
                    <h5 className="mt-3">Emergency Care</h5>
                    <p className="text-muted">
                      24/7 emergency services for critical situations when every second counts.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-md-6 col-lg-6">
                <HoverCard>
                  <div className="p-4 border rounded bg-white h-100 shadow-sm text-center">
                    <Pulse>
                      <Scissors size={48} className="text-warning" />
                    </Pulse>
                    <h5 className="mt-3">Surgery Services</h5>
                    <p className="text-muted">
                      Advanced surgical procedures performed by our skilled veterinarians.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
            </div>
          </ScrollStaggerContainer>
        </div>
      </section>

      
      {/* Why Choose Us */}
      <section className="py-5" id="about">
        <div className="container">
          <ScrollFadeIn>
            <h2 className="fw-bold text-center mb-5">Why Choose PawCare Clinic?</h2>
          </ScrollFadeIn>
          <ScrollStaggerContainer>
            <div className="row g-4">
              <ScrollStaggerItem className="col-md-4 text-center">
                <HoverCard>
                  <div className="p-4">
                    <Pulse>
                      <Users size={56} className="text-primary" />
                    </Pulse>
                    <h5 className="mt-3">Experienced Team</h5>
                    <p className="text-muted">
                      Our team of certified veterinarians has over 10 years of combined experience in animal healthcare.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-md-4 text-center">
                <HoverCard>
                  <div className="p-4">
                    <Pulse>
                      <Heart size={56} className="text-success" />
                    </Pulse>
                    <h5 className="mt-3">Compassionate Care</h5>
                    <p className="text-muted">
                      We treat every pet with love and compassion, understanding the special bond between you and your furry friend.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
              <ScrollStaggerItem className="col-md-4 text-center">
                <HoverCard>
                  <div className="p-4">
                    <Pulse>
                      <Hospital size={56} className="text-info" />
                    </Pulse>
                    <h5 className="mt-3">Modern Equipment</h5>
                    <p className="text-muted">
                      State-of-the-art medical equipment and facilities ensure your pets receive the highest quality care.
                    </p>
                  </div>
                </HoverCard>
              </ScrollStaggerItem>
            </div>
          </ScrollStaggerContainer>

          {/* Clinic image */}
          <ScrollFadeIn delay={0.5}>
            <div className="text-center mt-5">
              <img 
                src={dog2Image}
                alt="Clinic overview" 
                className="img-fluid rounded shadow" 
                style={{ maxHeight: "300px" }}
                onClick={isGuest ? handleGuestClick : undefined}
              />
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <ScrollFadeIn>
            <h3 className="fw-bold">Ready to Give Your Pet the Best Care?</h3>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.2}>
            <p className="mb-4">
              Contact us today to schedule an appointment or learn more about our services.
              Your pet's health is our priority.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <div className="mt-3">
              <Link
                to="/contact"
                className="btn btn-warning me-3"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 50);
                }}
              >
                Get in Touch
              </Link>

              <a href="tel:+15551234567" className="btn btn-outline-light">Call Now</a>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
