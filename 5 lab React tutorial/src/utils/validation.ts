// Функції валідації для форми користувача

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  age?: string;
  position?: string;
  hobbies?: string;
}

export const validateFirstName = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Ім'я є обов'язковим полем";
  }
  if (value.trim().length < 2) {
    return "Ім'я має містити мінімум 2 символи";
  }
  if (value.trim().length > 50) {
    return "Ім'я занадто довге (максимум 50 символів)";
  }
  return undefined;
};

export const validateLastName = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Прізвище є обов'язковим полем";
  }
  if (value.trim().length < 2) {
    return "Прізвище має містити мінімум 2 символи";
  }
  if (value.trim().length > 50) {
    return "Прізвище занадто довге (максимум 50 символів)";
  }
  return undefined;
};

export const validateAge = (value: string | number): string | undefined => {
  const age = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (isNaN(age)) {
    return "Вік має бути числом";
  }
  if (age < 1) {
    return "Вік має бути більше 0";
  }
  if (age > 120) {
    return "Вік має бути менше 120";
  }
  return undefined;
};

export const validatePosition = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Посада є обов'язковим полем";
  }
  if (value.trim().length < 2) {
    return "Посада має містити мінімум 2 символи";
  }
  if (value.trim().length > 100) {
    return "Посада занадто довга (максимум 100 символів)";
  }
  return undefined;
};

export const validateHobbies = (hobbies: string[]): string | undefined => {
  if (hobbies.length === 0) {
    return "Додайте хоча б одне хобі";
  }
  if (hobbies.length > 10) {
    return "Максимум 10 хобі";
  }
  return undefined;
};

export const validateHobby = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Хобі не може бути порожнім";
  }
  if (value.trim().length < 2) {
    return "Хобі має містити мінімум 2 символи";
  }
  if (value.trim().length > 50) {
    return "Хобі занадто довге (максимум 50 символів)";
  }
  return undefined;
};

