import './BackButton.css';

function BackButton({ onClick }) {
  return (
    <button
      className="back-btn"
      onClick={onClick}
      aria-label="Go back to previous page"
      id="back-button"
    >
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}

export default BackButton;
