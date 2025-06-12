import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';

export default function DetailLahan() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverPetani, setHoverPetani] = useState(false);
  const [hoverUser, setHoverUser] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [whRes, userRes, fieldRes, cycleRes] = await Promise.all([
          axios.get('http://localhost:3001/farmerwarehouse'),
          axios.get('http://localhost:3001/user'),
          axios.get('http://localhost:3001/field'),
          axios.get('http://localhost:3001/cycle'),
        ]);

        const selectedWarehouse = whRes.data.find(w => w.id === parseInt(id));
        if (!selectedWarehouse) {
          setError('Lahan tidak ditemukan');
          return;
        }

        const owner = userRes.data.find(u => u.id === selectedWarehouse.userId);
        const relatedFields = fieldRes.data.filter(f => f.warehouseId === selectedWarehouse.id);
        const fieldIds = relatedFields.map(f => f.id);
        const relatedCycles = cycleRes.data.filter(c => fieldIds.includes(c.fieldId));

        setWarehouse(selectedWarehouse);
        setUser(owner ?? null);
        setFields(relatedFields);
        setCycles(relatedCycles);
        setMainImage(selectedWarehouse.photos?.[0] ?? null);
      } catch (error) {
        console.error('Gagal memuat detail lahan:', error.message);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

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

  const getCropIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('bayam')) return '🥬';
    if (lower.includes('kangkung')) return '🥦';
    if (lower.includes('cabai') || lower.includes('cabe')) return '🌶️';
    if (lower.includes('tomat')) return '🍅';
    if (lower.includes('jagung')) return '🌽';
    if (lower.includes('padi')) return '🌾';
    if (lower.includes('wortel')) return '🥕';
    if (lower.includes('bawang')) return '🧅';
    if (lower.includes('kentang')) return '🥔';
    if (lower.includes('kacang')) return '🥜';
    return '🌱';
  };

  const getStatusBadge = (cycleDate) => {
    const today = new Date();
    const startDate = new Date(cycleDate);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return <span className="badge bg-secondary">Belum Dimulai</span>;
    if (daysDiff < 30) return <span className="badge bg-success">Baru Tanam</span>;
    if (daysDiff < 60) return <span className="badge bg-warning">Pertumbuhan</span>;
    if (daysDiff < 90) return <span className="badge bg-info">Mendekati Panen</span>;
    return <span className="badge bg-primary">Siap Panen</span>;
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

  if (error || !warehouse || !user) {
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
          <h1 className="display-4 mb-4 mt-5 fw-bold">{warehouse.name}</h1>
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
            <Link
              to={`/petani/${user?.id}`}
              style={{
                textDecoration: 'none',
                color: hoverUser ? '#ccc' : 'white',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={() => setHoverUser(true)}
              onMouseLeave={() => setHoverUser(false)}
            >
              {user?.name}
            </Link>
            <span className="mx-2">/</span>
            <span>{warehouse.name}</span>
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Warehouse Info Card */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-body p-0">
                {/* Main Image */}
                {mainImage && (
                  <div className="position-relative">
                    <img
                      src={`http://localhost:3001/${mainImage}`}
                      alt="Foto Utama Lahan"
                      className="w-100 cursor-pointer"
                      style={{ 
                        height: '400px', 
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={() => setImageModalOpen(true)}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <button 
                        className="btn btn-dark btn-sm rounded-pill"
                        onClick={() => setImageModalOpen(true)}
                      >
                        <i className="bi bi-arrows-fullscreen"></i> Perbesar
                      </button>
                    </div>
                  </div>
                )}

                {/* Thumbnails */}
                {warehouse.photos && warehouse.photos.length > 1 && (
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      {warehouse.photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:3001/${photo}`}
                          alt={`Thumbnail ${idx + 1}`}
                          onClick={() => setMainImage(photo)}
                          className={`rounded shadow-sm ${mainImage === photo ? 'border border-3 border-success' : 'border'}`}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: mainImage === photo ? 'scale(1.05)' : 'scale(1)'
                          }}
                          onMouseOver={(e) => {
                            if (mainImage !== photo) {
                              e.target.style.transform = 'scale(1.1)';
                              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (mainImage !== photo) {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                            }
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Warehouse Details */}
                <div className="p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h3 className="text-success fw-bold mb-3">
                        <i className="bi bi-house-door me-2"></i>
                        {warehouse.name}
                      </h3>
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">
                          <i className="bi bi-person-circle me-2"></i>
                          Dikelola oleh:
                        </h6>
                        <Link 
                          to={`/petani/${user.id}`} 
                          className="text-success fw-bold text-decoration-none fs-5"
                        >
                          {user.name} →
                        </Link>
                      </div>
                      {warehouse.area && (
                        <p className="mb-2">
                          <i className="bi bi-rulers me-2 text-success"></i>
                          <strong>Luas Lahan:</strong> {warehouse.area} m²
                        </p>
                      )}
                      <p className="mb-2">
                        <i className="bi bi-calendar-plus me-2 text-success"></i>
                        <strong>Dibuat:</strong> {formatDateTime(warehouse.created_at)}
                      </p>
                      {warehouse.updated_at !== warehouse.created_at && (
                        <p className="mb-0">
                          <i className="bi bi-calendar-check me-2 text-warning"></i>
                          <strong>Terakhir diperbarui:</strong> {formatDateTime(warehouse.updated_at)}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 text-end">
                      {warehouse.location_url && (
                        <a
                          href={warehouse.location_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-lg"
                        >
                          <i className="bi bi-geo-alt me-2"></i>
                          Lihat Lokasi
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fields Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold mb-0">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              Daftar Lahan ({fields.length})
            </h4>
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-inbox display-1 d-block mb-3 text-muted"></i>
                <h5>Belum ada lahan yang terdaftar</h5>
                <p>Warehouse ini belum memiliki lahan yang terdaftar.</p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {fields.map(field => (
                <div key={field.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="card-body p-4">
                      <div className="text-center mb-3">
                        <span style={{ fontSize: '3rem' }}>
                          {getCropIcon(field.name)}
                        </span>
                      </div>
                      <h5 className="text-success fw-bold text-center mb-3">
                        {field.name}
                      </h5>
                      <div className="text-muted small">
                        <p className="mb-2">
                          <i className="bi bi-calendar-plus me-2"></i>
                          <strong>Dibuat:</strong> {formatDate(field.created_at)}
                        </p>
                        {field.area && (
                          <p className="mb-0">
                            <i className="bi bi-rulers me-2"></i>
                            <strong>Luas:</strong> {field.area} m²
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cycles Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold mb-0">
              <i className="bi bi-arrow-repeat me-2"></i>
              Status Siklus Tanaman ({cycles.length})
            </h4>
          </div>

          {cycles.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-arrow-repeat display-1 d-block mb-3 text-muted"></i>
                <h5>Belum ada siklus tanaman</h5>
                <p>Belum ada siklus tanaman yang berjalan di lahan ini.</p>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-success">
                    <tr>
                      <th className="border-0 fw-bold">Tanaman</th>
                      <th className="border-0 fw-bold">Nama Siklus</th>
                      <th className="border-0 fw-bold">Lahan</th>
                      <th className="border-0 fw-bold">Mulai Tanam</th>
                      <th className="border-0 fw-bold">Status</th>
                      <th className="border-0 fw-bold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycles.map(cycle => (
                      <tr key={cycle.id}>
                        <td className="align-middle">
                          <span style={{ fontSize: '1.5rem' }}>
                            {getCropIcon(cycle.name)}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div>
                            <div className="fw-bold text-dark">{cycle.name}</div>
                            {cycle.description && (
                              <small className="text-muted">
                                {cycle.description.length > 50 
                                  ? `${cycle.description.substring(0, 50)}...` 
                                  : cycle.description}
                              </small>
                            )}
                          </div>
                        </td>
                        <td className="align-middle">
                          <span className="badge bg-light text-dark">
                            {cycle.field_name || 'Lahan tidak diketahui'}
                          </span>
                        </td>
                        <td className="align-middle">
                          <small className="text-muted">
                            {formatDate(cycle.created_at)}
                          </small>
                        </td>
                        <td className="align-middle">
                          {getStatusBadge(cycle.created_at)}
                        </td>
                        <td className="align-middle">
                          <div className="d-flex gap-2">
                            <Link 
                              to={`/cycle/${cycle.id}`} 
                              className="btn btn-sm btn-success"
                            >
                              <i className="bi bi-eye me-1"></i>
                              Detail
                            </Link>
                            {cycle.location_url && (
                              <a
                                href={cycle.location_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-success"
                              >
                                <i className="bi bi-geo-alt"></i>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link to={`/petani/${user.id}`} className="btn btn-outline-success btn-lg me-3">
            <i className="bi bi-arrow-left me-2"></i>
            Kembali ke Profil Petani
          </Link>
          <Link to="/petani" className="btn btn-secondary btn-lg">
            <i className="bi bi-list me-2"></i>
            Daftar Semua Petani
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && mainImage && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setImageModalOpen(false)}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setImageModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={`http://localhost:3001/${mainImage}`}
                  alt="Preview Lahan"
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