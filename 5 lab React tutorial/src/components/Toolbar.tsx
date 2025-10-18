import type { GenderFilter } from '../types/User';
import './Toolbar.css';

interface ToolbarProps {
  activeFilter: GenderFilter;
  onFilterChange: (filter: GenderFilter) => void;
}

export function Toolbar({ activeFilter, onFilterChange }: ToolbarProps) {
  return (
    <div className="toolbar">
      <h2 className="toolbar-title">Фільтр користувачів</h2>
      <div className="toolbar-buttons">
        <button
          className={`toolbar-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Всі
        </button>
        <button
          className={`toolbar-btn ${activeFilter === 'male' ? 'active' : ''}`}
          onClick={() => onFilterChange('male')}
        >
          👨 Чоловіки
        </button>
        <button
          className={`toolbar-btn ${activeFilter === 'female' ? 'active' : ''}`}
          onClick={() => onFilterChange('female')}
        >
          👩 Жінки
        </button>
      </div>
    </div>
  );
}

