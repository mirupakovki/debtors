import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../../constants/api';

// Первый вариант
// export const fetchDebts = createAsyncThunk(
//   'debts/fetchDebts',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Добавляем timestamp чтобы избежать кэширования браузером
//       const timestamp = new Date().getTime();
//       const response = await fetch(`${API_URL}?t=${timestamp}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }
      
//       console.log('✅ Данные успешно загружены:', data.data?.length, 'записей');
//       return data;
//     } catch (error) {
//       console.error('❌ Ошибка загрузки:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchDebts = createAsyncThunk(
  'debts/fetchDebts',
  async (token, { rejectWithValue }) => {
    try {
      console.log('📡 Запрос долгов с токеном:', token);
      
      const response = await fetch(`${API_URL}?action=getDebts&token=${encodeURIComponent(token)}&t=${new Date().getTime()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Ответ getDebts:', data);
      
      if (!data.success) {
        throw new Error(data.message);
      }
      
      console.log('✅ Данные успешно загружены:', data.data?.length, 'записей');
      return data;
    } catch (error) {
      console.error('❌ Ошибка загрузки долгов:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('debtsState');
    if (serializedState === null) {
      return {
        data: [],
        lastUpdated: null,
        status: 'idle',
        error: null
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      data: [],
      lastUpdated: null,
      status: 'idle',
      error: null
    };
  }
};

const initialState = {
  ...loadFromLocalStorage(),
  filter: 'all',
  searchQuery: ''
};

const debtsSlice = createSlice({
  name: 'debts',
  initialState,
  reducers: {
    updateDebts: (state, action) => {
      state.data = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDebts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.lastUpdated = action.payload.lastUpdated || new Date().toISOString();
        
        // Save to localStorage on every successful update
        try {
          const serializedState = JSON.stringify({
            data: state.data,
            lastUpdated: state.lastUpdated,
            status: state.status,
            error: state.error
          });
          localStorage.setItem('debtsState', serializedState);
        } catch (err) {
          console.error('Could not save state to localStorage:', err);
        }
      })
      .addCase(fetchDebts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Selector для фильтрованных данных
export const selectFilteredDebts = (state) => {

  const { data, filter, searchQuery } = state.debts;
  
  let filtered = data;
  
  // Применяем поиск
  if (searchQuery) {
    filtered = filtered.filter(debt => 
      debt.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Применяем фильтры
  switch (filter) {
    case 'paid':
      return filtered.filter(debt => debt.remainder === 0);
    case 'unpaid':
      return filtered.filter(debt => debt.remainder > 0);
    case 'large':
      return filtered.filter(debt => debt.summa > 50000);
    default:
      return filtered;
  }
};

// Selector для группированных данных
export const selectGroupedDebts = (state) => {
  const filteredData = selectFilteredDebts(state);
  
  // Группируем по клиенту
  const grouped = filteredData.reduce((acc, debt) => {
    if (!acc[debt.client]) {
      acc[debt.client] = {
        client: debt.client,
        totalSumma: 0,
        totalRemainder: 0,
        debts: [],
        latestDate: ''
      };
    }
    
    acc[debt.client].totalSumma += debt.summa;
    acc[debt.client].totalRemainder += debt.remainder;
    acc[debt.client].debts.push(debt);
    
    // Находим самую позднюю дату
    if (!acc[debt.client].latestDate || debt.date > acc[debt.client].latestDate) {
      acc[debt.client].latestDate = debt.date;
    }
    
    return acc;
  }, {});
  
  return Object.values(grouped);
};

export const { updateDebts, clearError, setFilter, setSearchQuery } = debtsSlice.actions;
export default debtsSlice.reducer;