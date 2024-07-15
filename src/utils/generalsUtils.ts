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
