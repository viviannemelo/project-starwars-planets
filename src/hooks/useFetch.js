import { useEffect, useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [planetsData, setPlanetsData] = useState([]);

  const getFetch = () => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then(({ results }) => {
        results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanetsData(results);
      })
      .catch((error) => setErrors(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getFetch();
  }, []);

  return {
    isLoading, errors, planetsData,
  };
}

export default useFetch;
