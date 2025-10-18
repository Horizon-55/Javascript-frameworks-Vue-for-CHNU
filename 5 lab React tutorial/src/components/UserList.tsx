import { useMemo } from 'react';
import type { User, GenderFilter } from '../types/User';
import { UserCard } from './UserCard';
import './UserList.css';

interface UserListProps {
  users: User[];
  filter: GenderFilter;
}

export function UserList({ users, filter }: UserListProps) {
  // Використовуємо useMemo для оптимізації - фільтрація відбувається тільки при зміні users або filter
  const filteredUsers = useMemo(() => {
    if (filter === 'all') {
      return users;
    }
    return users.filter(user => user.gender === filter);
  }, [users, filter]);

  return (
    <div className="user-list-container">
      <div className="user-count">
        Знайдено користувачів: <strong>{filteredUsers.length}</strong>
      </div>
      
      <div className="user-list">
        {/* Використовуємо map() для рендерингу карток - аналог v-for */}
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Умовний рендеринг: якщо нічого не знайдено */}
      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>😔 Користувачів не знайдено</p>
        </div>
      )}
    </div>
  );
}

