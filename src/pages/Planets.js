import React from 'react';
import Filter from '../components/Filter';
import Search from '../components/Search';
import Table from '../components/Table';

function Planets() {
  return (
    <div>
      <Search />
      <Filter />
      <Table />
    </div>
  );
}

export default Planets;
