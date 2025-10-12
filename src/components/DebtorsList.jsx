import { useSelector } from "react-redux";
import DebtorItem from './DebtorItem';
import { selectGroupedDebts } from '../store/slices/debtsSlice';

const DebtorsList = () => {
  const groupedData = useSelector(selectGroupedDebts);
  
  if (groupedData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Нет данных по выбранным фильтрам
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {groupedData.map((group, index) => (
        <DebtorItem key={index} group={group} />
      ))}
    </div>
  );
};

export default DebtorsList;