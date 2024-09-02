import jsPDF from "jspdf";
import { Printer, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { SuggestionDataType } from "../../screens/purchaseSuggestion";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";

interface SuggestionListProps {
  data: SuggestionDataType[];
}

const SuggestionList = ({ data }: SuggestionListProps) => {
  const [groupOptions, setGroupOptions] = useState<any[]>();
  const [brandOptions, setBrandOptions] = useState<any[]>();
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [dataToShow, setDataToShow] = useState<SuggestionDataType[]>();

  useEffect(() => {
    if (!data) return;

    const groups: { value: string | number; label: string }[] = [];
    const brands: { value: string | number; label: string }[] = [];

    data.forEach((item) => {
      if (!groups.some((group) => group.label === item.groupDescription)) {
        groups.push({
          value: item.classification,
          label: item.groupDescription,
        });
      }
      if (!brands.some((brand) => brand.label === item.brandName)) {
        brands.push({ value: item.brand, label: item.brandName });
      }
    });

    setGroupOptions(groups);
    setBrandOptions(brands);
    setDataToShow(data);
  }, [data]);

  function handleChangeGroup(event) {
    setSelectedGroup(event.target.value);
    const classification = event.target.value;
    let updatedData = [];

    if (!classification) {
      updatedData = data.filter((item) => item.brand == selectedBrand);
    }

    if (!selectedBrand) {
      updatedData = data;
    }

    if (classification) {
      updatedData = data.filter(
        (item) => item.classification === classification
      );
    }

    if (selectedBrand && classification) {
      updatedData = data.filter(
        (item) =>
          item.classification === classification && item.brand == selectedBrand
      );
    }

    setDataToShow(updatedData);
  }

  function handleChangeBrand(event) {
    setSelectedBrand(event.target.value);
    const brand = Number(event.target.value);
    const groups: { value: string | number; label: string }[] = [];
    if (brand === 0) {
      setDataToShow(data);
      data.forEach((item) => {
        if (!groups.some((group) => group.label === item.groupDescription)) {
          groups.push({
            value: item.classification,
            label: item.groupDescription,
          });
        }
      });
      setGroupOptions(groups);
      return;
    }
    const updatedData = data.filter((item) => item.brand === brand);
    updatedData.forEach((item) => {
      if (!groups.some((group) => group.label === item.groupDescription)) {
        groups.push({
          value: item.classification,
          label: item.groupDescription,
        });
      }
    });
    setDataToShow(updatedData);
    setGroupOptions(groups);
    console.log("depois do filtro", updatedData.length);
  }

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
    const totalSuggestion = dataToShow.reduce(
      (sum, row) => sum + row.purchaseSuggestion,
      0
    );

    // Adiciona a tabela
    doc.autoTable({
      startY: 40,
      head: [["Id", "Produto", "Vendas Diárias", "Estoque", "Sugestão"]],
      body: dataToShow?.map((row) => [
        row.product,
        row.description,
        `${Number(row.dailySalesAverage.toFixed()).toLocaleString("pt-BR")} un`,
        `${row.currentStock} un`,
        `${Number(row.purchaseSuggestion.toFixed()).toLocaleString(
          "pt-BR"
        )} un`,
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
          <div className="w-full flex gap-6">
            <select
              className="bg-gray-900 p-2 border-2 border-gray-800 text-gray-200 rounded "
              value={selectedBrand}
              onChange={handleChangeBrand}
            >
              <option value="">Selecione uma Marca</option>
              {brandOptions?.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <select
              className="bg-gray-900 p-2 border-2 border-gray-800 text-gray-200 rounded "
              value={selectedGroup}
              onChange={handleChangeGroup}
            >
              <option value="">Selecione um Grupo</option>
              {groupOptions?.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="overflow-y-auto flex flex-col gap-4 fade-left">
            {dataToShow?.map((item) => {
              return (
                <div
                  id={item.product.toString()}
                  key={`${item.product}-${item.purchaseSuggestion}`}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 cursor-pointer transition-all fade-left hover:bg-gray-900 fade-left"
                >
                  <div className="flex flex-col gap-2 p-1 col-span-4">
                    <span className="text-gray-500 text-xs font-semibold">
                      Produto
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Estoque Atual
                    </span>
                    <p
                      className={
                        "font-heading " +
                        (item.currentStock > 0
                          ? "text-primary-500 "
                          : item.currentStock < 0
                          ? "text-red-500"
                          : `text-gray-600`)
                      }
                    >
                      {item.currentStock} peças
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Venda Diária
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.dailySalesAverage.toFixed()} pc
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Estoque de Segurança
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {item.safetyStock} pc
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-1 col-span-2">
                    <span className="text-gray-500 text-xs font-semibold">
                      Sugestão de compra
                    </span>
                    <p
                      className={
                        "font-heading " +
                        (item.purchaseSuggestion > 0
                          ? "text-primary-500 "
                          : item.purchaseSuggestion < 0
                          ? "text-red-500"
                          : `text-gray-600`)
                      }
                    >
                      {Number(item.purchaseSuggestion.toFixed()).toLocaleString(
                        "pt-BR"
                      )}{" "}
                      pc
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
