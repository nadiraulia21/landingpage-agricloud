import React from 'react';
import petaniImg from '../../assets/petani1.png';
import tanaman1 from '../../assets/tanaman1.png';
import tanaman2 from '../../assets/tanaman2.png';
import tanaman3 from '../../assets/tanaman3.png';

export default function Petani() {
  return (
    <section className="py-3" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Kolom 1: Gambar Petani */}
          <div className="col-md-3 text-center mb-4 mb-md-0 p-0">
            <img
              src={petaniImg}
              alt="Petani"
              className="img-fluid rounded"
              style={{ maxHeight: '350px', width: '70%', objectFit: 'cover' }}
            />
          </div>

          {/* Kolom 2: Deskripsi + Button */}
          <div className="col-md-6 text-center text-md-start p-0">
            <h1 className="fw-bold mb-3">KENALI PETANI KAMI</h1>
            <p className="mb-4" style={{ lineHeight: '2', textAlign: 'justify' }}>
Bersama para petani terbaik dari berbagai daerah, kami menciptakan sistem monitoring lahan terintegrasi untuk meningkatkan produktivitas dan keberlanjutan pertanian Indonesia.            </p>
            
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                <b>Desain untuk Petani</b>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                <b>Aplikasi mudah digunakan </b>              
                </li>
            </ul>
            
            <button
              className="btn"
              style={{
                backgroundColor: '#2E7D32',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px 25px',
              }}
            >
              Mulai Bertani
            </button>
          </div>

          {/* Kolom 3: List tanaman */}
            <div className='p-5 col-md-3'>
            <div className="pt-1" style={{backgroundColor: '#EAF2EA', borderRadius: '10px', padding: '20px'}}>
            {[ 
              { img: tanaman1, title: 'Palawija' },
              { img: tanaman2, title: 'Holtikultura' },
              { img: tanaman3, title: 'Pangan Pokok' }
            ].map((item, idx) => (
              <div key={idx} className="d-flex align-items-center mb-4 mt-5">
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }}
                />
                <h5 className="mb-0 covered-by-your-grace-regular">{item.title}</h5>
              </div>
            ))}
          </div>
            </div>
        </div>
      </div>
    </section>
  );
}
