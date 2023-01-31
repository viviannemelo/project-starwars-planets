import { useState, useMemo, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const { isLoading, errors, planetsData } = useFetch();
  const { filterPlanetsByNumbers, showPlanets, setShowPlanets } = useFilter();

  const [filterColumn, setFilterColumn] = useState(columnArray);
  const [filtersUsed, setFiltersUsed] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  const removeFilterColumn = (column, updatedFiltersUsed) => {
    setFilterColumn([...filterColumn, column]);
    setFiltersUsed(updatedFiltersUsed);
  };

  const updateFilterColumn = ({ comparison, column, value }) => {
    setFilterColumn(filterColumn.filter((element) => element !== column));
    setFiltersUsed([
      ...filtersUsed,
      {
        column,
        comparison,
        value,
      },
    ]);
  };

  const filterPlanetsByName = () => {
    if (filterByName.length === 0) {
      setShowPlanets(planetsData);
    } else {
      const filteredPlanets = planetsData.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.toLowerCase())));
      setShowPlanets(filteredPlanets);
    }
  };

  const addFilter = (filterInputs) => {
    filterPlanetsByNumbers(filterInputs, showPlanets);
    updateFilterColumn(filterInputs);
  };

  const removeFilter = (column) => {
    setShowPlanets(planetsData);
    const updatedFiltersUsed = filtersUsed.filter((filter) => filter.column !== column);
    removeFilterColumn(column, updatedFiltersUsed);
  };

  useEffect(() => {
    filtersUsed.forEach((filters) => {
      filterPlanetsByNumbers(filters, showPlanets);
    });
  }, [filtersUsed]);
  // Error message: "React Hook useEffect has missing dependencies: 'filterPlanetsByNumbers' and 'showPlanets'. Either include them or remove the dependency array."

  const removeAllFilters = () => {
    setShowPlanets(planetsData);
    setFilterColumn(columnArray);
    setFiltersUsed([]);
  };

  const sortArrayDescendente = ({ column }) => {
    const arraySortedDesc = planetsData.sort((a, b) => {
      if (!Number.isNaN(+(a[column])) && !Number.isNaN(+(b[column]))) {
        return +(b[column]) - +(a[column]);
      } if (Number.isNaN(+(a[column])) && Number.isNaN(+(b[column]))) {
        return 0;
      } if (Number.isNaN(+(a[column]))) {
        return 1;
      }
      const menosUm = -1;
      return (menosUm);
    });
    setShowPlanets([...arraySortedDesc]);
  };

  const sortArrayAscendente = ({ column }) => {
    const arraySortedAsc = planetsData.sort((a, b) => {
      if (!Number.isNaN(+(a[column])) && !Number.isNaN(+(b[column]))) {
        return +(a[column]) - +(b[column]);
      } if (Number.isNaN(+(a[column])) && Number.isNaN(+(b[column]))) {
        return 0;
      } if (Number.isNaN(+(a[column]))) {
        return 1;
      }
      const menosUm = -1;
      return (menosUm);
    });
    setShowPlanets([...arraySortedAsc]);
  };

  const handleSort = (order) => {
    if (order.sort === 'ASC') {
      sortArrayAscendente(order);
    } else {
      sortArrayDescendente(order);
    }
  };

  useEffect(() => {
    filterPlanetsByName();
  }, [filterByName, planetsData]);

  const values = useMemo(() => ({
    isLoading,
    errors,
    showPlanets,
    setFilterByName,
    filterByName,
    addFilter,
    filterColumn,
    filtersUsed,
    removeFilter,
    removeAllFilters,
    columnArray,
    handleSort,
  }), [
    isLoading, errors, showPlanets, columnArray,
    filterColumn, filtersUsed, filterByName,
  ]);
  // Error message: "React Hook useMemo has missing dependencies: 'addFilter', 'removeAllFilters', 'removeFilter', and 'handleSort'. Either include them or remove the dependency array."

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
