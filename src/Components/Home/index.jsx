import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isGuest = !user || user.email === 'guest@example.com';

  const handleGuestClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login');
  };

  return (
    <div className="container" style={{ position: 'relative' }}>
      {isGuest && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={handleGuestClick}
        />
      )}
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
              <Link to="/appointments" className="btn btn-primary">
                Book an Appointment
              </Link>
              <Link to="/services" className="btn btn-outline">
                Our Services
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img 
              src="/pet-hero.jpg" 
              alt="Happy pets" 
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      <section className="services-section py-5 my-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row g-4">
          {[
            {
              title: 'Wellness Exams',
              description: 'Regular check-ups to ensure your pet is in top condition.'
            },
            {
              title: 'Vaccinations',
              description: 'Keep your pet protected with our vaccination programs.'
            },
            {
              title: 'Dental Care',
              description: 'Professional dental cleaning and oral health services.'
            },
            {
              title: 'Surgery',
              description: 'Expert surgical procedures performed by our skilled veterinarians.'
            },
            {
              title: 'Emergency Care',
              description: '24/7 emergency services for urgent pet healthcare needs.'
            },
            {
              title: 'Grooming',
              description: 'Professional grooming services to keep your pet looking their best.'
            }
          ].map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
