import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/slices/debtsSlice';
import Search from './Search';
import { selectGroupedDebts } from '../store/slices/debtsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const groupedData = useSelector(selectGroupedDebts);
  const [showFilters, setShowFilters] = useState(false);

  const largeDebtClients = groupedData.filter(group => group.totalSumma > 100000).length;
  const allClients = groupedData.length;

  const handleFilter = (filterType) => {
    dispatch(setFilter(filterType));
  };
  
  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <div className='w-full flex justify-between gap-2'>
          <Search />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`text-xs py-1 px-2 rounded-2xl font-semibold border border-gray-200 transition-all duration-300 ${showFilters ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Фильтры
          </button>
          <button 
            onClick={() => handleFilter('all')}
            className='text-xs py-1 px-2 rounded-2xl font-semibold border border-gray-200 bg-blue-500 text-white'
          >
            Все {allClients}
          </button>
        </div>
      </div>

      {/* Расширенные фильтры */}
      {showFilters && (
        <div className='flex gap-2 flex-wrap'>

          <button 
            onClick={() => handleFilter('large')}
            className='text-xs py-1 px-3 rounded-2xl font-semibold bg-red-100 text-red-700 border border-red-200'
          >
            Крупные долги ({largeDebtClients})
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
