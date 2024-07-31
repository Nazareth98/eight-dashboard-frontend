import { StylesConfig } from "react-select";

export function formatCurrency(value, locale = "en-US", currency = "USD") {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  if (!numberValue || isNaN(numberValue)) {
    return "0,00";
  }

  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formataDate(dataStr) {
  const data = new Date(dataStr);

  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const dataFormatada = `${pad(dia)}/${pad(mes)}/${ano}`;

  return dataFormatada;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

export function formatOrder(doc) {
  const numeroPedido = doc.split("/")[0];

  return numeroPedido;
}

export function getLastSixMonths() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = [];
  const currentDate = new Date();

  for (let i = 0; i < 6; i++) {
    const month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthName = monthNames[month.getMonth()];
    const monthNumber = month.getMonth() + 1;
    const year = month.getFullYear();
    result.push({ label: monthName, number: monthNumber, year: year });
  }

  return result.reverse();
}

export function getSelectStyles(): StylesConfig {
  return {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1d1f1d",
      border: "2px solid #313330",
      padding: "3px",
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "#929991",
      backgroundColor: state.isSelected ? "#1d1f1d" : "#313330",
      "&:hover": {
        backgroundColor: "#1d1f1d",
        color: "#fff",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#aab2aa",
    }),
  };
}

export const getWeekOfYear = (date) => {
  const [day, month, year] = date.split("/");
  const currentDay = Number(day);
  if (currentDay <= 7) {
    return 1;
  } else if (currentDay <= 14) {
    return 2;
  } else if (currentDay <= 21) {
    return 3;
  } else {
    return 4;
  }
};

export function getStartAndEndOfWeek() {
  const now = new Date();

  // Obter o primeiro dia da semana (segunda-feira)
  const startOfWeek = new Date(now);
  const dayOfWeek = now.getDay();
  const distanceToMonday = (dayOfWeek + 6) % 7; // Ajusta para que segunda-feira seja o início da semana
  startOfWeek.setDate(now.getDate() - distanceToMonday);
  startOfWeek.setHours(0, 0, 0, 0); // Zera a hora para o início do dia

  // Obter o último dia da semana (domingo)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Define a última hora do último dia

  const week = getWeekOfYear(endOfWeek.toLocaleDateString("pt-BR"));
  return {
    startOfWeek: startOfWeek.toLocaleDateString("pt-BR"),
    endOfWeek: endOfWeek.toLocaleDateString("pt-BR"),
    week,
  };
}

export function sortTableData(data: any[], propName: string, order: string) {
  if (order === "asc") {
    return data.sort((a, b) => {
      if (typeof a[propName] === "string" && typeof b[propName] === "string") {
        return a[propName].localeCompare(b[propName]);
      }
      return a[propName] - b[propName];
    });
  }

  if (order === "desc") {
    return data.sort((a, b) => {
      if (typeof a[propName] === "string" && typeof b[propName] === "string") {
        return b[propName].localeCompare(a[propName]);
      }
      return b[propName] - a[propName];
    });
  }

  return data;
}
