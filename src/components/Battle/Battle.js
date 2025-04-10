import React, { useState, useEffect } from 'react';
import { movieService } from '../../services/movieService';
import './Battle.scss';

const Battle = () => {
  const [battlePair, setBattlePair] = useState(null);

  useEffect(() => {
    const fetchBattlePair = async () => {
      const pair = await movieService.getMovieBattlePair();
      console.log("Battle pair in the battle component:", pair);
      setBattlePair(pair);
    };

    fetchBattlePair();
  }, []);

  return (
    <div className="battle">
      <h2>Pick A Movie</h2>
      <div className="battle__container">
        <div className="battle__movie animate__animated animate__rotateInDownLeft">
          <div className="movie__placeholder">
            <div className="movie__poster-placeholder">
              <img src={battlePair?.movie_a?.poster_url} alt={battlePair?.movie_a?.title} />
            </div>
            <div className="movie__details">
              <div className="movie__info">
                <h3>{battlePair?.movie_a?.title}</h3>
                <span className="movie__year">{battlePair?.movie_a?.year}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="battle__vs">VS</div>
        <div className="battle__movie">
          <div className="movie__placeholder">
            <div className="movie__poster-placeholder">
            <img src={battlePair?.movie_b?.poster_url} alt={battlePair?.movie_b?.title} />

            </div>
            <div className="movie__details">
              <div className="movie__info">
                <h3>{battlePair?.movie_b?.title}</h3>
                <span className="movie__year">{battlePair?.movie_b?.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
