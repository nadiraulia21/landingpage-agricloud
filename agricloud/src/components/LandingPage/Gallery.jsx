import React from 'react';
import img1 from '../../assets/gallery1.png';
import img2 from '../../assets/gallery2.png';
import img3 from '../../assets/gallery3.png';
import img4 from '../../assets/gallery4.png';
import img5 from '../../assets/gallery5.png';
import img6 from '../../assets/gallery6.png';

const galleryItems = [
  { img: img1, title: 'KEBUN JAGUNG' },
  { img: img2, title: 'KEBUN GANDUM' },
  { img: img3, title: 'KEBUN STRAWBERRY' },
  { img: img4, title: 'KEBUN ANGGUR' },
  { img: img5, title: 'KEBUN SELADA' },
  { img: img6, title: 'KEBUN SAWI' },
];

export default function Gallery() {
  return (
    <section className="py-5">
      <style>{`
        .gallery-card {
          aspect-ratio: 3/4;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 16px;
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
          display: flex;
          align-items: end;
          padding: 1rem;
          transition: background 0.3s ease;
        }

        .gallery-title {
          color: white;
          font-weight: bold;
          text-align: left;
          width: 100%;
          transition: color 0.3s ease;
          padding: 0.5rem;
        }

        .gallery-card:hover .gallery-overlay {
          background: rgba(0, 0, 0, 0.6);
        }

        .gallery-card:hover .gallery-title {
          color: white;
        }
      `}</style>

      <div className="container">
        <div className="row g-4">
          {galleryItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="gallery-card">
                <img src={item.img} alt={item.title} />
                <div className="gallery-overlay">
                  <h4 className="gallery-title">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
