import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImg from '../assets/breadcrumb.png';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import maxProfilePlaceholder from '../assets/max.png';
import warehousePlaceholder from '../assets/about-big.png';


export default function DetailPetani() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverPetani, setHoverPetani] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

useEffect(() => {
  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userRes, fieldRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/farmers/${id}`),
        axios.get(`http://127.0.0.1:8000/api/farmers/${id}/fields`)
      ]);

      setUser(userRes.data.data); // asumsi response langsung berupa user object
      setWarehouses(fieldRes.data.data); // asumsi response langsung berupa array lahan
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setError('Gagal memuat data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  fetchDetail();
}, [id]);


  const formatDateTime = (date) => {
    try {
      return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-success me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="text-success fs-5">Memuat data...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">Oops! Terjadi Kesalahan</h4>
            <p>{error || 'Data tidak ditemukan'}</p>
            <Link to="/petani" className="btn btn-outline-danger">
              Kembali ke Daftar Petani
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
      <Navbar />

      {/* Breadcrumb Section */}
      <section
        className="text-white text-center position-relative d-flex align-items-center justify-content-center text-white text-center py-5"
        style={{
          backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }}
      >
        <div className="position-relative z-1 container">
          <h1 className="display-4 mb-4 mt-5 fw-bold">{user.name}</h1>
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
            <Link
              to="/petani"
              style={{
                textDecoration: 'none',
                color: hoverPetani ? '#ccc' : 'white',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={() => setHoverPetani(true)}
              onMouseLeave={() => setHoverPetani(false)}
            >
              Petani
            </Link>
            <span className="mx-2">/</span>
            <span>{user.name}</span>
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Petani Info Card */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-body p-0">
                {/* Profile Image Section */}
                <div className="position-relative bg-success bg-opacity-10 p-4">
                  <div className="text-center">
<img
  src={
    user.profile_photo_url
      ? `http://localhost:3001/${user.profile_photo_url}`
      : maxProfilePlaceholder
  }
  alt={user.name}
  className="rounded-circle border border-3 border-success shadow-lg cursor-pointer"
  style={{ 
    width: '200px', 
    height: '200px', 
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }}
  onClick={() => openImageModal(
    user.profile_photo_url
      ? `http://localhost:3001/${user.profile_photo_url}`
      : maxProfilePlaceholder
  )}
  onMouseOver={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 8px 25px rgba(34, 139, 34, 0.4)';
  }}
  onMouseOut={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
  }}
  onError={(e) => {
    e.target.src = maxProfilePlaceholder;
  }}
/>

                    <div className="position-absolute top-0 end-0 m-3">
                      <button 
                        className="btn btn-dark btn-sm rounded-pill"
                        onClick={() => openImageModal(
                          user.profile_photo_url
                            ? `http://localhost:3001/${user.profile_photo_url}`
                            : "/default-avatar.png"
                        )}
                      >
                        <i className="bi bi-arrows-fullscreen"></i> Perbesar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Petani Details */}
                <div className="p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h3 className="text-success fw-bold mb-3">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.name}
                      </h3>
                      <p className="mb-2">
                        <i className="bi bi-envelope me-2 text-success"></i>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="mb-2">
                        <i className="bi bi-telephone me-2 text-success"></i>
                        <strong>Telepon:</strong> {user.phone_number}
                      </p>
                      <p className="mb-2">
                        <i className="bi bi-calendar-plus me-2 text-success"></i>
                        <strong>Bergabung pada:</strong> {formatDateTime(user.created_at)}
                      </p>
                      {user.updated_at !== user.created_at && (
                        <p className="mb-0">
                          <i className="bi bi-calendar-check me-2 text-warning"></i>
                          <strong>Terakhir diperbarui:</strong> {formatDateTime(user.updated_at)}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 text-end">
                      <div className="badge bg-success fs-6 px-3 py-2">
                        <i className="bi bi-patch-check me-2"></i>
                        Petani Terdaftar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouses Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold mb-0">
              <i className="bi bi-house-door me-2"></i>
              Daftar Lahan ({warehouses.length})
            </h4>
          </div>

          {warehouses.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-inbox display-1 d-block mb-3 text-muted"></i>
                <h5>Belum ada lahan yang terdaftar</h5>
                <p>Petani ini belum mendaftarkan lahan pertanian apapun.</p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {warehouses.map((wh) => (
                <div key={wh.id} className="col-md-6">
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="card-body p-0">
                      {/* Warehouse Main Image */}
                      {wh.photos?.length > 0 && (
                        <div className="position-relative">
<img
  src={
    wh.photos?.length > 0
      ? `http://localhost:3001/${wh.photos[0]}`
      : warehousePlaceholder
  }
  alt={wh.name}
  className="w-100"
  style={{
    height: '250px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }}
  onClick={() => openImageModal(
    wh.photos?.length > 0
      ? `http://localhost:3001/${wh.photos[0]}`
      : warehousePlaceholder
  )}
  onMouseOver={(e) => {
    e.target.style.transform = 'scale(1.03)';
    e.target.style.boxShadow = '0 8px 25px rgba(34, 139, 34, 0.2)';
  }}
  onMouseOut={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
  }}
  onError={(e) => {
    e.target.src = warehousePlaceholder;
  }}
/>

                          <div className="position-absolute top-0 end-0 m-2">
                            <button 
                              className="btn btn-dark btn-sm rounded-pill"
                              onClick={() => openImageModal(`http://localhost:3001/${wh.photos[0]}`)}
                            >
                              <i className="bi bi-arrows-fullscreen"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Thumbnails */}
                      {wh.photos?.length > 1 && (
                        <div className="p-3 border-bottom">
                          <div className="d-flex justify-content-center gap-2 flex-wrap">
                            {wh.photos.slice(1, 4).map((photo, idx) => (
                              <img
                                key={idx}
                                src={`http://localhost:3001/${photo}`}
                                alt={`Thumbnail ${idx + 1}`}
                                onClick={() => openImageModal(`http://localhost:3001/${photo}`)}
                                className="rounded shadow-sm border"
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.transform = 'scale(1.1)';
                                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.transform = 'scale(1)';
                                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ))}
                            {wh.photos.length > 4 && (
                              <div 
                                className="d-flex align-items-center justify-content-center bg-light rounded border text-muted"
                                style={{ width: '60px', height: '60px', fontSize: '0.8rem' }}
                              >
                                +{wh.photos.length - 4}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Warehouse Details */}
                      <div className="p-4">
                        <h5 className="text-success fw-bold mb-3">
                          <i className="bi bi-house-door me-2"></i>
                          {wh.name}
                        </h5>
                        
                        {wh.area && (
                          <p className="mb-2 text-muted small">
                            <i className="bi bi-rulers me-2"></i>
                            <strong>Luas:</strong> {wh.area} m²
                          </p>
                        )}
                        
                        <p className="mb-3 text-muted small">
                          <i className="bi bi-calendar-plus me-2"></i>
                          <strong>Dibuat:</strong> {formatDateTime(wh.created_at)}
                        </p>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 justify-content-between">
                          <Link 
                            to={`/lahan/${wh.id}`} 
                            className="btn btn-success flex-fill"
                          >
                            <i className="bi bi-eye me-2"></i>
                            Lihat Detail Lahan
                          </Link>
                          {wh.location_url && (
                            <a
                              href={wh.location_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-success"
                            >
                              <i className="bi bi-geo-alt"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link to="/petani" className="btn btn-outline-success btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Kembali ke Daftar Petani
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && selectedImage && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={closeImageModal}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeImageModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}