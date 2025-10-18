import { useState } from 'react';
import { validateHobby } from '../utils/validation';
import './HobbyInput.css';

interface HobbyInputProps {
  hobbies: string[];
  onChange: (hobbies: string[]) => void;
  error?: string;
}

export function HobbyInput({ hobbies, onChange, error }: HobbyInputProps) {
  const [currentHobby, setCurrentHobby] = useState('');
  const [hobbyError, setHobbyError] = useState<string>();

  const handleAddHobby = () => {
    const validationError = validateHobby(currentHobby);
    
    if (validationError) {
      setHobbyError(validationError);
      return;
    }

    if (hobbies.length >= 10) {
      setHobbyError('Максимум 10 хобі');
      return;
    }

    // Перевіряємо чи вже є таке хобі
    if (hobbies.some(h => h.toLowerCase() === currentHobby.trim().toLowerCase())) {
      setHobbyError('Таке хобі вже додано');
      return;
    }

    onChange([...hobbies, currentHobby.trim()]);
    setCurrentHobby('');
    setHobbyError(undefined);
  };

  const handleRemoveHobby = (index: number) => {
    onChange(hobbies.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHobby();
    }
  };

  return (
    <div className="hobby-input-container">
      <label className="hobby-label">
        Хобі <span className="required">*</span>
        <span className="hobby-count">({hobbies.length}/10)</span>
      </label>

      <div className="hobby-input-wrapper">
        <input
          type="text"
          className={`hobby-input ${hobbyError ? 'error' : ''}`}
          value={currentHobby}
          onChange={(e) => {
            setCurrentHobby(e.target.value);
            setHobbyError(undefined);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Наприклад: Програмування"
          maxLength={50}
        />
        <button
          type="button"
          className="hobby-add-btn"
          onClick={handleAddHobby}
          disabled={!currentHobby.trim() || hobbies.length >= 10}
        >
          + Додати
        </button>
      </div>

      {hobbyError && <span className="error-message">{hobbyError}</span>}
      {error && <span className="error-message">{error}</span>}

      {hobbies.length > 0 && (
        <div className="hobbies-list-container">
          <p className="hobbies-list-title">Додані хобі:</p>
          <ul className="hobbies-tags">
            {hobbies.map((hobby, index) => (
              <li key={index} className="hobby-tag">
                <span>{hobby}</span>
                <button
                  type="button"
                  className="hobby-remove-btn"
                  onClick={() => handleRemoveHobby(index)}
                  aria-label={`Видалити ${hobby}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hobbies.length === 0 && (
        <p className="hobby-hint">
          💡 Додайте хоча б одне хобі (мінімум 1, максимум 10)
        </p>
      )}
    </div>
  );
}

