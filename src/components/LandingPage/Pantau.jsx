import React from 'react';
import sayurmayur from '../../assets/sayurmayur.jpg';

export default function Pantau() {
  return (
<section
  className="text-white d-flex align-items-center"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${sayurmayur})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    width: '100%',
  }}
>

      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-3 covered-by-your-grace-regular" style={{ fontSize: '3rem' }}>
          Pantau Tanaman Anda
        </h1>
        <p className="lead">
Optimalkan perawatan tanaman dengan data akurat dan analisis mendalam dari sistem kami.        </p>
      </div>
    </section>
  );
}
