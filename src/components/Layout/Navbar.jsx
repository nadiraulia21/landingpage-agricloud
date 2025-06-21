import React, { useState } from 'react';
import logoPutih from '../../assets/logo_putih.png'; // Ganti dengan path logo Anda
import { useNavigate } from 'react-router-dom';



// Placeholder for logo - replace with your actual logo import


export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 shadow-sm"
      style={{
        backgroundColor: '#2E7D32',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container">
        <a 
          className="navbar-brand text-white d-flex align-items-center" 
          href="/"
          style={{ 
            textDecoration: 'none',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          <img 
            src={logoPutih} 
            alt="AgriCloud Logo" 
            style={{ 
              height: '28px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </a>

        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <span 
            className="navbar-toggler-icon" 
            style={{ 
              filter: 'invert(1)',
              transition: 'transform 0.3s ease'
            }}
          ></span>
        </button>

        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto text-center">
            {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
              <li className="nav-item mx-2" key={item}>
                <a 
                  className="nav-link text-white px-3 py-2" 
                  href="#"
                  style={{
                    fontWeight: '500',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
            
            {/* Kelola-ku Button masuk di dalam collapse */}
<li className="nav-item mt-3 d-lg-none">
<button
  className="btn fw-semibold"
  style={{ 
    backgroundColor: '#fff', 
    color: '#2E7D32', 
    border: '2px solid #fff',
    borderRadius: '12px',
    padding: '10px 24px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#fff';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '#fff';
    e.target.style.color = '#2E7D32';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  }}
  onClick={() => navigate('/login')}  // <== Tambahkan ini
>
  Kelola-ku
</button>

    </li>
    
          </ul>
          
        </div>

        {/* Kelola-ku Button di kanan atas untuk layar besar */}
        <div className="d-none d-lg-block">
          <button
            className="btn fw-semibold"
            style={{ 
              backgroundColor: '#fff', 
              color: '#2E7D32', 
              border: '2px solid #fff',
              borderRadius: '12px',
              padding: '10px 24px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#2E7D32';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            onClick={() => navigate('/login')}
          >
            Kelola-ku
          </button>
        </div>
      </div>
    </nav>
  );
}