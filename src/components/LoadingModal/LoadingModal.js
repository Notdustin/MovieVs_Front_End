import React from 'react';
import './LoadingModal.scss';

const LoadingModal = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-modal">
      <div className="loading-modal__spinner"></div>
    </div>
  );
};

export default LoadingModal;
