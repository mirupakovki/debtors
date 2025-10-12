// hooks/useDebtsSync.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDebts } from '../store/slices/debtsSlice';

export const useDebtsSync = (syncInterval = 300000) => {
  const dispatch = useDispatch();
  const { status, lastUpdated } = useSelector(state => state.debts);

  useEffect(() => {
    const loadData = () => {
      console.log('🔄 Загрузка данных...');
      dispatch(fetchDebts());
    };

    // Загружаем сразу
    loadData();

    // Интервал для автоматического обновления
    const interval = setInterval(loadData, syncInterval);

    // Обновляем при возвращении на вкладку
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('📱 Страница активна - обновляем данные');
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Очистка
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, syncInterval]);

  const refreshDebts = () => {
    dispatch(fetchDebts());
  };

  return {
    status,
    lastUpdated,
    refreshDebts
  };
};