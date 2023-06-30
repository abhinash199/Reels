import React, { useState, useEffect, useRef } from 'react';
import styles from './BannerCard.module.css';

const BannerCard = ({ banners }) => {

  const [currentCard, setCurrentCard] = useState(0);
  const sliderRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handlePrevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? banners.length - 1 : prevCard - 1));
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === banners.length - 1 ? 0 : prevCard + 1));
  };

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndRef.current = event.touches[0].clientX;
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none';
      const touchDistance = touchEndRef.current - touchStartRef.current;
      const halfwayTranslate = -(currentCard * 100) + touchDistance / 2;
      sliderRef.current.style.transform = `translateX(${halfwayTranslate}%)`;
    }
  };

  const handleTouchEnd = () => {
    const touchDistance = touchEndRef.current - touchStartRef.current;
    if (touchDistance < -50) {
      handleNextCard();
    } else if (touchDistance > 50) {
      handlePrevCard();
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextCard();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentCard]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.3s ease';
      sliderRef.current.style.transform = `translateX(-${currentCard * 100}%)`;
    }
  }, [currentCard]);

  return (
    <div className={styles['banner-card']} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className={styles['banner-slider']} ref={sliderRef}>
      {banners.map((banner: { order: number, value: string, name: string, photo:{ cover: string } }) => (
        <div key={banner.order} className={styles['banner-image']}>
          {banner.value ? (
            <a href={banner.value} target="_blank" rel="noopener noreferrer">
              <img src={banner.photo.cover} alt={banner.name} style={{ borderRadius: '2%' }} />
            </a>
          ) : (
            <img src={banner.photo.cover} alt={banner.name} style={{ borderRadius: '2%' }} />
          )
          }
        </div>
      ))}
      </div>
      <div className={styles['dot-navigation']}>
      {banners.map((_:{}, index: number) => (
          <span
            key={index}
            className={`${styles['dot']} ${index === currentCard ? styles['active'] : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCard;
