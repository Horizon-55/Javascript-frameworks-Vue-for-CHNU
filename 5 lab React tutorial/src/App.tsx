import { useState } from 'react';
import type { GenderFilter, User } from './types/User';
import { Toolbar } from './components/Toolbar';
import { UserList } from './components/UserList';
import { AddUserButton } from './components/AddUserButton';
import { Modal } from './components/Modal';
import { UserForm } from './components/UserForm';
import { Toast } from './components/Toast';
import { users as initialUsers } from './data/users';
import './App.css';

function App() {
  // Використовуємо useState для зберігання активного фільтра
  const [activeFilter, setActiveFilter] = useState<GenderFilter>('all');
  
  // State для динамічного списку користувачів
  const [users, setUsers] = useState<User[]>(initialUsers);
  
  // State для контролю модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State для показу Toast повідомлення
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Функція додавання нового користувача
  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: Date.now() // Генеруємо унікальний ID на основі timestamp
    };
    
    // Додаємо нового користувача на початок списку
    setUsers(prev => [userWithId, ...prev]);
    
    // Закриваємо модалку
    setIsModalOpen(false);

    // Показуємо повідомлення про успіх
    setToastMessage(`Користувача ${newUser.firstName} ${newUser.lastName} успішно додано! 🎉`);
    setShowToast(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">👥 Додаток Користувачів</h1>
        <p className="app-subtitle">
          Лабораторна робота №5 - React.js + TypeScript
        </p>
      </header>

      <main className="app-main">
        {/* Панель фільтрів */}
        <Toolbar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Список користувачів */}
        <UserList 
          users={users}
          filter={activeFilter}
        />
      </main>

      <footer className="app-footer">
        <p>
          Створено з ❤️ використовуючи React, TypeScript і Composition API
        </p>
      </footer>

      {/* Плаваюча кнопка додавання користувача */}
      <AddUserButton onClick={() => setIsModalOpen(true)} />

      {/* Модальне вікно з формою */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Додати нового користувача"
      >
        <UserForm 
          onSubmit={handleAddUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Toast повідомлення про успішне додавання */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;
