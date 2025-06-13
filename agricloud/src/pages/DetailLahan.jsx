import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';
import warehousePlaceholder from '../assets/about-big.png';


export default function DetailLahan() {
  const { id } = useParams(); // ID of the warehouse from the URL
  const [warehouse, setWarehouse] = useState(null);
  const [user, setUser] = useState(null); // The owner (farmer) of this warehouse
  const [fields, setFields] = useState([]); // Fields associated with this warehouse
  const [cycles, setCycles] = useState([]); // Cycles associated with these fields
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

        // Fetch all necessary data concurrently from your local API endpoints
        const [whRes, userRes, fieldRes, cycleRes, stagesRes] = await Promise.all([
          axios.get('http://localhost:3001/farmerwarehouse'),
          axios.get('http://localhost:3001/user'),
          axios.get(`http://localhost:3001/field`),
          axios.get(`http://localhost:3001/cycle`),
          axios.get(`http://localhost:3001/stages`) // Added stages data fetch
        ]);

        // 1. Find the specific warehouse based on the URL ID
        const selectedWarehouse = whRes.data.find(w => Number(w.id) === Number(id));

        if (!selectedWarehouse) {
          setError('Lahan tidak ditemukan: ID Lahan tidak valid atau tidak ada di database.');
          return; // Stop execution if warehouse is not found
        }

        // 2. Find the owner (user) of this specific warehouse
        const owner = userRes.data.find(u => Number(u.id) === Number(selectedWarehouse.userId));
        if (!owner) {
          setError('Data Petani tidak ditemukan: Petani pemilik lahan ini tidak ada di database.');
          return; // Stop execution if owner is not found
        }

        // 3. Filter fields that belong to the selected warehouse
        const relatedFields = fieldRes.data.filter(f => Number(f.warehouseId) === Number(selectedWarehouse.id));

        // 4. Create a map for quick lookup of field names by their ID
        const fieldNameMap = new Map(relatedFields.map(field => [Number(field.id), field.name]));

        // 5. Filter cycles that belong to the fields of the selected warehouse
        //    and enrich each cycle with its corresponding field's name and current stage info
        const stagesMap = new Map(stagesRes.data.map(stage => [Number(stage.id), stage.name]));

        const relatedCycles = cycleRes.data
          .filter(c => fieldNameMap.has(Number(c.fieldId))) // Only include cycles tied to our related fields
          .map(c => ({
            ...c,
            field_name: fieldNameMap.get(Number(c.fieldId)) || c.field_name || 'Lahan Tidak Diketahui',
            current_stage_name: c.current_stage_id ? stagesMap.get(Number(c.current_stage_id)) : 'Tidak ada Tahap'
          }));

        // Set states with the fetched and processed data
        setWarehouse(selectedWarehouse);
        setUser(owner);
        setFields(relatedFields);
        setCycles(relatedCycles);
        // Set the main image to the first photo available, or null if none
        setMainImage(selectedWarehouse.photos?.[0] ?? null);

      } catch (error) {
        console.error('Gagal memuat detail lahan:', error.message);
        // Provide more specific error messages based on the type of error
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Server responded with a status code outside of 2xx range
            setError(`Gagal memuat data dari server: ${error.response.status} - ${error.response.statusText}.`);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            // Request was made but no response was received
            setError('Tidak ada respons dari server. Pastikan API server berjalan di http://localhost:3001.');
          } else {
            // Something else happened in setting up the request
            setError(`Terjadi kesalahan saat menyiapkan permintaan: ${error.message}.`);
          }
        } else {
          setError(`Gagal memuat data. Silakan coba lagi: ${error.message}.`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run effect if the warehouse ID in the URL changes

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleString('id-ID', {
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

  // Helper function to get crop emoji icon based on name
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
    if (lower.includes('selada')) return '🥬';
    return '🌱'; // Default icon
  };

  // Helper function to determine cycle status badge based on 'created_at' relative to today
  const getStatusBadge = (cycleDate) => {
    const today = new Date();
    const startDate = new Date(cycleDate);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)); // Difference in days

    if (daysDiff < 0) return <span className="badge bg-secondary">Belum Dimulai</span>;
    if (daysDiff < 30) return <span className="badge bg-success">Baru Tanam</span>; // 0-29 days
    if (daysDiff < 60) return <span className="badge bg-warning">Pertumbuhan</span>; // 30-59 days
    if (daysDiff < 90) return <span className="badge bg-info">Mendekati Panen</span>; // 60-89 days
    return <span className="badge bg-primary">Siap Panen</span>; // 90+ days
  };

  // Loading state rendering
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

  // Error or data not found state rendering
  if (error || !warehouse || !user) { // Ensure user data is also available to avoid undefined access
    return (
      <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">Oops! Terjadi Kesalahan</h4>
            <p>{error || 'Data lahan atau petani tidak ditemukan.'}</p>
            <Link to="/petani" className="btn btn-outline-danger">
              <i className="bi bi-arrow-left me-2"></i>
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
            {/* Link to farmer's detail page */}
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
              {user?.name || 'Petani'}
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
                {mainImage ? (
                  <div className="position-relative">
<img
  src={mainImage ? `http://localhost:3001/${mainImage}` : warehousePlaceholder}
  alt="Foto Utama Lahan"
  className="w-100"
  style={{ 
    height: '400px', 
    objectFit: 'cover',
    cursor: 'pointer' // Indicate clickability
  }}
  onClick={() => setImageModalOpen(true)}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = warehousePlaceholder;
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
                ) : (
                    <div className="text-center py-5 bg-light-subtle text-muted">
                        <i className="bi bi-image display-1 mb-3"></i>
                        <h5>Tidak ada foto utama tersedia</h5>
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
                            e.target.style.display = 'none'; // Hide if image fails to load
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
              Daftar Lahan ({fields.length}) {/* Refers to sub-fields within the warehouse */}
            </h4>
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-inbox display-1 d-block mb-3 text-muted"></i>
                <h5>Belum ada sub-lahan yang terdaftar</h5>
                <p>Lahan utama ini belum memiliki sub-lahan terdaftar.</p>
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
                          {getCropIcon(field.name)} {/* Assuming field name implies a crop type */}
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
                      <th className="border-0 fw-bold">Tahap Saat Ini</th>
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
                            {cycle.field_name}
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
                            <span className="badge bg-secondary">
                                {cycle.current_stage_name}
                            </span>
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
                                title="Lihat Lokasi Siklus"
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
          onClick={() => setImageModalOpen(false)} // Close modal when clicking outside content
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setImageModalOpen(false)}
                  aria-label="Close"
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