import { useState } from 'react';

function useFilter() {
  const [showPlanets, setShowPlanets] = useState([]);

  const filterPlanetsByNumbers = ({ comparison, column, value }, array) => {
    const filteredPlanets = array.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      } if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setShowPlanets(filteredPlanets);
  };

  return {
    filterPlanetsByNumbers, showPlanets, setShowPlanets,
  };
}

export default useFilter;
