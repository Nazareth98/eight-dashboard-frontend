import jsPDF from "jspdf";
import { Printer, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { SuggestionDataType } from "../../screens/purchaseSuggestion";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import { formatCurrency } from "../../utils/generalsUtils";

interface SuggestionListProps {
  data: SuggestionDataType[];
}

const SuggestionList = ({ data }: SuggestionListProps) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Obtenha a data atual no formato brasileiro
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const formattedTime = `${today
      .getHours()
      .toString()
      .padStart(2, "0")}:${today
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;

    // Adiciona o cabeçalho com a data e a hora
    doc.setFontSize(12);
    doc.text(`${formattedDate} - ${formattedTime}`, 14, 15);

    // Adiciona o título
    doc.setFontSize(18);
    doc.text(`Sugestão de compra`, 14, 30);

    // Calcula as somas dos valores desejados
    const totalSuggestion = data.reduce((sum, row) => sum + row.suggestion, 0);

    // Adiciona a tabela
    doc.autoTable({
      startY: 40,
      head: [["Id", "Produto", "Grupo", "Vendas no Período", "Sugestão"]],
      body: data?.map((row) => [
        row.id,
        row.name,
        row.groupName,
        `${Number(row.total.toFixed()).toLocaleString("pt-BR")} un`,
        `${Number(row.suggestion.toFixed()).toLocaleString("pt-BR")} un`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [40, 40, 40] },
      margin: { horizontal: 10 },
    });

    // Adiciona as somas ao final da tabela
    const finalY = doc.previousAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(
      `Total a Comprar: ${Number(
        totalSuggestion.toFixed()
      ).toLocaleString()} un`,
      14,
      finalY + 10
    );

    doc.save(`sugestao-de-compra-${formattedDate}-${formattedTime}.pdf`);
  };

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-8 relative">
      {data ? (
        <>
          <div className="absolute right-8">
            <CustomButton theme="attention" onClick={exportPDF}>
              <Printer className="size-4" />
              imprimir
            </CustomButton>
          </div>
          <CustomSubtitle subtitle="Sugestão de Compra" />
          <div></div>
          <div className="overflow-y-auto flex flex-col gap-4 fade-left">
            {data?.map((item) => {
              return (
                <div
                  id={item.id.toString()}
                  key={`${item.id}-${item.suggestion}`}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 cursor-pointer transition-all fade-left hover:bg-gray-900 fade-left"
                >
                  <div className="flex flex-col gap-2 p-1 col-span-5">
                    <span className="text-gray-500 text-xs font-semibold">
                      Produto
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 p-1 col-span-3">
                    <span className="text-gray-500 text-xs font-semibold">
                      Grupo
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.groupName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Vendas no período
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.total} peças
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Sugestão
                    </span>
                    <p className="text-yellow-400 text-sm font-heading">
                      {item.suggestion} peças
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Settings className="size-4" />
          <span>Gere uma Sugestão de Compra</span>
        </div>
      )}
    </ComponentContainer>
  );
};

export default SuggestionList;
