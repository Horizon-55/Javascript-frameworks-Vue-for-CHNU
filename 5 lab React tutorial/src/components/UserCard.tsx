import type { User } from '../types/User';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

// Функція для визначення кольорової теми картки залежно від віку
function getAgeColorClass(age: number): string {
  if (age < 25) return 'age-young'; // блакитний
  if (age >= 25 && age < 40) return 'age-adult'; // зелений
  if (age >= 40 && age < 60) return 'age-middle'; // помаранчевий
  return 'age-senior'; // фіолетовий
}

export function UserCard({ user }: UserCardProps) {
  const ageColorClass = getAgeColorClass(user.age);
  const genderIcon = user.gender === 'male' ? '👨' : '👩';

  return (
    <div className={`user-card ${ageColorClass}`}>
      <div className="user-card-header">
        <img 
          src={user.photo} 
          alt={`${user.firstName} ${user.lastName}`}
          className="user-photo"
        />
        <div className="user-age-badge">{user.age} років</div>
      </div>
      
      <div className="user-card-body">
        <h3 className="user-name">
          {genderIcon} {user.firstName} {user.lastName}
        </h3>
        
        <p className="user-position">{user.position}</p>
        
        {/* Умовний рендеринг: показуємо тільки якщо є хобі */}
        {user.hobbies.length > 0 && (
          <div className="user-hobbies">
            <h4 className="hobbies-title">Хобі:</h4>
            <ul className="hobbies-list">
              {/* Аналог v-for - використовуємо map() */}
              {user.hobbies.map((hobby, index) => (
                <li key={index} className="hobby-item">
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Умовний рендеринг: показуємо повідомлення для осіб 18+ */}
        {user.age >= 18 && (
          <div className="age-info">
            ✓ Повнолітній
          </div>
        )}
      </div>
    </div>
  );
}

