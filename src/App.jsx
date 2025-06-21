import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ListPetani from './pages/ListPetani';
import DetailPetani from './pages/DetailPetani';
import DetailLahan from './pages/DetailLahan'; // Pastikan file ini ada
import DetailSiklus from './pages/DetailSiklus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/petani" element={<ListPetani />} />
        <Route path="/petani/:id" element={<DetailPetani />} />
        <Route path="/lahan/:id" element={<DetailLahan />} />
        <Route path="/cycle/:id" element={<DetailSiklus />} /> {/* Ganti dengan komponen yang sesuai */}
        {/* Tambahkan route lain jika perlu */}
      </Routes>
    </Router>
  );
}

export default App;
