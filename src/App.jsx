import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import DebtorsPage from './pages/DebtorsPage';
import Header from './components/Header';

const AppContent = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DebtorsPage />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
};

export default App;