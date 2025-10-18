// TypeScript інтерфейс для користувача
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  position: string;
  photo: string;
  hobbies: string[];
}

// Тип для фільтра
export type GenderFilter = 'all' | 'male' | 'female';

