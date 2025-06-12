import React, { useState } from 'react';
import { FaHome, FaTractor, FaRocket, FaEye, FaWarehouse, FaQuoteLeft, FaChevronRight } from 'react-icons/fa';
import { GiPoland } from "react-icons/gi";
import { Link } from 'react-router-dom';
import logo from '../assets/logoagri.png';
import layananImg from '../assets/petanigarap.png';
import joinImg from '../assets/bergabung.png';
import team1 from '../assets/max.png';
import team2 from '../assets/max.png';
import team3 from '../assets/max.png';
import team4 from '../assets/max.png';
import team5 from '../assets/max.png';
import Traktor from '../assets/traktor.png';
import backgroundImg from '../assets/breadcrumb.png';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

export default function AboutUs() {
  const teamMembers = [
    { img: team1, name: "Dewi Nuraini", position: "UI/UX Designer", expertise: "User Experience Design" },
    { img: team2, name: "Nadira Aulia Dewi", position: "UI/UX - Frontend Developer", expertise: "Frontend Development" },
    { img: team3, name: "Mu'az Mu'az", position: "Project Manager", expertise: "Project Management" },
    { img: team4, name: "Muhammad Fatih", position: "Frontend Developer", expertise: "Web Development" },
    { img: team5, name: "Muhammad Yassir", position: "Backend Developer", expertise: "System Architecture" },
  ];

  const services = [
    {
      icon: FaTractor,
      title: "Manajemen Tanaman Terintegrasi",
      subtitle: "Kelola Pertumbuhan & Kesehatan Tanaman",
      description: "Platform canggih yang memungkinkan monitoring real-time pertumbuhan tanaman, analisis kesehatan tanaman berbasis AI, dan rekomendasi perawatan yang dipersonalisasi untuk mengoptimalkan hasil panen.",
      features: ["Monitor Real-time", "Analisis AI", "Rekomendasi Cerdas"]
    },
    {
      icon: GiPoland,
      title: "Sistem Manajemen Lahan",
      subtitle: "Pantau & Optimalkan Lahan Pertanian",
      description: "Solusi komprehensif berbasis teknologi IoT dan satelit untuk memantau kondisi tanah, cuaca, dan lingkungan. Memberikan insights mendalam untuk perencanaan strategis pengelolaan lahan.",
      features: ["IoT Monitoring", "Satelit Tracking", "Weather Analytics"]
    },
    {
      icon: FaWarehouse,
      title: "Smart Warehouse Management",
      subtitle: "Optimalisasi Stok & Distribusi",
      description: "Sistem manajemen gudang berbasis cloud yang mengintegrasikan inventaris, tracking otomatis, dan analisis prediktif untuk efisiensi maksimal dalam pengelolaan stok hasil pertanian.",
      features: ["Cloud Integration", "Auto Tracking", "Predictive Analytics"]
    }
  ];

  const [hoverHome, setHoverHome] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const professionalStyles = {
    container: {
      backgroundColor: '#F8FFFE',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    section: {
      padding: '5rem 0'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    serviceCard: {
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    modernButton: {
      background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
    }
  };

  return (
    <div style={professionalStyles.container}>
      <Navbar />

      {/* Hero - Breadcrumb Section */}
      <section
        className="text-white text-center position-relative d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '350px',
        }}
      >
        <div className="position-relative z-1 container">
          <h1 className="display-4 mb-4 mt-5 fw-bold">Tentang Kami</h1>
          <p style={{ fontSize: '1.1rem' }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: hoverHome ? '#ccc' : 'white',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={() => setHoverHome(true)}
              onMouseLeave={() => setHoverHome(false)}
            >
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span>Tentang Kami</span>
          </p>
        </div>
      </section>

      {/* About Us Section - Enhanced */}
      <section className="container" style={professionalStyles.section}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <div 
                className="position-absolute"
                style={{
                  top: '-20px',
                  left: '-20px',
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                  borderRadius: '50%',
                  zIndex: -1
                }}
              ></div>
              <img 
                src={logo} 
                alt="AgriCloud Logo" 
                className="img-fluid"
                style={{ 
                  maxWidth: '400px', 
                  width: '100%',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
                }} 
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-4">
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
                Tentang AgriCloud
              </span>
              <h1 className="display-5 fw-bold mb-4" style={professionalStyles.gradientText}>
                Revolusi Digital untuk Pertanian Modern
              </h1>
            </div>
            <p className="lead mb-4" style={{ 
              color: '#64748b', 
              lineHeight: '1.8',
              fontSize: '1.2rem'
            }}>
              AgriCloud adalah platform manajemen pertanian berteknologi tinggi yang menggabungkan kecerdasan buatan, IoT, dan analisis data untuk memberdayakan petani dalam mencapai efisiensi maksimal.
            </p>
            <div className="d-flex align-items-center">
              <div className="me-4">
                <div className="fw-bold fs-2 text-success">10K+</div>
                <small className="text-muted">Petani Terdaftar</small>
              </div>
              <div className="me-4">
                <div className="fw-bold fs-2 text-success">99.9%</div>
                <small className="text-muted">Uptime</small>
              </div>
              <div>
                <div className="fw-bold fs-2 text-success">24/7</div>
                <small className="text-muted">Support</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section style={{ ...professionalStyles.section, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
              Layanan Unggulan
            </span>
            <h2 className="display-5 fw-bold mb-4" style={professionalStyles.gradientText}>
              Solusi Teknologi Pertanian Terdepan
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Kami menghadirkan ekosistem teknologi pertanian yang komprehensif dan terintegrasi
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`p-4 mb-4 ${activeService === index ? 'shadow-lg' : 'shadow-sm'}`}
                  style={{
                    ...professionalStyles.serviceCard,
                    transform: activeService === index ? 'translateY(-5px)' : 'translateY(0)',
                    borderColor: activeService === index ? '#22C55E' : '#e2e8f0'
                  }}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: '70px',
                          height: '70px',
                          background: activeService === index ? 
                            'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' : 
                            'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                          borderRadius: '16px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <service.icon 
                          size={35} 
                          className={activeService === index ? 'text-white' : 'text-success'} 
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center mb-2">
                        <h4 className="mb-0 me-2">{service.title}</h4>
                        <FaChevronRight 
                          className={`text-success transition-all ${activeService === index ? 'ms-2' : ''}`}
                          style={{ 
                            transform: activeService === index ? 'translateX(5px)' : 'translateX(0)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                      <p className="text-success mb-2 fw-medium">{service.subtitle}</p>
                      <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                        {service.description}
                      </p>
                      <div className="d-flex gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="badge bg-success bg-opacity-10 text-success">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: '100px' }}>
                <div className="position-relative overflow-hidden rounded-4 shadow-lg">
                  <img
                    src={layananImg}
                    alt="Layanan Kami"
                    className="w-100"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.2) 100%)' }}>
                  </div>
                  <div
                    className="position-absolute bg-white shadow-lg"
                    style={{
                      top: '20px',
                      right: '20px',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Layanan Kami
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Enhanced */}
      <section className="container" style={professionalStyles.section}>
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="text-center mb-5">
              <div 
                className="d-inline-block p-4 rounded-4 mb-4"
                style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
              >
                <img 
                  src={Traktor} 
                  alt="Traktor" 
                  className="img-fluid"
                  style={{ height: '12rem', maxWidth: '100%' }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
                Objektif Kami
              </span>
              <h2 className="display-6 fw-bold mb-4" style={professionalStyles.gradientText}>
                Memberdayakan Pertanian Berkelanjutan
              </h2>
              <div className="position-relative">
                <FaQuoteLeft className="text-success opacity-25 position-absolute" 
                  style={{ fontSize: '3rem', top: '-10px', left: '-20px' }} />
                <p className="lead fst-italic text-muted px-4" style={{ lineHeight: '1.8' }}>
                  Memberdayakan petani dengan teknologi pertanian presisi guna meningkatkan efisiensi operasional, mengoptimalkan penggunaan sumber daya, dan memaksimalkan hasil panen secara berkelanjutan.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-5">
            <div style={professionalStyles.card} className="p-5 h-100 shadow-lg">
              {/* Vision Section */}
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div 
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                        borderRadius: '12px'
                      }}
                    >
                      <FaRocket size={24} className="text-white" />
                    </div>
                    <h3 className="mb-0 fw-bold" style={professionalStyles.gradientText}>VISI</h3>
                  </div>
                </div>
                <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
                  Mewujudkan pertanian yang cerdas, efisien, dan berkelanjutan melalui teknologi yang mudah diakses oleh setiap petani di Indonesia.
                </p>
              </div>
              
              {/* Mission Section */}
              <div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div 
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                        borderRadius: '12px'
                      }}
                    >
                      <FaEye size={24} className="text-white" />
                    </div>
                    <h3 className="mb-0 fw-bold" style={professionalStyles.gradientText}>MISI</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Menyediakan platform terintegrasi untuk manajemen pertanian yang komprehensif dan user-friendly",
                    "Meningkatkan produktivitas petani melalui analisis data yang akurat dan actionable insights",
                    "Membangun ekosistem pertanian digital yang sustainable dan scalable"
                  ].map((mission, index) => (
                    <div key={index} className="d-flex align-items-start mb-3">
                      <div 
                        className="me-3 mt-1 flex-shrink-0"
                        style={{
                          width: '8px',
                          height: '8px',
                          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                          borderRadius: '50%'
                        }}
                      ></div>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                        {mission}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section - Enhanced */}
      <section style={{ ...professionalStyles.section, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
                  Bergabung dengan Kami
                </span>
                <h2 className="display-6 fw-bold mb-4" style={professionalStyles.gradientText}>
                  Menjadi Bagian Revolusi Pertanian Digital
                </h2>
                <div className="position-relative overflow-hidden rounded-4 shadow-lg">
                  <img
                    src={joinImg}
                    alt="Bergabung dengan Kami"
                    className="img-fluid w-100"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.2) 100%)' }}>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <p className="lead mb-4" style={{ 
                  color: '#64748b', 
                  lineHeight: '1.8',
                  fontSize: '1.2rem'
                }}>
                  Bergabunglah dengan ribuan petani cerdas yang telah merasakan transformasi digital dalam pengelolaan pertanian mereka. Dapatkan akses eksklusif ke teknologi terdepan dan komunitas yang supportif.
                </p>
                
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="me-2 text-success">✓</div>
                      <small className="text-muted">Free Trial 30 Hari</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="me-2 text-success">✓</div>
                      <small className="text-muted">24/7 Customer Support</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="me-2 text-success">✓</div>
                      <small className="text-muted">Training & Onboarding</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="me-2 text-success">✓</div>
                      <small className="text-muted">Community Access</small>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn w-100"
                  style={professionalStyles.modernButton}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
                  }}
                >
                  Mulai Transformasi Digital Anda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section className="container text-center" style={professionalStyles.section}>
        <div className="mb-5">
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
            Tim Profesional
          </span>
          <h2 className="display-5 fw-bold mb-4" style={professionalStyles.gradientText}>
            Dipimpin oleh Para Ahli
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Tim multidisiplin dengan pengalaman bertahun-tahun di bidang teknologi dan pertanian
          </p>
        </div>

        <div className="row justify-content-center g-4">
          {teamMembers.map((member, index) => {
            const sizes = [160, 200, 280, 200, 160];
            const size = sizes[index];
            const isCenter = index === 2;
            
            return (
              <div key={index} className="col-auto">
                <div 
                  className="team-member position-relative"
                  style={{ 
                    transform: isCenter ? 'translateY(-20px)' : 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-relative mb-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="rounded-circle shadow-lg"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        objectFit: 'cover',
                        border: isCenter ? '6px solid #22C55E' : '4px solid #fff',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    {/* {isCenter && (
                      <div 
                        className="position-absolute bg-success text-white px-2 py-1 rounded-pill"
                        style={{
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        Team Lead
                      </div>
                    )} */}
                  </div>
                  
                  <div
                    style={{ ...professionalStyles.card, maxWidth: '200px' }}
                    className="p-3 mx-auto shadow-sm"
                  >
                    <h5 className="mb-1 fw-bold">{member.name}</h5>
                    <p className="text-success mb-1 fw-medium" style={{ fontSize: '0.9rem' }}>
                      {member.position}
                    </p>
                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                      {member.expertise}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}