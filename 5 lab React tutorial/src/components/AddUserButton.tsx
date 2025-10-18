import './AddUserButton.css';

interface AddUserButtonProps {
  onClick: () => void;
}

export function AddUserButton({ onClick }: AddUserButtonProps) {
  return (
    <button
      className="add-user-fab"
      onClick={onClick}
      aria-label="Додати користувача"
      title="Додати користувача"
    >
      <span className="fab-icon">+</span>
      <span className="fab-text">Додати користувача</span>
    </button>
  );
}

