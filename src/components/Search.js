import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Search() {
  const { setFilterByName, filterByName } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <div>
      <label htmlFor="search-planets-input">
        <input
          id="search-planets-input"
          type="text"
          value={ filterByName }
          name="filterByName"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default Search;
