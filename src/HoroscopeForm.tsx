import React, { useState } from 'react';

interface HoroscopeFormProps {
  onSubmit: (birthdate: string) => void;
  savedBirthdate: string | null;
}

const HoroscopeForm: React.FC<HoroscopeFormProps> = ({ onSubmit, savedBirthdate }) => {
  const [birthdate, setBirthdate] = useState<string>(savedBirthdate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(birthdate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your birthdate:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HoroscopeForm;
