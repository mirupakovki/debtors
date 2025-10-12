import { Provider } from 'react-redux';
import { store } from './store/store';

import DebtorsPage from './pages/DebtorsPage';

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <DebtorsPage />
      </div>
    </Provider>
  );
};

export default App;