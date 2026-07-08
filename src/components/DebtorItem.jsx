// import { useState } from "react";
// import { IoDocumentText, IoChevronForward } from "react-icons/io5";

// const DebtorItem = ({ group }) => {
//   const [active, setActive] = useState(false);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("ru-RU").format(amount) + "₽";
//   };

//   return (
//     <div
//       className={`w-full bg-white shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md ${
//         active ? "scale-105 my-7" : ""
//       }`}
//       onClick={() => setActive(!active)}
//     >
//       {/* Основная информация (всегда видна) */}
//       <div className={`min-h-20 py-2 px-3 flex justify-between items-center`}>
//         <div className="flex w-full items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div
//               className={`flex justify-center items-center rounded-full min-w-10 h-10 ${
//                 active ? "bg-blue-50" : "bg-gray-100"
//               }`}
//             >
//               <IoDocumentText
//                 className={`size-6 duration-200 transition-all ${
//                   active ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>
//             <div className=" flex flex-col justify-between">
//               <h2
//                 className={`text-sm font-semibold ${
//                   active ? "text-blue-500" : "text-gray-400"
//                 }`}
//               >
//                 {group.client}
//               </h2>
//             </div>
//           </div>
//           <div className="text-right">
//             <h2
//               className={`font-bold text-lg ${active ? "" : "text-gray-400"}`}
//             >
//               {formatCurrency(group.totalRemainder)}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Раскрывающаяся часть с деталями */}
//       <div
//         className={`transition-all duration-300 ease-in-out ${
//           active ? "opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {active && (
//           <div className="px-3 pb-3 text-xs border-t-2 border-gray-300">
//             {/* Заголовок деталей */}
//             <div className="flex justify-between items-center py-2">
//               <h4 className="text-gray-500 text-xs font-medium">
//                 Детали долгов:
//               </h4>
//               <span className="text-gray-400 text-xs">
//                 Всего накладных: {group.debts.length}
//               </span>
//             </div>

//             {/* Список всех накладных */}
//             <div className="space-y-2">
//               {group.debts.map((debt, index) => (
//                 <div key={index}>
//                   {debt.link ? (
//                     // Если есть ссылка - вся накладная становится кликабельной ссылкой
//                     <div
//                       href={debt.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
//                       onClick={(e) => e.stopPropagation()} // Чтобы не закрывался родительский элемент
//                     >
//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-gray-700">
//                           Накладная от {debt.date}
//                         </div>
//                         <div className="flex gap-4 text-xs text-gray-500 mt-1">
//                           <span>Сумма: {formatCurrency(debt.summa)}</span>
//                           {debt.remainder > 0 && (
//                             <span>
//                               Остаток: {formatCurrency(debt.remainder)}
//                             </span>
//                           )}
//                         </div>
                        
//                         {/* БЛОК С ДОКУМЕНТАМИ - ДОБАВЛЕНО ЗДЕСЬ */}
//                         {debt.links && debt.links.length > 0 && (
//                           <div className="mt-3 pt-2 border-t border-gray-200">
//                             <div className="flex items-center gap-2 mb-2">
//                               <span className="text-xs text-gray-500 font-medium">Документы:</span>
//                               <span className="text-xs text-gray-400">({debt.links.length})</span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-2">
//                               {debt.links.map((link, linkIndex) => (
//                                 <a
//                                   key={linkIndex}
//                                   href={link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="group relative block bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <div className="flex items-center gap-2 bg-blue-50 rounded-sm">
//                                     <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
//                                       <span className="text-blue-600 text-sm font-bold">{linkIndex + 1}</span>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="text-xs font-medium text-gray-700 truncate">
//                                         Часть {linkIndex + 1}
//                                       </div>
//                                       <div className="text-xs text-gray-500 truncate">
//                                         {new URL(link).hostname}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </a>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     // Если нет ссылки - обычный некликабельный блок
//                     <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-gray-700">
//                           Накладная от {debt.date}
//                         </div>
//                         <div className="flex gap-4 text-xs text-gray-500 mt-1">
//                           <span>Сумма: {formatCurrency(debt.summa)}</span>
//                           {debt.remainder > 0 && (
//                             <span>
//                               Остаток: {formatCurrency(debt.remainder)}
//                             </span>
//                           )}
//                         </div>
                        
//                         {/* БЛОК С ДОКУМЕНТАМИ ДЛЯ НЕКЛИКАБЕЛЬНОЙ НАКЛАДНОЙ */}
//                         {debt.links && debt.links.length > 0 && (
//                           <div className="mt-3 pt-2 border-t border-gray-200">
//                             <div className="flex items-center gap-2 mb-2">
//                               <span className="text-xs text-gray-500 font-medium">Документы:</span>
//                               <span className="text-xs text-gray-400">({debt.links.length})</span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-2">
//                               {debt.links.map((link, linkIndex) => (
//                                 <a
//                                   key={linkIndex}
//                                   href={link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="group relative block bg-gray-50 rounded-lg p-2 hover:bg-blue-50 transition-colors"
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
//                                       <span className="text-blue-600 text-sm font-bold">{linkIndex + 1}</span>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="text-xs font-medium text-gray-700 truncate">
//                                         Документ {linkIndex + 1}
//                                       </div>
//                                       <div className="text-xs text-gray-500 truncate">
//                                         {new URL(link).hostname}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </a>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex items-center ml-2">
//                         <IoDocumentText className="size-4 text-gray-400" />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DebtorItem;
// components/DebtorItem.jsx
// components/DebtorItem.jsx
// components/DebtorItem.jsx
import { useState, useMemo } from "react";
import { IoDocumentText, IoChevronForward } from "react-icons/io5";

const DebtorItem = ({ group }) => {
  const [active, setActive] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + "₽";
  };

  // Функция для безопасного парсинга даты
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Если это уже объект Date
    if (dateString instanceof Date) {
      return isNaN(dateString.getTime()) ? null : dateString;
    }
    
    // Если строка пустая или undefined
    if (typeof dateString !== 'string') return null;
    
    const trimmed = dateString.trim();
    if (!trimmed) return null;
    
    // Если дата в формате DD.MM.YYYY
    if (trimmed.includes('.')) {
      const parts = trimmed.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month, day);
        }
      }
    }
    
    // Если дата в формате YYYY-MM-DD
    if (trimmed.includes('-')) {
      const parts = trimmed.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month, day);
        }
      }
    }
    
    // Пробуем стандартный парсинг
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date;
  };

  // Функция для расчета статуса просрочки
  const getOverdueStatus = (dateString) => {
    const debtDate = parseDate(dateString);
    if (!debtDate) return 'green';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    debtDate.setHours(0, 0, 0, 0);
    
    const diffTime = today - debtDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffMonths >= 2) return 'red';
    if (diffMonths >= 1) return 'yellow';
    return 'green';
  };

  // Функция для получения цвета статуса
  const getStatusColor = (status) => {
    switch(status) {
      case 'red': return 'bg-red-100 border-red-500 text-red-700';
      case 'yellow': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'green': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  // Функция для получения текста статуса
  const getStatusText = (dateString) => {
    const debtDate = parseDate(dateString);
    if (!debtDate) return 'Нет даты';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    debtDate.setHours(0, 0, 0, 0);
    
    const diffTime = today - debtDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffWeeks = Math.floor((diffDays % 30) / 7);
    
    if (diffMonths >= 2) {
      return `Просрочка ${diffMonths} мес.`;
    }
    if (diffMonths >= 1) {
      return `Просрочка ${diffMonths} мес. ${diffWeeks} нед.`;
    }
    if (diffDays > 0) {
      return `${diffDays} дн. до просрочки`;
    }
    return 'Актуально';
  };

  // Используем useMemo для вычисления oldestDate
  const { oldestDateStr, status, statusText, statusColor } = useMemo(() => {
    if (!group || !group.debts || group.debts.length === 0) {
      return {
        oldestDateStr: '',
        status: 'green',
        statusText: 'Нет долгов',
        statusColor: 'bg-green-100 border-green-500 text-green-700'
      };
    }

    // Находим самую старую дату
    let oldestDate = null;
    let oldestDateStr = '';
    
    for (const debt of group.debts) {
      if (debt && debt.date) {
        const date = parseDate(debt.date);
        if (date) {
          if (!oldestDate || date < oldestDate) {
            oldestDate = date;
            oldestDateStr = debt.date;
          }
        }
      }
    }

    const status = getOverdueStatus(oldestDateStr);
    const statusText = getStatusText(oldestDateStr);
    const statusColor = getStatusColor(status);

    return {
      oldestDateStr,
      status,
      statusText,
      statusColor
    };
  }, [group]);

  // Если нет группы или долгов
  if (!group || !group.debts || group.debts.length === 0) {
    return (
      <div className="w-full bg-white shadow-sm rounded-2xl p-4 text-center text-gray-400">
        Нет данных о долгах
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md border-l-4 ${
        status === 'red' ? 'border-red-500' :
        status === 'yellow' ? 'border-yellow-500' :
        'border-green-500'
      } ${active ? "scale-105 mb-5" : ""}`}
      onClick={() => setActive(!active)}
    >
      {/* Основная информация (всегда видна) */}
      <div className={`min-h-20 py-2 px-3 flex justify-between items-center`}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex justify-center items-center rounded-full min-w-10 h-10 ${
                active ? "bg-blue-50" : "bg-gray-100"
              }`}
            >
              <IoDocumentText
                className={`size-6 duration-200 transition-all ${
                  active ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>
            <div className="flex flex-col justify-between">
              <h2
                className={`text-sm font-semibold ${
                  active ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {group.client || 'Без имени'}
              </h2>
              {/* Статус просрочки */}
              <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${statusColor}`}>
                {statusText}
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2
              className={`font-bold text-lg ${active ? "" : "text-gray-400"}`}
            >
              {formatCurrency(group.totalRemainder || 0)}
            </h2>
            {/* Индикатор цвета */}
            <div className="flex justify-end gap-1 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                status === 'red' ? 'bg-red-500' :
                status === 'yellow' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-[10px] text-gray-400">
                {oldestDateStr || 'нет даты'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Раскрывающаяся часть с деталями */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          active ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {active && (
          <div className="px-3 pb-3 text-xs border-t-2 border-gray-300">
            {/* Заголовок деталей */}
            <div className="flex justify-between items-center py-2">
              <h4 className="text-gray-500 text-xs font-medium">
                Детали долгов:
              </h4>
              <span className="text-gray-400 text-xs">
                Всего накладных: {group.debts.length}
              </span>
            </div>

            {/* Список всех накладных */}
            <div className="space-y-2">
              {group.debts.map((debt, index) => {
                const debtStatus = getOverdueStatus(debt?.date);
                const debtDate = debt?.date || 'нет даты';
                const debtSumma = debt?.summa || 0;
                const debtRemainder = debt?.remainder || 0;
                const debtLink = debt?.link || null;

                return (
                  <div key={index}>
                    {debtLink ? (
                      <a
                        href={debtLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors cursor-pointer border-l-4 ${
                          debtStatus === 'red' ? 'border-red-500 bg-red-50 hover:bg-red-100' :
                          debtStatus === 'yellow' ? 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100' :
                          'border-green-500 bg-green-50 hover:bg-green-100'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">
                            Накладная от {debtDate}
                          </div>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>Сумма: {formatCurrency(debtSumma)}</span>
                            {debtRemainder > 0 && (
                              <span>Остаток: {formatCurrency(debtRemainder)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center ml-2">
                          <IoChevronForward className="size-4 text-blue-500" />
                        </div>
                      </a>
                    ) : (
                      <div className={`flex items-center justify-between py-2 px-3 rounded-lg border-l-4 ${
                        debtStatus === 'red' ? 'border-red-500 bg-red-50' :
                        debtStatus === 'yellow' ? 'border-yellow-500 bg-yellow-50' :
                        'border-green-500 bg-green-50'
                      }`}>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">
                            Накладная от {debtDate}
                          </div>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>Сумма: {formatCurrency(debtSumma)}</span>
                            {debtRemainder > 0 && (
                              <span>Остаток: {formatCurrency(debtRemainder)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center ml-2">
                          <IoDocumentText className="size-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtorItem;