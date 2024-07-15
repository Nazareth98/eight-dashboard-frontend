import React, { useState } from "react";
import ModalBarChart from "../shared/modalBarChart";

const Modais = ({ isOpen, setIsOpen, data }) => {
  const [dailyIsOpen, setDailyIsOpen] = useState(false);

  const [dailyData, setDailyData] = useState([]);

  async function handleBarClick(event, chartContext, config) {
    const selectedWeek = data[config.dataPointIndex];
    setDailyData(selectedWeek.items);
    setDailyIsOpen(true);
  }

  useEffect(() => {
    if (data) {
      const groupedByWeek = data.reduce((acc, item) => {
        const date = parseDate(item.data);
        const week = getWeekOfYear(item.data);
        if (!acc[week]) {
          acc[week] = {
            week,
            total: 0,
            items: [],
          };
        }
        acc[week].items.push(item);
        acc[week].total += item.valor;
        return acc;
      }, {});

      const result = Object.values(groupedByWeek);

      result.sort((a, b) => a.week - b.week);

      const newLabels = [];
      const newData = [];

      setResultData(result);
      result.forEach((weekData) => {
        newLabels.push(`Semana ${weekData.week}`);
        newData.push(weekData.total);
      });

      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [data]);

  return (
    <>
      <ModalBarChart data={data} isOpen={isOpen} setIsOpen={setIsOpen} />

      <ModalBarChart
        data={dailyData}
        isOpen={dailyIsOpen}
        setIsOpen={setDailyIsOpen}
        handleBarClick={handleBarClick}
      />
    </>
  );
};

export default Modais;
