// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Layout/Navbar';
// import Footer from '../components/Layout/Footer';
// import backgroundImg from '../assets/breadcrumb.png';

// export default function DetailSiklus() {
//   const { id } = useParams();
//   const [cycle, setCycle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCycleData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get(`http://127.0.0.1:8000/api/cycles/${id}`);
//         setCycle(response.data.data);
//       } catch (err) {
//         setError('Gagal memuat data siklus tanam.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCycleData();
//     }
//   }, [id]);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '-';
//     return new Date(dateStr).toLocaleDateString('id-ID', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return '-';
//     return new Date(dateStr).toLocaleDateString('id-ID', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStageIcon = (stageName, index) => {
//     const name = stageName?.toLowerCase() || '';
//     if (name.includes('kecambah') || name.includes('semai') || index === 0) {
//       return 'bi-droplet-fill';
//     } else if (name.includes('vegetatif') || name.includes('tumbuh') || index === 1) {
//       return 'bi-tree-fill';
//     } else if (name.includes('berbunga') || name.includes('flower') || index === 2) {
//       return 'bi-sun-fill';
//     } else if (name.includes('buah') || name.includes('fruit') || index === 3) {
//       return 'bi-apple';
//     } else if (name.includes('panen') || name.includes('harvest') || index === 4) {
//       return 'bi-check-circle-fill';
//     } else {
//       return 'bi-circle-fill';
//     }
//   };

//   const getCurrentStageIndex = () => {
//     if (!cycle?.current_stage?.name || !cycle?.stages) return -1;
//     return cycle.stages.findIndex(stage => stage.name === cycle.current_stage.name);
//   };

//   const getStageStatus = (index) => {
//     const currentIndex = getCurrentStageIndex();
//     if (index < currentIndex) return 'completed';
//     if (index === currentIndex) return 'current';
//     return 'pending';
//   };

//   const getStageColor = (status) => {
//     switch (status) {
//       case 'completed':
//         return 'text-success';
//       case 'current':
//         return 'text-primary';
//       default:
//         return 'text-muted';
//     }
//   };

//   const getStageBackground = (status) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-success bg-opacity-10 border-success';
//       case 'current':
//         return 'bg-primary bg-opacity-10 border-primary';
//       default:
//         return 'bg-light border-light';
//     }
//   };

//   const calculateDaysBetween = (startDate, endDate) => {
//     if (!startDate || !endDate) return 0;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end - start);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const calculateTotalDuration = () => {
//     if (!cycle?.stages || cycle.stages.length === 0) return 0;
//     const firstStage = cycle.stages[0];
//     const lastStage = cycle.stages[cycle.stages.length - 1];
    
//     // Estimasi end_date untuk stage terakhir (misal 5 hari dari start_date)
//     const lastEndDate = new Date(lastStage.start_date);
//     lastEndDate.setDate(lastEndDate.getDate() + 5);
    
//     return calculateDaysBetween(firstStage.start_date, lastEndDate.toISOString());
//   };

//   if (loading) {
//     return (
//       <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
//         <Navbar />
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
//           <div className="text-center">
//             <div className="spinner-border text-success mb-3" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="text-muted">Sedang memuat data siklus tanam...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !cycle) {
//     return (
//       <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
//         <Navbar />
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
//           <div className="text-center">
//             <i className="bi bi-exclamation-triangle-fill text-danger mb-3" style={{ fontSize: '3rem' }}></i>
//             <h4 className="text-danger mb-3">Terjadi Kesalahan</h4>
//             <p className="text-muted mb-4">{error || 'Data siklus tanam tidak ditemukan'}</p>
//             <Link to="/petani" className="btn btn-success">
//               <i className="bi bi-arrow-left me-2"></i>
//               Kembali ke Daftar Petani
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const currentStageIndex = getCurrentStageIndex();
//   const totalDuration = calculateTotalDuration();

//   return (
//     <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
//       <Navbar />

//       {/* Breadcrumb Section */}
//       <section 
//         className="text-white text-center py-5" 
//         style={{ 
//           backgroundImage: `url(${backgroundImg})`, 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center' 
//         }}
//       >
//         <div className="container">
//           <h1 className="display-4 mb-4 mt-5 fw-bold">Detail Siklus Tanam</h1>
//           <p>
//             <Link to="/" className="text-white text-decoration-none">Beranda</Link>
//             <span className="mx-2">/</span>
//             <Link to="/petani" className="text-white text-decoration-none">Petani</Link>
//             <span className="mx-2">/</span>
//             <span>Detail Siklus</span>
//           </p>
//         </div>
//       </section>

//       <div className="container py-5">
//         {/* Header Card */}
//         <div className="row mb-5">
//           <div className="col-12">
//             <div 
//               className="card border-0 shadow-lg rounded-4"
//               style={{
//                 background: 'linear-gradient(135deg, #2E8B57 0%, #20B2AA 100%)',
//                 color: 'white',
//               }}
//             >
//               <div className="card-body p-4">
//                 <div className="row align-items-center">
//                   <div className="col-md-8">
//                     <div className="d-flex align-items-center mb-3">
//                       <i className="bi bi-arrow-repeat fs-2 me-3"></i>
//                       <div>
//                         <h2 className="fw-bold mb-1">{cycle.name}</h2>
//                         <p className="mb-0 opacity-75">ID Siklus: #{cycle.id}</p>
//                       </div>
//                     </div>
//                     {cycle.description && (
//                       <p className="mb-2 opacity-90">{cycle.description}</p>
//                     )}
//                     <div className="row">
//                       <div className="col-sm-6">
//                         <p className="mb-1">
//                           <i className="bi bi-calendar3 me-2"></i>
//                           <strong>Mulai:</strong> {formatDate(cycle.start_date)}
//                         </p>
//                         {cycle.location && (
//                           <p className="mb-1">
//                             <i className="bi bi-geo-alt me-2"></i>
//                             <strong>Lokasi:</strong> {cycle.location}
//                           </p>
//                         )}
//                       </div>
//                       <div className="col-sm-6">
//                         {cycle.jenis && (
//                           <p className="mb-1">
//                             <i className="bi bi-tag me-2"></i>
//                             <strong>Jenis:</strong> {cycle.jenis}
//                           </p>
//                         )}
//                         <p className="mb-1">
//                           <i className="bi bi-clock me-2"></i>
//                           <strong>Dibuat:</strong> {formatDate(cycle.created_at)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4 text-md-end">
//                     <div className="d-flex flex-column align-items-md-end">
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-speedometer2 me-2 fs-1"></i>
//                         <div>
//                           <div className="fs-1 fw-bold">{cycle.progress}%</div>
//                           <small className="opacity-75">Progress</small>
//                         </div>
//                       </div>
//                       <span className={`badge px-3 py-2 fs-6 ${
//                         cycle.status === 'active' ? 'bg-success' : 
//                         cycle.status === 'completed' ? 'bg-primary' : 'bg-secondary'
//                       }`}>
//                         <i className="bi bi-circle-fill me-2"></i>
//                         {cycle.status === 'active' ? 'Aktif' : 
//                          cycle.status === 'completed' ? 'Selesai' : cycle.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Progress Timeline */}
//         {cycle.stages && cycle.stages.length > 0 && (
//           <div className="card border-0 shadow-sm rounded-4 mb-5">
//             <div className="card-body p-4">
//               <h5 className="fw-bold text-success mb-4">
//                 <i className="bi bi-diagram-3 me-2"></i>
//                 Timeline Siklus Tanam
//               </h5>
              
//               {/* Progress Bar */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="text-muted">Progress Keseluruhan</span>
//                   <span className="fw-bold text-success">{cycle.progress}%</span>
//                 </div>
//                 <div className="progress" style={{ height: '12px' }}>
//                   <div 
//                     className="progress-bar bg-gradient" 
//                     style={{ 
//                       width: `${cycle.progress}%`,
//                       background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)'
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Stage Timeline */}
//               <div className="timeline-container">
//                 <div className="row">
//                   {cycle.stages.map((stage, index) => {
//                     const status = getStageStatus(index);
//                     const isLast = index === cycle.stages.length - 1;
                    
//                     return (
//                       <div key={stage.id} className="col-md-6 col-lg-4 mb-4">
//                         <div className={`card h-100 border-2 ${getStageBackground(status)}`}>
//                           <div className="card-body p-3">
//                             <div className="d-flex align-items-start mb-3">
//                               <div className={`rounded-circle p-2 me-3 ${
//                                 status === 'completed' ? 'bg-success' :
//                                 status === 'current' ? 'bg-primary' : 'bg-secondary'
//                               }`}>
//                                 <i className={`${getStageIcon(stage.name, index)} text-white`}></i>
//                               </div>
//                               <div className="flex-grow-1">
//                                 <div className="d-flex justify-content-between align-items-start">
//                                   <h6 className={`fw-bold mb-1 ${getStageColor(status)}`}>
//                                     {stage.name}
//                                   </h6>
//                                   <span className={`badge px-2 py-1 ${
//                                     status === 'completed' ? 'bg-success' :
//                                     status === 'current' ? 'bg-primary' : 'bg-secondary'
//                                   }`}>
//                                     {index + 1}
//                                   </span>
//                                 </div>
//                                 <p className="text-muted small mb-2" style={{ fontSize: '0.85rem' }}>
//                                   {stage.description}
//                                 </p>
//                                 <div className="text-muted small">
//                                   <i className="bi bi-calendar3 me-1"></i>
//                                   {formatDate(stage.start_date)}
//                                 </div>
//                                 {status === 'current' && (
//                                   <div className="mt-2">
//                                     <span className="badge bg-primary bg-opacity-20 text-primary">
//                                       <i className="bi bi-play-fill me-1"></i>
//                                       Sedang Berlangsung
//                                     </span>
//                                   </div>
//                                 )}
//                                 {status === 'completed' && (
//                                   <div className="mt-2">
//                                     <span className="badge bg-success bg-opacity-20 text-success">
//                                       <i className="bi bi-check-lg me-1"></i>
//                                       Selesai
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Current Stage Detail */}
//         {cycle.current_stage && (
//           <div className="card border-0 shadow-sm rounded-4 mb-5">
//             <div className="card-body p-4">
//               <h5 className="fw-bold text-success mb-4">
//                 <i className="bi bi-play-circle-fill me-2"></i>
//                 Tahap Saat Ini
//               </h5>
//               <div className="row">
//                 <div className="col-md-8">
//                   <div className="border-start border-success border-4 ps-4">
//                     <h4 className="text-success mb-2">{cycle.current_stage.name}</h4>
//                     <p className="text-muted mb-3">{cycle.current_stage.description}</p>
//                     <div className="row">
//                       <div className="col-sm-6">
//                         <p className="mb-1">
//                           <i className="bi bi-calendar-event me-2 text-success"></i>
//                           <strong>Dimulai:</strong> {formatDate(cycle.current_stage.start_date)}
//                         </p>
//                       </div>
//                       <div className="col-sm-6">
//                         <p className="mb-1">
//                           <i className="bi bi-calendar-check me-2 text-success"></i>
//                           <strong>Target Selesai:</strong> {formatDate(cycle.current_stage.end_date)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <span className="badge bg-success px-3 py-2">
//                         <i className="bi bi-activity me-2"></i>
//                         Tahap Aktif
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="bg-light rounded-3 p-3 text-center">
//                     <i className={`${getStageIcon(cycle.current_stage.name, currentStageIndex)} text-success mb-2`} 
//                        style={{ fontSize: '3rem' }}></i>
//                     <h6 className="text-success">Tahap {currentStageIndex + 1} dari {cycle.stages?.length || 0}</h6>
//                     {cycle.current_stage.end_date && (
//                       <p className="small text-muted mb-0">
//                         Durasi: {calculateDaysBetween(cycle.current_stage.start_date, cycle.current_stage.end_date)} hari
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Statistics Cards */}
//         <div className="row mb-5">
//           <div className="col-md-3 mb-3">
//             <div className="card border-0 shadow-sm rounded-4 h-100">
//               <div className="card-body text-center p-4">
//                 <div className="mb-3">
//                   <i className="bi bi-list-ol text-primary" style={{ fontSize: '2.5rem' }}></i>
//                 </div>
//                 <h3 className="fw-bold text-primary mb-1">{cycle.stages?.length || 0}</h3>
//                 <p className="text-muted mb-0">Total Tahap</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3">
//             <div className="card border-0 shadow-sm rounded-4 h-100">
//               <div className="card-body text-center p-4">
//                 <div className="mb-3">
//                   <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }}></i>
//                 </div>
//                 <h3 className="fw-bold text-success mb-1">{currentStageIndex >= 0 ? currentStageIndex : 0}</h3>
//                 <p className="text-muted mb-0">Tahap Selesai</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3">
//             <div className="card border-0 shadow-sm rounded-4 h-100">
//               <div className="card-body text-center p-4">
//                 <div className="mb-3">
//                   <i className="bi bi-hourglass-split text-warning" style={{ fontSize: '2.5rem' }}></i>
//                 </div>
//                 <h3 className="fw-bold text-warning mb-1">
//                   {cycle.stages ? cycle.stages.length - Math.max(currentStageIndex + 1, 0) : 0}
//                 </h3>
//                 <p className="text-muted mb-0">Tahap Tersisa</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3">
//             <div className="card border-0 shadow-sm rounded-4 h-100">
//               <div className="card-body text-center p-4">
//                 <div className="mb-3">
//                   <i className="bi bi-calendar3 text-info" style={{ fontSize: '2.5rem' }}></i>
//                 </div>
//                 <h3 className="fw-bold text-info mb-1">{totalDuration}</h3>
//                 <p className="text-muted mb-0">Hari Total</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Detailed Stages Table */}
//         {cycle.stages && cycle.stages.length > 0 && (
//           <div className="card border-0 shadow-sm rounded-4 mb-5">
//             <div className="card-header bg-transparent border-0 pt-4 pb-0">
//               <h5 className="fw-bold text-success mb-0">
//                 <i className="bi bi-table me-2"></i>
//                 Detail Tahapan Siklus
//               </h5>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle">
//                   <thead>
//                     <tr className="border-bottom border-success border-2">
//                       <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
//                         <i className="bi bi-hash me-1"></i>
//                         No
//                       </th>
//                       <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
//                         <i className="bi bi-flag me-1"></i>
//                         Nama Tahap
//                       </th>
//                       <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
//                         <i className="bi bi-file-text me-1"></i>
//                         Deskripsi
//                       </th>
//                       <th className="text-success fw-bold py-3" style={{ backgroundColor: '#f8f9fa' }}>
//                         <i className="bi bi-calendar3 me-1"></i>
//                         Tanggal Mulai
//                       </th>
//                       <th className="text-success fw-bold py-3 text-center" style={{ backgroundColor: '#f8f9fa' }}>
//                         <i className="bi bi-activity me-1"></i>
//                         Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cycle.stages.map((stage, index) => {
//                       const status = getStageStatus(index);
                      
//                       return (
//                         <tr 
//                           key={stage.id}
//                           className={`${status === 'current' ? 'table-success' : ''} border-bottom`}
//                           style={{ 
//                             backgroundColor: status === 'current' ? '#d1e7dd' : 'transparent',
//                             transition: 'all 0.2s ease'
//                           }}
//                         >
//                           <td className="py-3">
//                             <span className={`badge rounded-pill px-3 py-2 ${
//                               status === 'current' ? 'bg-success text-white' : 
//                               status === 'completed' ? 'bg-primary text-white' : 
//                               'bg-light text-dark border'
//                             }`}>
//                               {index + 1}
//                             </span>
//                           </td>
//                           <td className="py-3">
//                             <div className="d-flex align-items-center">
//                               <i className={`${getStageIcon(stage.name, index)} me-2 fs-5 ${
//                                 status === 'current' ? 'text-success' :
//                                 status === 'completed' ? 'text-primary' : 'text-muted'
//                               }`}></i>
//                               <div>
//                                 <h6 className={`mb-0 ${
//                                   status === 'current' ? 'text-success fw-bold' : 'text-dark'
//                                 }`}>
//                                   {stage.name}
//                                 </h6>
//                                 {status === 'current' && (
//                                   <small className="text-success fw-medium">
//                                     <i className="bi bi-arrow-right me-1"></i>
//                                     Sedang Berlangsung
//                                   </small>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3">
//                             <p className="mb-0 text-muted" style={{ maxWidth: '300px' }}>
//                               {stage.description}
//                             </p>
//                           </td>
//                           <td className="py-3">
//                             <div className="d-flex flex-column">
//                               <span className="fw-medium text-dark">
//                                 {formatDate(stage.start_date)}
//                               </span>
//                               <small className="text-muted">
//                                 {new Date(stage.start_date).toLocaleDateString('id-ID', { 
//                                   weekday: 'long' 
//                                 })}
//                               </small>
//                             </div>
//                           </td>
//                           <td className="py-3 text-center">
//                             {status === 'current' && (
//                               <span className="badge bg-success px-3 py-2 rounded-pill">
//                                 <i className="bi bi-play-fill me-1"></i>
//                                 Aktif
//                               </span>
//                             )}
//                             {status === 'completed' && (
//                               <span className="badge bg-primary px-3 py-2 rounded-pill">
//                                 <i className="bi bi-check-lg me-1"></i>
//                                 Selesai
//                               </span>
//                             )}
//                             {status === 'pending' && (
//                               <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
//                                 <i className="bi bi-hourglass-split me-1"></i>
//                                 Menunggu
//                               </span>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="text-center">
//           <div className="d-flex gap-3 justify-content-center flex-wrap">
//             <Link to="/petani" className="btn btn-outline-secondary">
//               <i className="bi bi-arrow-left me-2"></i>
//               Kembali ke Daftar Petani
//             </Link>
//             <button className="btn btn-outline-success">
//               <i className="bi bi-pencil me-2"></i>
//               Edit Siklus
//             </button>
//             <button className="btn btn-outline-primary">
//               <i className="bi bi-download me-2"></i>
//               Export Laporan
//             </button>
//             <button className="btn btn-outline-info">
//               <i className="bi bi-graph-up me-2"></i>
//               Lihat Analisis
//             </button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }