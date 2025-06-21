import React from 'react';
import './Hero.css'; // Buat CSS jika perlu style custom
import heroImg from '../../assets/foto_hero.png';
import Hiasan from '../../assets/hiasan.png'; // Pastikan path ini benar

export default function Hero() {
  return (
<section
  className="hero-bg d-flex align-items-center"
  style={{
    backgroundImage: `url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  }}
>
  <div className="overlay" ></div>
<div className="container hero-content text-start text-white mx-auto" style={{marginTop: '-30px'}}>
  <h4 className='mb-4'>SELAMAT DATANG DI AGRICLOUD</h4>
  <h1
    className="covered-by-your-grace-regular"
    style={{ fontSize: '8rem', lineHeight: '1.2' }}
  >
    PETANI CERDAS & <br />PANEN BERKUALITAS
  </h1>
  <p style={{ fontSize: '1.5rem', lineHeight: '2' }}>
    Pemberdayaan petani melalui solusi digital terintegrasi. Kelola pertanian Anda dengan lebih
    cerdas, pantau setiap langkah, dan raih hasil panen yang optimal dan berkualitas.
  </p>
  <div className='mt-3'>
    <button className="btn" style={{backgroundColor:'#2E7D32',color:'#fff'}}>Labih lanjut</button>
    <img src={Hiasan} alt="" className='ms-3'/>
  </div>
</div>

</section>

  );
}
