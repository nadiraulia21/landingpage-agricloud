import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImg from '../assets/breadcrumb.png';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';

export default function ListPetani() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('http://localhost:3001/user');
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const currentData = filtered.slice(start, start + itemsPerPage);

  const [hover, setHover] = useState(false);

  const formatDateTime = (date) => {
    try {
      return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
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

  if (error) {
    return (
      <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">Oops! Terjadi Kesalahan</h4>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-outline-danger"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
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
          <h1 className="display-4 mb-4 mt-5 fw-bold">Daftar Petani</h1>
          <p style={{ fontSize: '1.1rem' }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: hover ? '#ccc' : 'white',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span>Petani</span>
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h4 className="text-success fw-bold mb-2">
                      <i className="bi bi-people me-2"></i>
                      Petani Terdaftar ({filtered.length})
                    </h4>
                    <p className="text-muted mb-0">
                      Temukan dan jelajahi profil petani yang terdaftar dalam platform kami
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="badge bg-success fs-6 px-3 py-2">
                      <i className="bi bi-check-circle me-2"></i>
                      {data.length} Total Petani
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-center">
                  <div className="position-relative" style={{ maxWidth: '500px', width: '100%' }}>
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-success"></i>
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Cari petani berdasarkan nama..."
                      style={{
                        borderRadius: '30px',
                        border: '2px solid #28a745',
                        height: '48px',
                        fontSize: '1rem'
                      }}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted">
              <i className="bi bi-inbox display-1 d-block mb-3 text-muted"></i>
              <h5>Tidak ada petani ditemukan</h5>
              <p>Coba ubah kata kunci pencarian Anda atau hapus filter yang ada.</p>
            </div>
          </div>
        ) : (
          <>
            {/* User Cards */}
            <div className="row g-4 mb-5">
              {currentData.map((user) => (
                <div key={user.id} className="col-lg-4 col-md-6">
                  <Link
                    to={`/petani/${user.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative">
                      <div className="position-relative">
                        <img
                          src={
                            user.profile_photo_url
                              ? `http://localhost:3001/${user.profile_photo_url}`
                              : "/default-avatar.png"
                          }
                          alt={user.name}
                          className="card-img-top"
                          style={{ 
                            height: '240px', 
                            objectFit: 'cover',
                            transition: 'all 0.3s ease'
                          }}
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                          }}
                        />
                        <div className="position-absolute top-0 end-0 m-3">
                          <div className="badge bg-success rounded-pill px-3 py-2">
                            <i className="bi bi-patch-check me-1"></i>
                            Terverifikasi
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-body p-4">
                        <div className="text-center mb-3">
                          <h5 className="card-title fw-bold text-success mb-2">
                            {user.name}
                          </h5>
                          <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
                            <i className="bi bi-person me-1"></i>
                            {user.role}
                          </div>
                        </div>

                        <div className="small text-muted">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-envelope me-2 text-success"></i>
                            <span className="text-truncate">{user.email}</span>
                          </div>
                          {user.phone_number && (
                            <div className="d-flex align-items-center mb-2">
                              <i className="bi bi-telephone me-2 text-success"></i>
                              <span>{user.phone_number}</span>
                            </div>
                          )}
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-plus me-2 text-success"></i>
                            <span>Bergabung: {formatDateTime(user.created_at)}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-top">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <i className="bi bi-eye me-1"></i>
                              Lihat Detail
                            </small>
                            <i className="bi bi-arrow-right text-success"></i>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div 
                        className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          background: 'linear-gradient(45deg, rgba(40, 167, 69, 0.9), rgba(34, 139, 34, 0.9))',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          top: 0,
                          left: 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0';
                        }}
                      >
                        <div className="text-white text-center">
                          <i className="bi bi-eye display-4 mb-2"></i>
                          <h5>Lihat Detail Petani</h5>
                          <p className="mb-0">Klik untuk melihat profil lengkap</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="row">
                <div className="col-12">
                  <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted">
                          Menampilkan {start + 1}-{Math.min(start + itemsPerPage, filtered.length)} dari {filtered.length} petani
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-success"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                          >
                            <i className="bi bi-chevron-left me-1"></i>
                            Sebelumnya
                          </button>
                          
                          <div className="d-flex align-items-center mx-3">
                            <span className="text-muted">
                              Halaman {page} dari {totalPages}
                            </span>
                          </div>

                          <button
                            className="btn btn-outline-success"
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                          >
                            Selanjutnya
                            <i className="bi bi-chevron-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}