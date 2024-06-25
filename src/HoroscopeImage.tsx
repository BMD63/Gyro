import React from 'react';

interface HoroscopeImageProps {
  imageUrl: string;
  onClose: () => void;
}

const HoroscopeImage: React.FC<HoroscopeImageProps> = ({ imageUrl, onClose }) => {
  return (
    <section>
      <div className="close-button" onClick={onClose}>
        X
      </div>
      <h2>Your Horoscope Image: {imageUrl}</h2>
      <img src={imageUrl} alt="Horoscope" />
    </section>
  );
};

export default HoroscopeImage;
