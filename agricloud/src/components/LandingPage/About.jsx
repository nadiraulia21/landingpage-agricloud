import React from 'react';
import imgBig from '../../assets/about-big.png';
import imgSmall from '../../assets/about-small.png';
import icon1 from '../../assets/Icon1.svg';
import icon2 from '../../assets/Icon2.png';

export default function About() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* KIRI - Gambar */}
          <div className="col-md-6 position-relative mb-4 mb-md-0">
            <img
              src={imgBig}
              alt="Gambar Besar"
              style={{
                width: '100%',
                borderRadius: '50%',
              }}
            />
            <img
              src={imgSmall}
              alt="Gambar Kecil"
              className="position-absolute"
              style={{
                width: '40%',
                borderRadius: '50%',
                bottom: '-20px',
                left: '-20px',
                border: '4px solid white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          </div>

          {/* KANAN - Konten */}
          <div className="col-md-6 ps-5">
            <h1 className="fw-bold mb-3">AGRICLOUD</h1>
            <h5 className="text-success mb-3">Tumbuh Cerdas, Panen Berkualitas Bersama Kami.</h5>
            <p className="text-muted" style={{lineHeight: '2', textAlign: 'justify'}}>
AgriCloud adalah platform digital terintegrasi yang dirancang khusus untuk membantu petani mengelola pertanian dengan lebih efisien. Pantau lahan, kelola stok, dan rencanakan setiap langkah untuk mencapai hasil panen yang optimal dan berkualitas.            </p>

            {/* Fitur Andalan */}
            <div className="d-flex mb-3">
              <div className="me-4 text-center d-flex align-items-center">
                <img src={icon1} alt="Fitur 1" style={{ width: '50px' }} />
                <p className="mb-0 ms-2"><b>Kelola Lahan & Tanaman</b></p>
              </div>
              <div className="text-center d-flex align-items-center">
                <img src={icon2} alt="Fitur 2" style={{ width: '50px' }} />
                <p className="mb-0 ms-2"><b>Manajemen Stok Terintegrasi</b></p>
              </div>
            </div>

            {/* Checklist */}
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Akses data pertanian Anda kapan saja, di mana saja.
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Solusi terintegrasi untuk semua kebutuhan manajemen pertanian Anda.
              </li>
            </ul>

            <button
              className="btn"
              style={{
                backgroundColor: '#2E7D32',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px 20px',
              }}
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
