/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import backgroundImg from '../assets/breadcrumb.png';
import warehousePlaceholder from '../assets/about-big.png';

export default function DetailLahan() {
  const { id } = useParams(); // ID of the FIELD from the URL
  const [field, setField] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [stages, setStages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fieldRes = await axios.get(`http://127.0.0.1:8000/api/fields/${id}`);
        const fetchedField = fieldRes.data.data;

        const farmerId = fetchedField.user_id;
        if (!farmerId) throw new Error('ID petani tidak ditemukan di data field.');

        const farmerRes = await axios.get(`http://127.0.0.1:8000/api/farmers/${farmerId}`);

        let cycleRes = null;
        try {
          cycleRes = await axios.get(`http://127.0.0.1:8000/api/fields/${id}/active-cycle`);
        } catch (err) {
          cycleRes = null;
        }

        const stagesRes = await axios.get('http://127.0.0.1:8000/api/cycle-stages');

        setField(fetchedField);
        setFarmer(farmerRes.data.data);
        setCycle(cycleRes?.data.data ?? null);
        setStages(stagesRes.data.data);
        setMainImage(fetchedField.image_path ?? null);
      } catch (error) {
        setError('Gagal memuat data lahan.');
        console.error(error);
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

  const getStageName = (id) => {
    const stage = stages.find(s => s.id === id);
    return stage ? stage.name : 'Tidak diketahui';
  };

  if (loading) return <div className="text-center p-5">Memuat data...</div>;
  if (error || !field || !farmer) return <div className="text-center p-5 text-danger">{error || 'Data tidak ditemukan'}</div>;

  return (
    <div style={{ backgroundColor: '#f4f7f4', minHeight: '100vh' }}>
      <Navbar />

      <section className="text-white text-center py-5" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <h1 className="display-5 fw-bold">Detail Lahan: {field.name}</h1>
          <p>
            <Link to="/" className="text-white text-decoration-none">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/petani" className="text-white text-decoration-none">Petani</Link>
            <span className="mx-2">/</span>
            <Link to={`/petani/${farmer.id}`} className="text-white text-decoration-none">{farmer.name}</Link>
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
            <p><strong>Petani:</strong> <Link to={`/petani/${farmer.id}`}>{farmer.name}</Link></p>
          </div>
          <div className="col-md-6">
            {mainImage && (
              <img
                src={`http://127.0.0.1:8000/storage/${mainImage}`}
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
              <p><strong>Tanggal Mulai:</strong> {formatDate(cycle.created_at)}</p>
              <p><strong>Tahap Saat Ini:</strong> {getStageName(cycle.current_stage_id)}</p>
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
