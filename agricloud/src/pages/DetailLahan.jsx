 
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';
import warehousePlaceholder from '../assets/about-big.png';

export default function DetailLahan() {
  const { id } = useParams();
  const [cycles, setCycles] = useState([]);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State untuk melacak siklus mana yang tabel 'tahapannya' sedang terlihat
  const [visibleCycleId, setVisibleCycleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cycleRes, fieldRes] = await Promise.all([
          // GET api/fields/{id}/active-cycle - returns array of active cycles
          axios.get(`http://127.0.0.1:8000/api/fields/${id}/active-cycle`),
          // GET api/farmer-fields/{fieldId} - returns single field object
          axios.get(`http://127.0.0.1:8000/api/farmer-fields/${id}`)
        ]);

        // Handle active cycles response - it's an array
        setCycles(cycleRes.data.data || []);
        setField(fieldRes.data.data);
      } catch (err) {
        setError('Gagal memuat data lahan.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLocation = (location) => {
    if (!location || !location.latitude || !location.longitude) return '-';
    return `${parseFloat(location.latitude).toFixed(6)}, ${parseFloat(location.longitude).toFixed(6)}`;
  };

  const getStageStatus = (stage, currentStage) => {
    if (!currentStage) return 'pending';
   
    const stageDate = new Date(stage.start_date);
    const currentDate = new Date();
    const isCurrentStage = currentStage.name === stage.name;
   
    if (isCurrentStage) return 'active';
    if (stageDate < currentDate && !isCurrentStage) return 'completed';
    return 'pending';
  };

  // Fungsi untuk mengelola tampilan tabel TAHAPAN per siklus
  const toggleStageTableVisibility = (cycleId) => {
    setVisibleCycleId(prevId => (prevId === cycleId ? null : cycleId));
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Sedang memuat data lahan...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !field) {
    return (
      <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error || 'Data lahan tidak ditemukan'}
            </div>
            <Link to="/petani" className="btn btn-success">
              <i className="bi bi-arrow-left me-2"></i>
              Kembali ke Daftar Petani
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Cari siklus yang statusnya 'active'. Jika tidak ada, ambil siklus pertama (jika ada).
  const activeCycle = cycles.find(cycle => cycle.status === 'active') || cycles[0];
  // Progres yang ditampilkan di header adalah progres dari siklus aktif
  const mainProgress = activeCycle ? activeCycle.progress : 0;

  return (
    <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container">
          <h1 className="display-4 mb-4 mt-5 fw-bold">Detail Lahan: {field.name}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none">Beranda</Link>
              </li>
              <span className="mx-2">/</span>
              <li className="breadcrumb-item">
                <Link to="/petani" className="text-white text-decoration-none">Petani</Link>
              </li>
              <span className="mx-2">/</span>
              <li className="breadcrumb-item">
                <Link to={`/petani/${field.owner.id}`} className="text-white text-decoration-none">
                  {field.owner.name}
                </Link>
              </li>
              <span className="mx-2">/</span>
              <li className="breadcrumb-item active text-white" aria-current="page">
                {field.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="container py-5">
        {/* Header Section with Quick Stats */}
        <div className="row mb-5">
          <div className="col-12">
            <div
              className="card border-0 shadow-lg rounded-4"
              style={{
                background: 'linear-gradient(135deg, #006400 0%, #00b894 100%)',
                color: 'white',
              }}
            >
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-2 text-white">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      {field.name}
                    </h2>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <i className="bi bi-person-fill me-2"></i>
                      Dikelola oleh <strong>{field.owner.name}</strong>
                    </p>
                    {field.description && (
                      <p className="mt-2 mb-0" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        <i className="bi bi-info-circle me-2"></i>
                        {field.description}
                      </p>
                    )}
                  </div>
                  <div className="col-md-4 text-md-end">
                    <div className="d-flex flex-column align-items-md-end">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-rulers me-2 fs-4 text-white"></i>
                        <div>
                          <div className="fs-4 fw-bold text-white">{field.area}</div>
                          <small style={{ color: 'rgba(255,255,255,0.8)' }}>Hektar</small>
                        </div>
                      </div>
                      {activeCycle && ( // Tampilkan hanya jika ada siklus aktif
                        <div className="d-flex align-items-center">
                          <i className="bi bi-speedometer2 me-2 fs-4 text-white"></i>
                          <div>
                            <div className="fs-4 fw-bold text-white">{mainProgress}%</div>
                            <small style={{ color: 'rgba(255,255,255,0.8)' }}>Progres Siklus Aktif</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row mb-5">
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-transparent border-0 pt-4 pb-0">
                <h5 className="fw-bold text-success mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Informasi Lahan
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div>
                      <div className="fw-medium text-dark">Nama Lahan</div>
                      <small className="text-muted">Identitas lahan</small>
                    </div>
                    <span className="fw-bold text-success">{field.name}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div>
                      <div className="fw-medium text-dark">Luas Area</div>
                      <small className="text-muted">Total area lahan</small>
                    </div>
                    <span className="fw-bold">{field.area} ha</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div>
                      <div className="fw-medium text-dark">Pemilik</div>
                      <small className="text-muted">Petani pengelola</small>
                    </div>
                    <Link to={`/petani/${field.owner.id}`} className="fw-bold text-success text-decoration-none">
                      {field.owner.name}
                    </Link>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div>
                      <div className="fw-medium text-dark">Koordinat</div>
                      <small className="text-muted">Lokasi GPS</small>
                    </div>
                    <span className="fw-bold text-muted small">{formatLocation(field.location)}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div>
                      <div className="fw-medium text-dark">Siklus Aktif</div>
                      <small className="text-muted">Jumlah siklus yang berjalan</small>
                    </div>
                    <span className="fw-bold text-success">{cycles.length} Siklus</span>
                  </div>
                  {field.description && (
                    <div className="list-group-item border-0 px-0">
                      <div className="fw-medium text-dark mb-1">Deskripsi</div>
                      <p className="text-muted mb-0 small">{field.description}</p>
                    </div>
                  )}
                </div>
               
                <div className="mt-4 pt-3 border-top">
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Dibuat: {formatDate(field.created_at)}</span>
                    <span>Update: {formatDate(field.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-0">
                <div className="position-relative overflow-hidden rounded-4">
                  <img
                    src={field.thumbnail || warehousePlaceholder}
                    alt={`Foto Lahan ${field.name}`}
                    className="img-fluid w-100"
                    style={{ height: '400px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = warehousePlaceholder;
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3">
                    <h6 className="mb-1">Foto Lahan {field.name}</h6>
                    <small className="opacity-75">
                      <i className="bi bi-camera me-1"></i>
                      Dokumentasi visual lahan pertanian
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cycles Section */}
        {cycles.length > 0 ? (
          <div className="mb-5">
            <h4 className="fw-bold text-success mb-4">
              <i className="bi bi-arrow-repeat me-2"></i>
              Daftar Siklus Tersedia ({cycles.length})
            </h4>
           
            {cycles.map((cycle, cycleIndex) => (
              <div key={cycle.id} className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-success mb-0">
                      <span className="badge bg-success me-2">{cycleIndex + 1}</span>
                      {cycle.name}
                    </h5>
                    <div className="d-flex gap-2">
                      <span className={`badge ${cycle.status === 'active' ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                        <i className={`bi ${cycle.status === 'active' ? 'bi-play-fill' : 'bi-pause-fill'} me-1`}></i>
                        {cycle.status === 'active' ? 'Aktif' : cycle.status}
                      </span>
                      <span className="badge bg-light text-dark px-3 py-2">
                        Progres: {cycle.progress}%
                      </span>
                    </div>
                  </div>
                 
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="list-group list-group-flush">
                        <div className="list-group-item d-flex justify-content-between px-0 border-0">
                          <span className="text-muted">Jenis:</span>
                          <span className="fw-medium">{cycle.jenis || '-'}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between px-0 border-0">
                          <span className="text-muted">Tanggal Mulai:</span>
                          <span className="fw-medium">{formatDate(cycle.start_date)}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between px-0 border-0">
                          <span className="text-muted">Lokasi:</span>
                          <span className="fw-medium">{cycle.location || '-'}</span>
                        </div>
                      </div>
                      {cycle.description && (
                        <div className="mt-3">
                          <h6 className="fw-bold text-dark mb-2">Deskripsi</h6>
                          <p className="text-muted mb-0">{cycle.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong>Progres: {cycle.progress}%</strong>
                          <small className="text-muted">
                            {cycle.progress < 25 ? 'Tahap Awal' :
                             cycle.progress < 50 ? 'Tahap Pertengahan' :
                             cycle.progress < 75 ? 'Tahap Lanjut' : 'Hampir Selesai'}
                          </small>
                        </div>
                        <div className="progress" style={{ height: '12px' }}>
                          <div
                            className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: `${cycle.progress}%` }}
                            aria-valuenow={cycle.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                     
                      {cycle.current_stage && (
                        <div className="border-start border-success border-3 ps-3">
                          <h6 className="text-success mb-2">
                            <i className="bi bi-flag-fill me-1"></i>
                            Tahap Saat Ini
                          </h6>
                          <h6 className="mb-2 fw-bold text-dark">{cycle.current_stage.name}</h6>
                          <p className="text-muted small mb-2">{cycle.current_stage.description}</p>
                          <div className="small">
                            <div className="d-flex justify-content-between mb-1">
                              <span className="text-muted">Mulai:</span>
                              <span className="fw-medium">{formatDateTime(cycle.current_stage.start_date)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Berakhir:</span>
                              <span className="fw-medium">{formatDateTime(cycle.current_stage.end_date)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bagian untuk TAHAPAN SIKLUS yang bisa di-toggle */}
                  {cycle.stages && cycle.stages.length > 0 && (
                    <div className="mt-4 pt-3 border-top">
                      <h6
                        className="fw-bold text-success mb-3"
                        onClick={() => toggleStageTableVisibility(cycle.id)} // Toggle visibilitas tabel
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="bi bi-list-ol me-2"></i>
                        Tahapan Siklus ({cycle.stages.length} Tahap)
                        <i className={`bi bi-chevron-${visibleCycleId === cycle.id ? 'up' : 'down'} ms-2`}></i>
                      </h6>
                      
                      {visibleCycleId === cycle.id && ( // Tampilkan tabel hanya jika ID siklus cocok
                        <>
                          <div className="table-responsive">
                            <table className="table table-hover table-borderless align-middle">
                              <thead>
                                <tr className="border-bottom border-success border-2">
                                  <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    <i className="bi bi-hash me-1"></i>
                                    No
                                  </th>
                                  <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    <i className="bi bi-flag me-1"></i>
                                    Nama Tahap
                                  </th>
                                  <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    <i className="bi bi-file-text me-1"></i>
                                    Deskripsi
                                  </th>
                                  <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    <i className="bi bi-calendar3 me-1"></i>
                                    Tanggal Mulai
                                  </th>
                                  <th className="text-success fw-bold py-3 text-center" style={{ backgroundColor: '#f8f9fa' }}>
                                    <i className="bi bi-activity me-1"></i>
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {cycle.stages.map((stage, index) => {
                                  const stageStatus = getStageStatus(stage, cycle.current_stage);
                                 
                                  return (
                                    <tr
                                      key={stage.id}
                                      className={`${stageStatus === 'active' ? 'table-success' : ''} border-bottom`}
                                      style={{
                                        backgroundColor: stageStatus === 'active' ? '#d1e7dd' : 'transparent',
                                        transition: 'all 0.2s ease'
                                      }}
                                    >
                                      <td className="py-3">
                                        <div className="d-flex align-items-center">
                                          <span className={`badge rounded-pill px-3 py-2 ${
                                            stageStatus === 'active' ? 'bg-success text-white' :
                                            stageStatus === 'completed' ? 'bg-primary text-white' :
                                            'bg-light text-dark border'
                                          }`}>
                                            {index + 1}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-3">
                                        <div className="d-flex align-items-center">
                                          {stageStatus === 'active' && (
                                            <i className="bi bi-play-circle-fill text-success me-2 fs-5"></i>
                                          )}
                                          {stageStatus === 'completed' && (
                                            <i className="bi bi-check-circle-fill text-primary me-2 fs-5"></i>
                                          )}
                                          {stageStatus === 'pending' && (
                                            <i className="bi bi-clock text-muted me-2 fs-5"></i>
                                          )}
                                          <div>
                                            <h6 className={`mb-0 ${stageStatus === 'active' ? 'text-success fw-bold' : 'text-dark'}`}>
                                              {stage.name}
                                            </h6>
                                            {stageStatus === 'active' && (
                                              <small className="text-success fw-medium">
                                                <i className="bi bi-arrow-right me-1"></i>
                                                Sedang Berlangsung
                                              </small>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-3">
                                        <p className="mb-0 text-muted" style={{ maxWidth: '300px' }}>
                                          {stage.description}
                                        </p>
                                      </td>
                                      <td className="py-3">
                                        <div className="d-flex flex-column">
                                          <span className="fw-medium text-dark">
                                            {formatDate(stage.start_date)}
                                          </span>
                                          <small className="text-muted">
                                            {new Date(stage.start_date).toLocaleDateString('id-ID', {
                                              weekday: 'long'
                                            })}
                                          </small>
                                        </div>
                                      </td>
                                      <td className="py-3 text-center">
                                        {stageStatus === 'active' && (
                                          <span className="badge bg-success px-3 py-2 rounded-pill">
                                            <i className="bi bi-play-fill me-1"></i>
                                            Aktif
                                          </span>
                                        )}
                                        {stageStatus === 'completed' && (
                                          <span className="badge bg-primary px-3 py-2 rounded-pill">
                                            <i className="bi bi-check-lg me-1"></i>
                                            Selesai
                                          </span>
                                        )}
                                        {stageStatus === 'pending' && (
                                          <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                                            <i className="bi bi-hourglass-split me-1"></i>
                                            Menunggu
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                         
                          {/* Stage Summary */}
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <div className="card border-0 bg-light">
                                <div className="card-body text-center py-3">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <i className="bi bi-check-circle-fill text-primary fs-4 me-2"></i>
                                    <div>
                                      <h6 className="mb-0 text-primary">
                                        {cycle.stages.filter(stage => getStageStatus(stage, cycle.current_stage) === 'completed').length}
                                      </h6>
                                      <small className="text-muted">Tahap Selesai</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="card border-0 bg-light">
                                <div className="card-body text-center py-3">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <i className="bi bi-play-circle-fill text-success fs-4 me-2"></i>
                                    <div>
                                      <h6 className="mb-0 text-success">
                                        {cycle.stages.filter(stage => getStageStatus(stage, cycle.current_stage) === 'active').length}
                                      </h6>
                                      <small className="text-muted">Tahap Aktif</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="card border-0 bg-light">
                                <div className="card-body text-center py-3">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <i className="bi bi-hourglass-split text-muted fs-4 me-2"></i>
                                    <div>
                                      <h6 className="mb-0 text-muted">
                                        {cycle.stages.filter(stage => getStageStatus(stage, cycle.current_stage) === 'pending').length}
                                      </h6>
                                      <small className="text-muted">Tahap Menunggu</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 mb-5">
            <div className="card-body text-center py-5">
              <div className="text-muted">
                <i className="bi bi-info-circle-fill fs-1 mb-3 opacity-50"></i>
                <h4 className="mb-3">Tidak Ada Siklus Aktif</h4>
                <p className="mb-4">Lahan ini belum memiliki siklus tanam yang aktif saat ini.</p>
                <button className="btn btn-success" disabled>
                  <i className="bi bi-plus-circle me-2"></i>
                  Mulai Siklus Baru
                </button>
                <p className="mt-2 small text-muted">Fitur ini akan segera tersedia</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="text-center">
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/petani" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-2"></i>
              Kembali ke Daftar Petani
            </Link>
            <Link to={`/petani/${field.owner.id}`} className="btn btn-outline-success">
              <i className="bi bi-person me-2"></i>
              Profil Petani
            </Link>
            {/* <button className="btn btn-outline-primary" disabled>
              <i className="bi bi-pencil me-2"></i>
              Edit Lahan
            </button> */}
          </div>
          <p className="mt-2 small text-muted">Beberapa fitur masih dalam pengembangan</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}