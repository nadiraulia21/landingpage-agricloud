import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';

export default function DetailSiklus() {
  const { id } = useParams();
  const [cycle, setCycle] = useState(null);
  const [stages, setStages] = useState([]);
  const [field, setField] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverPetani, setHoverPetani] = useState(false);
  const [hoverUser, setHoverUser] = useState(false);
  const [hoverLahan, setHoverLahan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cycleRes, stageRes, fieldRes, warehouseRes, userRes] = await Promise.all([
          axios.get('http://localhost:3001/cycle'),
          axios.get('http://localhost:3001/stages'),
          axios.get('http://localhost:3001/field'),
          axios.get('http://localhost:3001/farmerwarehouse'),
          axios.get('http://localhost:3001/user'),
        ]);

        const selectedCycle = cycleRes.data.find(c => c.id === parseInt(id));
        if (!selectedCycle) {
          setError('Siklus tidak ditemukan');
          return;
        }

        const cycleStages = stageRes.data.filter(s => s.cycleId === selectedCycle.id);
        const cycleField = fieldRes.data.find(f => f.id === selectedCycle.fieldId);
        const cycleWarehouse = cycleField ? warehouseRes.data.find(w => w.id === cycleField.warehouseId) : null;
        const cycleUser = cycleWarehouse ? userRes.data.find(u => u.id === cycleWarehouse.userId) : null;

        setCycle(selectedCycle);
        setStages(cycleStages);
        setField(cycleField);
        setWarehouse(cycleWarehouse);
        setUser(cycleUser);
      } catch (error) {
        console.error('Gagal memuat detail siklus:', error.message);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
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

  const getStageIcon = (stageName) => {
    const lower = stageName.toLowerCase();
    if (lower.includes('perkecambahan') || lower.includes('semai')) return '🌱';
    if (lower.includes('vegetatif') || lower.includes('tumbuh')) return '🌿';
    if (lower.includes('berbunga') || lower.includes('bunga')) return '🌸';
    if (lower.includes('buah') || lower.includes('fruit')) return '🍇';
    if (lower.includes('panen') || lower.includes('harvest')) return '🌾';
    if (lower.includes('pembibitan')) return '🌰';
    return '🌱';
  };

  const getStageColor = (stageId, currentStageId) => {
    if (stageId < currentStageId) {
      return 'bg-success text-white';
    } else if (stageId === currentStageId) {
      return 'bg-primary text-white';
    } else {
      return 'bg-light text-muted';
    }
  };

  const getStageStatus = (stageId, currentStageId) => {
    if (stageId < currentStageId) {
      return { text: 'Selesai', class: 'bg-success' };
    } else if (stageId === currentStageId) {
      return { text: 'Sedang Berlangsung', class: 'bg-primary' };
    } else {
      return { text: 'Belum Dimulai', class: 'bg-secondary' };
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

  const calculateProgress = () => {
    if (!stages.length || !cycle) return 0;
    const completedStages = stages.filter(stage => stage.id < cycle.current_stage_id).length;
    return Math.round((completedStages / stages.length) * 100);
  };

  const calculateDuration = (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return duration;
    } catch {
      return 0;
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
          <span className="text-success fs-5">Memuat detail siklus...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !cycle) {
    return (
      <div style={{ backgroundColor: '#EAF2EA', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">Oops! Terjadi Kesalahan</h4>
            <p>{error || 'Data siklus tidak ditemukan'}</p>
            <Link to="/petani" className="btn btn-outline-danger">
              Kembali ke Daftar Petani
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentStage = stages.find(s => s.id === cycle.current_stage_id);
  const progress = calculateProgress();

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
          <div className="d-flex justify-content-center align-items-center mb-3">
            <span style={{ fontSize: '3rem' }} className="me-3">
              {getCropIcon(cycle.name)}
            </span>
            <h1 className="display-4 mb-0 fw-bold">{cycle.name}</h1>
          </div>
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
            {user && (
              <>
                <span className="mx-2">/</span>
                <Link
                  to={`/petani/${user.id}`}
                  style={{
                    textDecoration: 'none',
                    color: hoverUser ? '#ccc' : 'white',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={() => setHoverUser(true)}
                  onMouseLeave={() => setHoverUser(false)}
                >
                  {user.name}
                </Link>
              </>
            )}
            {warehouse && (
              <>
                <span className="mx-2">/</span>
                <Link
                  to={`/lahan/${warehouse.id}`}
                  style={{
                    textDecoration: 'none',
                    color: hoverLahan ? '#ccc' : 'white',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={() => setHoverLahan(true)}
                  onMouseLeave={() => setHoverLahan(false)}
                >
                  {warehouse.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span>{cycle.name}</span>
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Header Card */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-4">
                      <div className="me-4">
                        <span style={{ fontSize: '4rem' }}>
                          {getCropIcon(cycle.name)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-success fw-bold mb-2">
                          <i className="bi bi-arrow-repeat me-2"></i>
                          {cycle.name}
                        </h2>
                        {cycle.description && (
                          <p className="text-muted fs-5 mb-0">{cycle.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="row g-3">
                      {field && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center text-muted">
                            <i className="bi bi-grid-3x3-gap me-2 text-success"></i>
                            <div>
                              <small className="d-block text-muted">Lahan</small>
                              <span className="fw-bold text-dark">{field.name}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {warehouse && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center text-muted">
                            <i className="bi bi-house-door me-2 text-success"></i>
                            <div>
                              <small className="d-block text-muted">Warehouse</small>
                              <Link 
                                to={`/lahan/${warehouse.id}`} 
                                className="fw-bold text-success text-decoration-none"
                              >
                                {warehouse.name} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {user && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center text-muted">
                            <i className="bi bi-person-circle me-2 text-success"></i>
                            <div>
                              <small className="d-block text-muted">Dikelola oleh</small>
                              <Link 
                                to={`/petani/${user.id}`} 
                                className="fw-bold text-success text-decoration-none"
                              >
                                {user.name} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-md-6">
                        <div className="d-flex align-items-center text-muted">
                          <i className="bi bi-calendar-plus me-2 text-success"></i>
                          <div>
                            <small className="d-block text-muted">Dibuat</small>
                            <span className="fw-bold text-dark">{formatDateTime(cycle.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 text-end">
<div style={{
  background: 'linear-gradient(to right, #374151, #1f2937)',
  color: 'white',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid #4b5563'
}}>
  <div style={{ textAlign: 'center' }}>
    <div style={{ 
      fontSize: '14px', 
      fontWeight: '500', 
      marginBottom: '4px', 
      color: '#d1d5db' 
    }}>
      ID Siklus
    </div>
    <div style={{ 
      fontSize: '24px', 
      fontWeight: 'bold', 
      color: 'white', 
      marginBottom: '16px' 
    }}>
      #{cycle.id}
    </div>
    
    <div style={{ marginTop: '16px' }}>
      <div style={{ 
        fontSize: '14px', 
        marginBottom: '12px', 
        color: '#d1d5db' 
      }}>
        Progress Keseluruhan
      </div>
      <div style={{
        width: '100%',
        backgroundColor: '#4b5563',
        borderRadius: '9999px',
        overflow: 'hidden',
        height: '8px'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: progress < 30 ? '#ef4444' : progress < 70 ? '#f59e0b' : '#10b981',
          transition: 'all 0.5s ease-in-out',
          borderRadius: '9999px'
        }}>
        </div>
      </div>
      <div style={{ 
        marginTop: '8px', 
        fontSize: '18px', 
        fontWeight: '600', 
        color: 'white' 
      }}>
        {progress}%
      </div>
    </div>
  </div>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mb-5">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-success text-white p-4">
              <h4 className="mb-0 fw-bold">
                <i className="bi bi-bar-chart-steps me-2"></i>
                Timeline Progress Siklus
              </h4>
            </div>
            <div className="card-body p-4">
              {stages.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="bi bi-exclamation-circle display-1"></i>
                  <h5 className="mt-3">Belum ada tahapan yang terdaftar</h5>
                  <p>Siklus ini belum memiliki tahapan pertumbuhan.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {stages.map((stage) => {
                    const status = getStageStatus(stage.id, cycle.current_stage_id);
                    const duration = calculateDuration(stage.start_date, stage.end_date);
                    
                    return (
                      <div key={stage.id} className="col-md-6 col-lg-4">
                        <div className={`card h-100 border-2 ${stage.id === cycle.current_stage_id ? 'border-primary shadow-lg' : 'border-light'}`}>
                          <div className="card-body p-4 text-center">
                            <div className={`rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${getStageColor(stage.id, cycle.current_stage_id)}`} 
                                 style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                              {getStageIcon(stage.name)}
                            </div>
                            
                            <h5 className="fw-bold mb-2">{stage.name}</h5>
                            <p className="text-muted small mb-3">{stage.description}</p>
                            
                            <div className="mb-3">
                              <span className={`badge ${status.class} px-3 py-2`}>
                                {status.text}
                              </span>
                            </div>
                            
                            <div className="row g-2 text-start">
                              <div className="col-12">
                                <small className="text-muted d-block">
                                  <i className="bi bi-calendar-event me-1"></i>
                                  Mulai: {formatDate(stage.start_date)}
                                </small>
                              </div>
                              <div className="col-12">
                                <small className="text-muted d-block">
                                  <i className="bi bi-calendar-check me-1"></i>
                                  Selesai: {formatDate(stage.end_date)}
                                </small>
                              </div>
                              <div className="col-12">
                                <small className="text-muted d-block">
                                  <i className="bi bi-clock me-1"></i>
                                  Durasi: {duration} hari
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-bar-chart-steps text-primary fs-4"></i>
                </div>
                <h6 className="text-muted mb-1">Total Tahapan</h6>
                <h3 className="fw-bold text-primary">{stages.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-play-circle text-success fs-4"></i>
                </div>
                <h6 className="text-muted mb-1">Tahapan Aktif</h6>
                <h6 className="fw-bold text-success">
                  {currentStage ? currentStage.name : 'Tidak ada'}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <div className="bg-warning bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-calendar-range text-warning fs-4"></i>
                </div>
                <h6 className="text-muted mb-1">Estimasi Selesai</h6>
                <h6 className="fw-bold text-warning">
                  {stages.length > 0 ? formatDate(stages[stages.length - 1].end_date) : 'N/A'}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <div className="bg-info bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-speedometer2 text-info fs-4"></i>
                </div>
                <h6 className="text-muted mb-1">Progress</h6>
                <h3 className="fw-bold text-info">{progress}%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Table */}
        {stages.length > 0 && (
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-light p-4">
              <h4 className="mb-0 fw-bold text-success">
                <i className="bi bi-table me-2"></i>
                Detail Tahapan Pertumbuhan
              </h4>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-success">
                  <tr>
                    <th className="border-0 fw-bold">Tahapan</th>
                    <th className="border-0 fw-bold">Deskripsi</th>
                    <th className="border-0 fw-bold">Tanggal Mulai</th>
                    <th className="border-0 fw-bold">Tanggal Selesai</th>
                    <th className="border-0 fw-bold">Durasi</th>
                    <th className="border-0 fw-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((stage) => {
                    const duration = calculateDuration(stage.start_date, stage.end_date);
                    const status = getStageStatus(stage.id, cycle.current_stage_id);
                    
                    return (
                      <tr key={stage.id} className={stage.id === cycle.current_stage_id ? 'table-active' : ''}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <span className="me-3" style={{ fontSize: '1.5rem' }}>
                              {getStageIcon(stage.name)}
                            </span>
                            <div className="fw-bold">{stage.name}</div>
                          </div>
                        </td>
                        <td className="align-middle">{stage.description}</td>
                        <td className="align-middle">{formatDate(stage.start_date)}</td>
                        <td className="align-middle">{formatDate(stage.end_date)}</td>
                        <td className="align-middle">
                          <span className="badge bg-light text-dark">{duration} hari</span>
                        </td>
                        <td className="align-middle">
                          <span className={`badge ${status.class}`}>
                            {status.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="text-center">
          {warehouse && (
            <Link to={`/lahan/${warehouse.id}`} className="btn btn-outline-success btn-lg me-3">
              <i className="bi bi-arrow-left me-2"></i>
              Kembali ke Detail Lahan
            </Link>
          )}
          {user && (
            <Link to={`/petani/${user.id}`} className="btn btn-success btn-lg me-3">
              <i className="bi bi-person-circle me-2"></i>
              Profil Petani
            </Link>
          )}
          <Link to="/petani" className="btn btn-secondary btn-lg">
            <i className="bi bi-list me-2"></i>
            Daftar Semua Petani
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}