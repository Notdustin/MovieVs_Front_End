import React from 'react';
import './Battle.scss';

const Battle = () => {
  return (
    <div className="battle">
      <h2>Pick A Movie</h2>
      <div className="battle__container">
        <div className="battle__movie">
          <div className="movie__placeholder">
            <div className="movie__poster-placeholder">
              <span>Select Movie</span>
            </div>
            <div className="movie__details">
              <div className="movie__info">
                <h3>Title</h3>
                <span className="movie__year">(Year)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="battle__vs">VS</div>
        <div className="battle__movie">
          <div className="movie__placeholder">
            <div className="movie__poster-placeholder">
              <span>Select Movie</span>
            </div>
            <div className="movie__details">
              <div className="movie__info">
                <h3>Title</h3>
                <span className="movie__year">(Year)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
