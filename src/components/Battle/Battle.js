import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementBattleCount } from '../../store/battleSlice';
import { movieService } from '../../services/movieService';
import confetti from 'canvas-confetti';
import LoadingModal from '../LoadingModal/LoadingModal';
import 'animate.css';
import './Battle.scss';

const Battle = () => {
  const [battlePair, setBattlePair] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [clickedMovie, setClickedMovie] = useState(null); 
  const dispatch = useDispatch();

  const handleMovieClick = async (movieTitle) => {
    if (isLoading || !battlePair) return;
    
    setClickedMovie(movieTitle);
    
    try {
      const winner = movieTitle === battlePair?.movie_a?.title ? battlePair?.movie_a : battlePair?.movie_b;

      console.log("Winner:", winner);
      confetti();

      
      await movieService.submitBattleWinner(
        winner,
        battlePair?.movie_a,
        battlePair?.movie_b
      );
  
      // Fetch new battle pair after submission
      await fetchBattlePair();
    } catch (error) {
      console.error('Error submitting battle winner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const pair = await movieService.getMovieBattlePair();
      console.log("Battle pair in the battle component:", pair);
      setBattlePair(pair);
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBattlePair = async () => {
    setIsLoading(true);
    setClickedMovie(null);
    try {
      const pair = await movieService.getMovieBattlePair();
      console.log("Battle pair in the battle component:", pair);
      setBattlePair(pair);
      dispatch(incrementBattleCount());
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching battle pair:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="battle">
      <LoadingModal isVisible={isLoading} />
      <h2 className="animate__animated animate__bounceInUp">Pick A Movie</h2>
      <div className="battle__container">
        <div 
          key={`movie_a_${animationKey}`}
          id="movie_a" 
          className={`battle__movie battle__movie-left animate__animated ${clickedMovie === battlePair?.movie_a?.title ? 'animate__zoomOut' : 'animate__zoomIn'}`} 
          onClick={() => handleMovieClick(battlePair?.movie_a?.title)}>
            <h3 className="movie__title">{battlePair?.movie_a?.title}</h3>
            <img 
            src={battlePair?.movie_a?.poster_url} 
            alt={battlePair?.movie_a?.title} 
            className="movie__poster"
          />
          <span className="movie__year">{battlePair?.movie_a?.year}</span>
        </div>
        
        <div className="battle__vs">VS</div>
        
        <div 
          key={`movie_b_${animationKey}`}
          id="movie_b" 
          className={`battle__movie battle__movie-right animate__animated ${clickedMovie === battlePair?.movie_b?.title ? 'animate__zoomOut' : 'animate__zoomIn'}`} 
          onClick={() => handleMovieClick(battlePair?.movie_b?.title)}>
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
