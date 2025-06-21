import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logoPutih from '../../assets/logo_putih.png';  // Adjust the path as necessary

// Placeholder for logo - replace with your actual logo import

export default function Footer() {
  return (
    <>
      <footer 
        style={{ 
          backgroundColor: '#2E7D32', 
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }} 
        className="pt-5 pb-3"
      >
        {/* Subtle background pattern */}
        {/* <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            zIndex: 0
          }}
        ></div> */}
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            {/* Kolom 5 - Logo & Sosial Media */}
            <div className="col-md-6 mb-4">
              <div className="mb-4">
                <img 
                  src={logoPutih} 
                  alt="AgriCloud" 
                  style={{ 
                    height: '44px',
                    transition: 'transform 0.3s ease',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} 
                  className="mb-3"
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              
              <p 
                style={{
                  textAlign: 'justify', 
                  color: '#EAF2EA',
                  lineHeight: '1.7',
                  fontSize: '15px',
                  marginBottom: '24px'
                }}
              >
                AgriCloud adalah platform digital terintegrasi yang dirancang khusus untuk membantu petani mengelola pertanian dengan lebih efisien. Pantau lahan, kelola stok, dan rencanakan setiap langkah untuk mencapai hasil panen yang optimal dan berkualitas.
              </p>
              
              <div className="d-flex gap-3">
                {[
                  { icon: FaFacebookF, label: 'Facebook' },
                  { icon: FaInstagram, label: 'Instagram' },
                  { icon: FaTwitter, label: 'Twitter' }
                // eslint-disable-next-line no-unused-vars
                ].map(({ icon: Icon, label }) => (
                  <button 
                    key={label}
                    className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '44px',
                      height: '44px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.1)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                    aria-label={label}
                  >
                    <Icon style={{ color: '#2E7D32', fontSize: '16px' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Kolom 3 - Explore */}
            <div className="col-md-3 mb-4 text-center">
              <h5 
                style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  position: 'relative',
                  paddingBottom: '8px'
                }}
              >
                Explore
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '2px',
                    backgroundColor: '#EAF2EA',
                    borderRadius: '1px'
                  }}
                ></div>
              </h5>
              
              <ul className="list-unstyled">
                {['Home', 'About', 'Services', 'Gallery'].map((item) => (
                  <li key={item} className='mb-3'>
                    <a 
                      href="#" 
                      className="text-white text-decoration-none d-inline-block"
                      style={{
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#EAF2EA';
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        e.target.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'white';
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 4 - Contact */}
            <div className="col-md-3 mb-4">
              <h5 
                style={{ 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  position: 'relative',
                  paddingBottom: '8px'
                }}
              >
                Contact
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '30px',
                    height: '2px',
                    backgroundColor: '#EAF2EA',
                    borderRadius: '1px'
                  }}
                ></div>
              </h5>
              
              <ul className="list-unstyled">
                {[
                  { icon: '📞', text: '0812-3456-7890', type: 'phone' },
                  { icon: '✉️', text: 'agricloud@company.com', type: 'email' },
                  { icon: '📍', text: 'Jl. Pertanian No.123, Jakarta', type: 'address' }
                ].map((contact, index) => (
                  <li 
                    key={index}
                    className='mb-3 d-flex align-items-start'
                    style={{
                      transition: 'all 0.3s ease',
                      padding: '8px 0',
                      borderRadius: '6px',
                      cursor: contact.type !== 'address' ? 'pointer' : 'default'
                    }}
                    onMouseEnter={(e) => {
                      if (contact.type !== 'address') {
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        e.target.style.transform = 'translateX(3px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (contact.type !== 'address') {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span style={{ marginRight: '12px', fontSize: '16px' }}>
                      {contact.icon}
                    </span>
                    <span style={{ fontSize: '15px', lineHeight: '1.5' }}>
                      {contact.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer bawah */}
      <div 
        style={{ 
          backgroundColor: '#EAF2EA', 
          color: '#2E7D32',
          borderTop: '1px solid rgba(46, 125, 50, 0.1)'
        }} 
        className="py-3"
      >
        <div className="container d-flex justify-content-between align-items-center flex-wrap text-center text-md-start">
          <small 
            style={{ 
              fontSize: '13px',
              fontWeight: '500'
            }}
          >
            © All Copyright 2025 by AgriCloud
          </small>
          <small className="d-flex align-items-center">
            <a 
              href="#" 
              className="text-success text-decoration-none me-3"
              style={{
                fontSize: '13px',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1B5E20';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#4CAF50';
                e.target.style.textDecoration = 'none';
              }}
            >
              Terms of Use
            </a>
            <span style={{ color: '#81C784', margin: '0 4px' }}>|</span>
            <a 
              href="#" 
              className="text-success text-decoration-none ms-3"
              style={{
                fontSize: '13px',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1B5E20';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#4CAF50';
                e.target.style.textDecoration = 'none';
              }}
            >
              Privacy Policy
            </a>
          </small>
        </div>
      </div>
    </>
  );
}