import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    addFilter, filterColumn, filtersUsed, removeFilter,
    removeAllFilters, columnArray, handleSort,
  } = useContext(PlanetsContext);
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population', sort: 'ASC',
  });

  const changeFilter = ({ target }) => {
    setFilterInputs({
      ...filterInputs,
      [target.name]: target.value,
    });
  };

  const changeOrder = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    setFilterInputs({
      column: filterColumn[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [filterColumn]);

  const clickAddFilter = () => {
    addFilter(filterInputs);
  };

  const clickRemoveFilter = ({ target: { name: column } }) => {
    removeFilter(column);
    setFilterInputs({
      column: filterColumn[filterColumn.length - 1],
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <div>
      <section>
        <h3>Filtros</h3>
        <label htmlFor="filter-column">
          <select
            data-testid="column-filter"
            id="filter-column"
            onChange={ changeFilter }
            value={ filterInputs.column }
            name="column"
          >
            { filterColumn.length !== 0 && filterColumn.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            )) }
          </select>
        </label>
        <label htmlFor="filter-comparison">
          <select
            data-testid="comparison-filter"
            id="filter-comparison"
            onChange={ changeFilter }
            value={ filterInputs.comparison }
            name="comparison"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="filter-value">
          <input
            id="filter-value"
            type="number"
            value={ filterInputs.value }
            name="value"
            onChange={ changeFilter }
            data-testid="value-filter"
            min={ 0 }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ clickAddFilter }
          disabled={ filterColumn.length === 0 }
        >
          Filter
        </button>
      </section>
      <br />
      <section>
        <label htmlFor="sort-column">
          <select
            data-testid="column-sort"
            id="sort-column"
            onChange={ changeOrder }
            value={ order.column }
            name="column"
          >
            { columnArray.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            )) }
          </select>
        </label>
        <label htmlFor="sort-radios">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="sort-radios"
            onChange={ changeOrder }
            value="ASC"
            name="sort"
          />
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            id="sort-radios"
            onChange={ changeOrder }
            value="DESC"
            name="sort"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSort(order) }
        >
          Ordenar
        </button>
      </section>
      <br />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos os filtros
      </button>
      <ul>
        { filtersUsed.length !== 0
        && filtersUsed.map(({ column, comparison, value }, index) => (
          <li key={ index } data-testid="filter">
            <p>{ `${column} ${comparison} ${value}` }</p>
            <button
              type="button"
              name={ column }
              onClick={ clickRemoveFilter }
              data-testid={ `remove-filter-${column}` }
            >
              Remover filtro
            </button>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default Filter;
