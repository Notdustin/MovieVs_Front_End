import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectBattleCount } from '../../store/battleSlice';
import { movieService } from '../../services/movieService';
import './Sidebar.scss';

const Sidebar = () => {
  const battleCount = useSelector(selectBattleCount);
  const [topMovies, setTopMovies] = useState([]);
  // const topMovies = Array.from({ length: 20 }, (_, i) => `Movie ${i + 1}`);

  const fetchTopTwentyList = useCallback(async () => {
    try {
        const top = await movieService.getTopTwentyList();
        console.log('Top Twenty Movies in Sidebar:', top);
        console.log('battleCount:',battleCount);
        setTopMovies(top);
    } catch (error) {
      console.error('Error fetching Top Twenty List:', error)
    }
  }, [battleCount]);

  useEffect(() => {
    if (battleCount === 0) {
      fetchTopTwentyList();
    }
  }, [battleCount, fetchTopTwentyList]);
  
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <h3>Top 20 Movies</h3>
        <ul className="sidebar__list">
          {topMovies.map((movie, index) => (
            <li key={index} className="sidebar__item">
              <span className="sidebar__number">{index + 1}.</span>
              <span className="sidebar__movie">{movie.movie_title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
