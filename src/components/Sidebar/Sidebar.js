import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  const topMovies = Array.from({ length: 20 }, (_, i) => `Movie ${i + 1}`);

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <h3>Top 20 Movies</h3>
        <ul className="sidebar__list">
          {topMovies.map((movie, index) => (
            <li key={index} className="sidebar__item">
              <span className="sidebar__number">{index + 1}.</span>
              <span className="sidebar__movie">{movie}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
