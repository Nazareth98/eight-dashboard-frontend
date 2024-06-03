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
