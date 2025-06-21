import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Import semua assets
import heroImg from '../assets/foto_hero.png';
import Hiasan from '../assets/hiasan.png';
import fitur1 from '../assets/fitur1.png';
import fitur2 from '../assets/fitur2.png';
import fitur3 from '../assets/fitur3.png';
import imgBig from '../assets/about-big.png';
import imgSmall from '../assets/about-small.png';
import icon1 from '../assets/Icon1.svg';
import icon2 from '../assets/Icon2.png';
import sayurmayur from '../assets/sayurmayur.jpg';
import petaniImg from '../assets/petani1.png';
import tanaman1 from '../assets/tanaman1.png';
import tanaman2 from '../assets/tanaman2.png';
import tanaman3 from '../assets/tanaman3.png';
import img1 from '../assets/gallery1.png';
import img2 from '../assets/gallery2.png';
import img3 from '../assets/gallery3.png';
import img4 from '../assets/gallery4.png';
import img5 from '../assets/gallery5.png';
import img6 from '../assets/gallery6.png';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';


// Hero Section Component
const HeroSection = () => {
  return (
    <section
      className="hero-bg d-flex align-items-center position-relative mt-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-10">
            <div className="hero-content text-white" style={{ marginTop: '-50px' }}>
              <h4 className="mb-4 text-uppercase fw-bold tracking-wide" style={{ letterSpacing: '2px', fontSize: '1.1rem' }}>
                Selamat Datang di AgriCloud
              </h4>
              <h1
                className="covered-by-your-grace-regular mb-4"
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 7rem)', 
                  lineHeight: '1.1',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                PETANI CERDAS & <br /> PANEN BERKUALITAS
              </h1>
              <p className="lead mb-5" style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                lineHeight: '1.6',
                maxWidth: '600px'
              }}>
                Pemberdayaan petani melalui solusi digital terintegrasi. Kelola pertanian Anda dengan lebih
                cerdas, pantau setiap langkah, dan raih hasil panen yang optimal dan berkualitas.
              </p>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <button 
                  className="btn btn-lg px-4 py-3 fw-bold text-uppercase"
                  style={{
                    backgroundColor: '#2E7D32',
                    color: '#fff',
                    borderRadius: '50px',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1B5E20';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#2E7D32';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Lebih Lanjut
                </button>
                <img src={Hiasan} alt="Hiasan" className="ms-2" style={{ height: '60px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      title: 'LAHAN',
      subtitle: 'Pantau Dan Kelola Lahan',
      image: fitur1,
      alt: 'Monitoring Lahan'
    },
    {
      title: 'TANAMAN',
      subtitle: 'Kelola Tanaman',
      image: fitur2,
      alt: 'Monitoring Tanaman'
    },
    {
      title: 'GUDANG',
      subtitle: 'Manajemen Stok Pertanian',
      image: fitur3,
      alt: 'Manajemen Gudang'
    }
  ];

  return (
    <section className="py-5" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="card h-100 text-center border-0 service-card"
                style={{
                  background: 'linear-gradient(135deg, #EAF2EA 0%, #5B975B 100%)',
                  borderRadius: '25px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="covered-by-your-grace-regular mb-3" style={{ color: '#2E7D32', fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {service.title}
                  </h3>
                  <h5 className="mb-4" style={{ color: '#2E7D32', fontWeight: '600' }}>
                    {service.subtitle}
                  </h5>
                  <div className="mt-auto">
                    <img
                      src={service.image}
                      className="img-fluid"
                      alt={service.alt}
                      style={{
                        height: '80px',
                        width: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src={imgBig}
                alt="Petani Profesional"
                className="img-fluid rounded-circle shadow-lg"
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
              />
              <img
                src={imgSmall}
                alt="Teknologi Pertanian"
                className="position-absolute img-fluid rounded-circle shadow"
                style={{
                  width: '45%',
                  bottom: '-30px',
                  left: '-30px',
                  border: '6px solid white',
                  aspectRatio: '1/1',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ps-lg-4">
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#2E7D32' }}>
                AGRICLOUD
              </h1>
              <h4 className="text-success mb-4 fw-semibold">
                Tumbuh Cerdas, Panen Berkualitas Bersama Kami.
              </h4>
              <p className="text-muted mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                AgriCloud adalah platform digital terintegrasi yang dirancang khusus untuk membantu petani 
                mengelola pertanian dengan lebih efisien. Pantau lahan, kelola stok, dan rencanakan setiap 
                langkah untuk mencapai hasil panen yang optimal dan berkualitas.
              </p>

              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={icon1} alt="Kelola Lahan" style={{ width: '50px', height: '50px' }} className="me-3" />
                    <div>
                      <h6 className="mb-0 fw-bold">Kelola Lahan & Tanaman</h6>
                      <small className="text-muted">Sistem terintegrasi</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={icon2} alt="Manajemen Stok" style={{ width: '50px', height: '50px' }} className="me-3" />
                    <div>
                      <h6 className="mb-0 fw-bold">Manajemen Stok</h6>
                      <small className="text-muted">Inventori otomatis</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.2rem' }}></i>
                  <span>Akses data pertanian Anda kapan saja, di mana saja.</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.2rem' }}></i>
                  <span>Solusi terintegrasi untuk semua kebutuhan manajemen pertanian Anda.</span>
                </div>
              </div>

<Link to="/about">
  <button
    className="btn btn-lg px-4 py-3 fw-bold"
    style={{
      backgroundColor: '#2E7D32',
      color: '#fff',
      borderRadius: '50px',
      border: 'none',
      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
      transition: 'all 0.3s ease',
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#1B5E20';
      e.target.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '#2E7D32';
      e.target.style.transform = 'translateY(0)';
    }}
  >
    Tentang Kami
  </button>
</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Monitoring Section Component
const MonitoringSection = () => {
  return (
    <section
      className="text-white d-flex align-items-center py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(46, 125, 50, 0.8), rgba(0, 0, 0, 0.6)), url(${sayurmayur})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: '60vh',
      }}
    >
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-4 covered-by-your-grace-regular" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Pantau Tanaman Anda
            </h1>
            <p className="lead fs-4 mb-0" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Optimalkan perawatan tanaman dengan data akurat dan analisis mendalam dari sistem kami.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Farmers Section Component
const FarmersSection = () => {
  const crops = [
    { img: tanaman1, title: 'Palawija' },
    { img: tanaman2, title: 'Holtikultura' },
    { img: tanaman3, title: 'Pangan Pokok' }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-3 text-center">
            <img
              src={petaniImg}
              alt="Petani Profesional"
              className="img-fluid rounded shadow-lg"
              style={{ 
                maxHeight: '400px', 
                width: '100%', 
                objectFit: 'cover',
                borderRadius: '20px !important'
              }}
            />
          </div>

          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-4" style={{ color: '#2E7D32' }}>
              KENALI PETANI KAMI
            </h1>
            <p className="mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem', textAlign: 'justify' }}>
              Bersama para petani terbaik dari berbagai daerah, kami menciptakan sistem monitoring lahan 
              terintegrasi untuk meningkatkan produktivitas dan keberlanjutan pertanian Indonesia.
            </p>

            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.2rem' }}></i>
                <span className="fw-semibold">Desain untuk Petani</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.2rem' }}></i>
                <span className="fw-semibold">Aplikasi mudah digunakan</span>
              </div>
            </div>

<Link to="/petani" style={{ textDecoration: 'none' }}>
  <button
    className="btn btn-lg px-4 py-3 fw-bold"
    style={{
      backgroundColor: '#2E7D32',
      color: '#fff',
      borderRadius: '50px',
      border: 'none',
      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
      transition: 'all 0.3s ease',
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#1B5E20';
      e.target.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '#2E7D32';
      e.target.style.transform = 'translateY(0)';
    }}
  >
    Kenali Petani
  </button>
</Link>
          </div>

          <div className="col-lg-3">
            <div
              className="p-4 rounded shadow-sm"
              style={{
                backgroundColor: '#EAF2EA',
                borderRadius: '20px',
              }}
            >
              {crops.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                    }}
                  />
                  <h5 className="mb-0 covered-by-your-grace-regular fw-bold" style={{ color: '#2E7D32' }}>
                    {item.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section Component
const GallerySection = () => {
  const galleryItems = [
    { img: img1, title: 'KEBUN JAGUNG' },
    { img: img2, title: 'KEBUN GANDUM' },
    { img: img3, title: 'KEBUN STRAWBERRY' },
    { img: img4, title: 'KEBUN ANGGUR' },
    { img: img5, title: 'KEBUN SELADA' },
    { img: img6, title: 'KEBUN SAWI' },
  ];

  return (
    <>
      <style>{`
        .gallery-card {
          aspect-ratio: 4/5;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
          display: flex;
          align-items: end;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .gallery-title {
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          margin: 0;
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .gallery-card:hover img {
          transform: scale(1.1);
        }

        .gallery-card:hover .gallery-overlay {
          background: linear-gradient(to top, rgba(46, 125, 50, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
        }

        .gallery-card:hover .gallery-title {
          transform: translateY(-5px);
        }
      `}</style>

      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3" style={{ color: '#2E7D32' }}>
              Galeri Pertanian
            </h2>
            <p className="lead text-muted">
              Lihat berbagai jenis tanaman yang dapat Anda kelola dengan AgriCloud
            </p>
          </div>
          
          <div className="row g-4">
            {galleryItems.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="gallery-card">
                  <img src={item.img} alt={item.title} />
                  <div className="gallery-overlay">
                    <h4 className="gallery-title">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="container-fluid p-0 m-0" style={{ backgroundColor: '#EAF2EA' }}>
        <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <MonitoringSection />
      <FarmersSection />
      <GallerySection />
      <Footer />
    </div>
  );
}