// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../store/slices/debtsSlice';
// import Search from './Search';
// import { selectGroupedDebts } from '../store/slices/debtsSlice';

// const Filter = () => {
//   const dispatch = useDispatch();
//   const groupedData = useSelector(selectGroupedDebts);
//   const [showFilters, setShowFilters] = useState(false);

//   const largeDebtClients = groupedData.filter(group => group.totalSumma > 100000).length;
//   const allClients = groupedData.length;

//   const handleFilter = (filterType) => {
//     dispatch(setFilter(filterType));
//   };
  
//   return (
//     <div className='space-y-3'>
//       <div className='flex justify-between items-center'>
//         <div className='w-full flex justify-between gap-2'>
//           <Search />
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className={`text-xs py-1 px-2 rounded-2xl font-semibold border border-gray-200 transition-all duration-300 ${showFilters ? 'bg-blue-500 text-white' : 'bg-white'}`}
//           >
//             Фильтры
//           </button>
//           <button 
//             onClick={() => handleFilter('all')}
//             className='text-xs py-1 px-2 rounded-2xl font-semibold border border-gray-200 bg-blue-500 text-white'
//           >
//             Все {allClients}
//           </button>
//         </div>
//       </div>

//       {/* Расширенные фильтры */}
//       {showFilters && (
//         <div className='flex gap-2 flex-wrap'>

//           <button 
//             onClick={() => handleFilter('large')}
//             className='text-xs py-1 px-3 rounded-2xl font-semibold bg-red-100 text-red-700 border border-red-200'
//           >
//             Крупные долги ({largeDebtClients})
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filter;
// components/Filter.jsx
// components/Filter.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/slices/debtsSlice';
import Search from './Search';
import { selectGroupedDebts } from '../store/slices/debtsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const groupedData = useSelector(selectGroupedDebts);
  const { status, lastUpdated } = useSelector(state => state.debts);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = (filterType) => {
    dispatch(setFilter(filterType));
  };

  const handleRefresh = () => {
    dispatch(fetchDebts());
  };

  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xs'>Клиенты</h2>
        <div className='flex items-center gap-2'>
          <Search />
          
          <button 
            onClick={handleRefresh}
            disabled={status === 'loading'}
            className="text-xs py-1 px-2 rounded-2xl font-semibold bg-blue-500 text-white disabled:bg-gray-400"
          >
            {status === 'loading' ? '🔄' : '⟳'}
          </button>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className='text-xs py-1 px-2 rounded-2xl font-semibold bg-white border border-gray-200'
          >
            Фильтры
          </button>
          <button 
            onClick={() => handleFilter('all')}
            className='text-xs py-1 px-2 rounded-2xl font-semibold bg-white border border-gray-200'
          >
            Все ({groupedData.length})
          </button>
        </div>
      </div>

      {showFilters && (
        <div className='flex flex-wrap gap-2'>
          {/* Фильтры по статусу просрочки */}
          <div className="flex flex-wrap gap-1">
            <button 
              onClick={() => handleFilter('overdue_red')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-red-100 text-red-700 border border-red-200'
            >
              🔴 Просрочка 2+ мес
            </button>
            <button 
              onClick={() => handleFilter('overdue_yellow')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200'
            >
              🟡 Просрочка 1 мес
            </button>
            <button 
              onClick={() => handleFilter('overdue_green')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-green-100 text-green-700 border border-green-200'
            >
              🟢 Актуально
            </button>
          </div>
          
          <div className="border-l border-gray-200 pl-2 flex flex-wrap gap-1">
            <button 
              onClick={() => handleFilter('paid')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-gray-100 text-gray-700 border border-gray-200'
            >
              ✅ Оплачено
            </button>
            <button 
              onClick={() => handleFilter('unpaid')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-gray-100 text-gray-700 border border-gray-200'
            >
              ⏳ Не оплачено
            </button>
            <button 
              onClick={() => handleFilter('large')}
              className='text-xs py-1 px-3 rounded-2xl font-semibold bg-gray-100 text-gray-700 border border-gray-200'
            >
              💰 Крупные
            </button>
          </div>
        </div>
      )}

      {/* Статус обновления */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 text-right">
          Обновлено: {new Date(lastUpdated).toLocaleString('ru-RU')}
        </div>
      )}
    </div>
  );
};

export default Filter;