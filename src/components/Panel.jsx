import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupedDebts } from '../store/slices/debtsSlice';

const Panel = () => {
  const groupedData = useSelector(selectGroupedDebts);
  
  // Считаем общий остаток
  const totalDebt = groupedData.reduce((total, group) => total + group.totalRemainder, 0);
  
  // Количество уникальных клиентов
  const uniqueClients = groupedData.length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  return (
    <div className="flex flex-col justify-center items-center h-40 px-3 bg-white shadow-sm rounded-2xl">
      <h2 className='text-xs text-gray-400'>Общая задолженность</h2>
      <h1 className='font-bold text-4xl my-2'>{formatCurrency(totalDebt)}</h1>
      <div className='flex gap-4 text-xs text-gray-500'>
        <span>Клиентов: {uniqueClients}</span>
      </div>
    </div>
  );
};

export default Panel;
