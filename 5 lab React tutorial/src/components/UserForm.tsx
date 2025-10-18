import { useState, type FormEvent } from 'react';
import type { User } from '../types/User';
import { HobbyInput } from './HobbyInput';
import { generateRandomAvatar } from '../utils/avatarGenerator';
import {
  validateFirstName,
  validateLastName,
  validateAge,
  validatePosition,
  validateHobbies,
  type ValidationErrors
} from '../utils/validation';
import './UserForm.css';

interface UserFormProps {
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const firstNameError = validateFirstName(firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateLastName(lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const ageError = validateAge(age);
    if (ageError) newErrors.age = ageError;

    const positionError = validatePosition(position);
    if (positionError) newErrors.position = positionError;

    const hobbiesError = validateHobbies(hobbies);
    if (hobbiesError) newErrors.hobbies = hobbiesError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Позначаємо всі поля як "торкнуті" для відображення помилок
    setTouched({
      firstName: true,
      lastName: true,
      age: true,
      position: true,
      hobbies: true
    });

    if (!validateForm()) {
      return;
    }

    // Генеруємо фото якщо не вказано
    const finalPhoto = photo.trim() || generateRandomAvatar();

    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      age: parseInt(age, 10),
      position: position.trim(),
      photo: finalPhoto,
      hobbies
    });
  };

  const handleGenerateAvatar = () => {
    setPhoto(generateRandomAvatar());
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-row">
        {/* Ім'я */}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            Ім'я <span className="required">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className={`form-input ${touched.firstName && errors.firstName ? 'error' : ''}`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => handleBlur('firstName')}
            placeholder="Наприклад: Олександр"
            maxLength={50}
          />
          {touched.firstName && errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        {/* Прізвище */}
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Прізвище <span className="required">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className={`form-input ${touched.lastName && errors.lastName ? 'error' : ''}`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => handleBlur('lastName')}
            placeholder="Наприклад: Петренко"
            maxLength={50}
          />
          {touched.lastName && errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        {/* Вік */}
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Вік <span className="required">*</span>
          </label>
          <input
            id="age"
            type="number"
            className={`form-input ${touched.age && errors.age ? 'error' : ''}`}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={() => handleBlur('age')}
            placeholder="18"
            min="1"
            max="120"
          />
          {touched.age && errors.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>

        {/* Стать */}
        <div className="form-group">
          <label className="form-label">
            Стать <span className="required">*</span>
          </label>
          <div className="gender-buttons">
            <button
              type="button"
              className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender('male')}
            >
              👨 Чоловік
            </button>
            <button
              type="button"
              className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender('female')}
            >
              👩 Жінка
            </button>
          </div>
        </div>
      </div>

      {/* Посада */}
      <div className="form-group">
        <label htmlFor="position" className="form-label">
          Посада <span className="required">*</span>
        </label>
        <input
          id="position"
          type="text"
          className={`form-input ${touched.position && errors.position ? 'error' : ''}`}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          onBlur={() => handleBlur('position')}
          placeholder="Наприклад: Frontend Developer"
          maxLength={100}
        />
        {touched.position && errors.position && (
          <span className="error-message">{errors.position}</span>
        )}
      </div>

      {/* Фото */}
      <div className="form-group">
        <label htmlFor="photo" className="form-label">
          URL фото (необов'язково)
        </label>
        <div className="photo-input-wrapper">
          <input
            id="photo"
            type="text"
            className="form-input"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
          <button
            type="button"
            className="generate-avatar-btn"
            onClick={handleGenerateAvatar}
          >
            🎲 Випадкове
          </button>
        </div>
        {photo && (
          <div className="photo-preview">
            <img src={photo} alt="Попередній перегляд" />
          </div>
        )}
      </div>

      {/* Хобі */}
      <HobbyInput
        hobbies={hobbies}
        onChange={setHobbies}
        error={touched.hobbies ? errors.hobbies : undefined}
      />

      {/* Кнопки дій */}
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Скасувати
        </button>
        <button type="submit" className="btn-submit">
          ✓ Додати користувача
        </button>
      </div>
    </form>
  );
}

