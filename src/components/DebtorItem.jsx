import { useState } from "react";
import { IoDocumentText, IoChevronForward } from "react-icons/io5";

const DebtorItem = ({ group }) => {
  const [active, setActive] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + "₽";
  };

  return (
    <div
      className={`w-full bg-white shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md ${
        active ? "scale-105 my-7" : ""
      }`}
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
            <div className=" flex flex-col justify-between">
              <h2
                className={`text-sm font-semibold ${
                  active ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {group.client}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <h2
              className={`font-bold text-lg ${active ? "" : "text-gray-400"}`}
            >
              {formatCurrency(group.totalRemainder)}
            </h2>
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
              {group.debts.map((debt, index) => (
                <div key={index}>
                  {debt.link ? (
                    // Если есть ссылка - вся накладная становится кликабельной ссылкой
                    <a
                      href={debt.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()} // Чтобы не закрывался родительский элемент
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          Накладная от {debt.date}
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>Сумма: {formatCurrency(debt.summa)}</span>
                          {debt.remainder > 0 && (
                            <span>
                              Остаток: {formatCurrency(debt.remainder)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center ml-2">
                        <IoChevronForward className="size-4 text-blue-500" />
                      </div>
                    </a>
                  ) : (
                    // Если нет ссылки - обычный некликабельный блок
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          Накладная от {debt.date}
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>Сумма: {formatCurrency(debt.summa)}</span>
                          {debt.remainder > 0 && (
                            <span>
                              Остаток: {formatCurrency(debt.remainder)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center ml-2">
                        <IoDocumentText className="size-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtorItem;
