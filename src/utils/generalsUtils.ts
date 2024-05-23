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
