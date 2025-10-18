// Генератор випадкових аватарів

export const generateRandomAvatar = (): string => {
  // Генеруємо випадковий ID від 1 до 70 для pravatar.cc
  const randomId = Math.floor(Math.random() * 70) + 1;
  return `https://i.pravatar.cc/300?img=${randomId}`;
};

export const getAvatarById = (id: number): string => {
  return `https://i.pravatar.cc/300?img=${id}`;
};

