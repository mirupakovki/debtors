import { useSelector } from "react-redux";
import { useDebtsSync } from "../hooks/useDebtsSync";
import Error from "../components/Error";
import DebtorsList from "../components/DebtorsList";
import Filter from "../components/Filter";
import Panel from "../components/Panel";

const DebtorsPage = () => {
  const { data, status } = useSelector((state) => state.debts);
  const { refreshDebts, error } = useDebtsSync(300000);

  if (status === "loading" && data.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {error && <Error error={error} />}
      
      <Panel />
      <Filter />
      
      <DebtorsList />

      {data.length === 0 && status === "succeeded" && (
        <div className="text-center py-8 text-gray-500">
          Нет данных о долгах
        </div>
      )}
    </div>
  );
};

export default DebtorsPage;