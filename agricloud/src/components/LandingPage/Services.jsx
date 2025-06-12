import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import fitur1 from '../../assets/fitur1.png';
import fitur2 from '../../assets/fitur2.png';
import fitur3 from '../../assets/fitur3.png';

export default function Services() {
  return (
    <section style={{marginTop: '-80px'}}>
      <div className="container">

        <div className="row">
          <div className="col-md-4 mb-4">
            <div
            className="card shadow text-center p-4"
            style={{
                background: 'linear-gradient(to bottom, #EAF2EA, #5B975B)',
                borderRadius: '30px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
            >
            <div className="card-body">
                <h5 className="card-title mt-2 covered-by-your-grace-regular pb-2" style={{color: '#2E7D32', fontSize: '2rem'}}>
                LAHAN
                </h5>
                <h5 className="card-text pb-2" style={{color:'#2E7D32'}}>Pantau Dan Kelola Lahan</h5>
                <img
                src={fitur1}
                className="card-img-top mx-auto"
                alt="Monitoring Tanaman"
                style={{
                height: 'auto',
                width: '30%',
                objectFit: 'contain', // agar gambar full dan tidak terpotong
                }}
            />
            </div>
            </div>  
          </div>

          <div className="col-md-4 mb-4">
            <div
            className="card shadow text-center p-4"
            style={{
                background: 'linear-gradient(to bottom, #EAF2EA, #5B975B)',
                borderRadius: '30px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
            >
            <div className="card-body">
                <h5 className="card-title mt-2 covered-by-your-grace-regular pb-2" style={{color: '#2E7D32', fontSize: '2rem'}}>
                 TANAMAN
                </h5>
                <h5 className="card-text pb-2" style={{color:'#2E7D32'}}>Kelola Tanaman</h5>
                <img
                src={fitur2}
                className="card-img-top mx-auto"
                alt="Monitoring Tanaman"
                style={{
                height: 'auto',
                width: '30%',
                objectFit: 'contain', // agar gambar full dan tidak terpotong
                }}
            />
            </div>
            </div>  
          </div>

          <div className="col-md-4 mb-4">
            <div
            className="card shadow text-center p-4"
            style={{
                background: 'linear-gradient(to bottom, #EAF2EA, #5B975B)',
                borderRadius: '30px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
            >
            <div className="card-body">
                <h5 className="card-title mt-2 covered-by-your-grace-regular pb-2" style={{color: '#2E7D32', fontSize: '2rem'}}>
                GUDANG
                </h5>
                <h5 className="card-text pb-2" style={{color:'#2E7D32'}}>Manajemen Stok Pertanian</h5>
                <img
                src={fitur3}
                className="card-img-top mx-auto"
                alt="Monitoring Tanaman"
                style={{
                height: 'auto',
                width: '30%',
                objectFit: 'contain', // agar gambar full dan tidak terpotong
                }}
            />
            </div>
            </div>  
          </div>
        </div>
      </div>
    </section>
  );
}
