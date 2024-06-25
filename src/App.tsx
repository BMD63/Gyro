import { useState, useEffect } from 'react';
import './App.css';
import HoroscopeForm from './HoroscopeForm';
import HoroscopeImage from './HoroscopeImage';

function App() {
  const [horoscopeImageUrl, setHoroscopeImageUrl] = useState<string>('');
  const [isHoroscopeDisplayed, setIsHoroscopeDisplayed] = useState<boolean>(false);
  const [savedBirthdate, setSavedBirthdate] = useState<string | null>(null);
  const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(0);

  useEffect(() => {
    const savedDate = localStorage.getItem('horoscopeApp_birthdate');
    if (savedDate) {
      setSavedBirthdate(savedDate);
    }
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    setCurrentWeekNumber(Math.floor(diff / oneWeek))
  }, []);

  const handleFormSubmit = (birthdate: string) => {
    const horoscopeImage = generateHoroscopeImage(new Date(birthdate));
    setHoroscopeImageUrl(horoscopeImage);
    setIsHoroscopeDisplayed(true);
    localStorage.setItem('horoscopeApp_birthdate', birthdate);
  };

  const handleClose = () => {
    setHoroscopeImageUrl('');
    setIsHoroscopeDisplayed(false);
  };

  const generateHoroscopeImage = (birthDate: Date) => {
    const dateString = birthDate.toISOString().slice(0, 10);
    const hash = hashString(dateString);
    const imageIndex = hash % 50+currentWeekNumber;
    return `images/image_${imageIndex}.jpg`;
  };

  function hashString(str: string): number {
    let hash = 0;
    const prime = 31; // Простое число для уникальности хеша

    for (let i = 0; i < str.length; i++) {
        hash = (hash * prime) + str.charCodeAt(i);
    }

    return hash
}

  return (
    <div className="App">
      <h1>Horoscope App for every week</h1>
      <h2>Week: {currentWeekNumber}</h2>
      {!isHoroscopeDisplayed && (
        <HoroscopeForm onSubmit={handleFormSubmit} savedBirthdate={savedBirthdate} />
      )}
      {isHoroscopeDisplayed && (
        <HoroscopeImage imageUrl={horoscopeImageUrl} onClose={handleClose}/>
      )}
    </div>
  );
}

export default App;


