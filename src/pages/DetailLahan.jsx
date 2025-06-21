/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';
import warehousePlaceholder from '../assets/about-big.png';

export default function DetailLahan() {
  const { id } = useParams();
  const [cycle, setCycle] = useState(null);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cycleRes, fieldRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/cycles/active-by-field/${id}`),
          axios.get(`http://127.0.0.1:8000/api/farmer-fields/${id}`)
        ]);

        setCycle(cycleRes.data.data);
        setField(fieldRes.data.data);
      } catch (err) {
        setError('Gagal memuat data lahan.');
        console.error(err);
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

  if (loading) return <div className="text-center p-5">Sedang memuat data...</div>;
  if (error || !cycle || !field) return <div className="text-center p-5 text-danger">{error || 'Data tidak ditemukan'}</div>;

  return (
    <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
      <Navbar />

      <section className="text-white text-center py-5" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <h1 className="display-4 mb-4 mt-5 fw-bold">Detail Lahan: {field.name}</h1>
          <p>
            <Link to="/" className="text-white text-decoration-none">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/petani" className="text-white text-decoration-none">Petani</Link>
            <span className="mx-2">/</span>
            <Link to={`/petani/${field.owner.id}`} className="text-white text-decoration-none">{field.owner.name}</Link>
            <span className="mx-2">/</span>
            {field.name}
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <h4 className="text-success fw-bold mb-3">Informasi Lahan</h4>
            <p><strong>Nama:</strong> {field.name}</p>
            <p><strong>Luas:</strong> {field.area} m²</p>
            <p><strong>Petani:</strong> <Link to={`/petani/${field.owner.id}`}>{field.owner.name}</Link></p>
          </div>
          <div className="col-md-6">
            {field.thumbnail && (
              <img
                src={field.thumbnail}
                alt="Foto Lahan"
                className="img-fluid rounded shadow"
                onError={(e) => { e.target.onerror = null; e.target.src = warehousePlaceholder; }}
              />
            )}
          </div>
        </div>

        {cycle && (
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body">
              <h5 className="fw-bold text-success">Siklus Aktif</h5>
              <p><strong>Nama Siklus:</strong> {cycle.name}</p>
              <p><strong>Tanggal Mulai:</strong> {formatDate(cycle.start_date)}</p>
              <p><strong>Tahap Saat Ini:</strong> {cycle.current_stage_id}</p>
              {cycle.description && (
                <p><strong>Deskripsi:</strong> {cycle.description}</p>
              )}
              <Link to={`/cycle/${cycle.id}`} className="btn btn-outline-success btn-sm">
                Lihat Detail Siklus
              </Link>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link to="/petani" className="btn btn-secondary">
            <i className="bi bi-arrow-left"></i> Kembali ke Daftar Petani
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
