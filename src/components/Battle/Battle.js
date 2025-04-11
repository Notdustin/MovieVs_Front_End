import React, { useState, useEffect } from 'react';
import { movieService } from '../../services/movieService';
import 'animate.css';
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
      <h2 className="animate__animated animate__bounceInUp">Pick A Movie</h2>
      <div className="battle__container">
        <div id="movie_a" className="battle__movie battle__movie-left animate__animated animate__rotateInDownLeft">
          <h3 className="movie__title">{battlePair?.movie_a?.title}</h3>
          <img 
            src={battlePair?.movie_a?.poster_url} 
            alt={battlePair?.movie_a?.title} 
            className="movie__poster"
          />
          <span className="movie__year">{battlePair?.movie_a?.year}</span>
        </div>
        
        <div className="battle__vs">VS</div>
        
        <div id="movie_b" className="battle__movie battle__movie-right animate__animated animate__rotateInUpRight">
          <h3 className="movie__title">{battlePair?.movie_b?.title}</h3>
          <img 
            src={battlePair?.movie_b?.poster_url} 
            alt={battlePair?.movie_b?.title} 
            className="movie__poster"
          />
          <span className="movie__year">{battlePair?.movie_b?.year}</span>
        </div>
      </div>
    </div>
  );
};

export default Battle;
