import { DollarSign, FileText } from "lucide-react";

interface CbmDataType {
  classif: string;
  fob: number;
  group: string;
  quantityBoxes: number;
  quantityPieces: number;
  cbm: number;
  kilos: number;
}

interface CbmDataProps {
  cbmData: CbmDataType;
}

const CbmResult = ({ cbmData }: CbmDataProps) => {
  return (
    <div className="w-full h-full flex flex-col items-start gap-4 fade-left">
      <div className="w-full h-full flex-1 flex flex-col fade-left">
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 text-gray-700" />
          <span className="w-1/2 text-gray-500 font-heading text-sm">
            Grupo
          </span>
        </div>

        <div className="w-full h-full flex items-end justify-end fade-right">
          <h2 className="text-xl font-heading font-semibold text-gray-200">
            {cbmData?.group}
          </h2>
        </div>
      </div>
      <div className="w-24 m-auto h-[2px] bg-gray-900" />
      <div className="w-full h-full flex-1 flex flex-col fade-left">
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 text-gray-700" />
          <span className="w-1/2 text-gray-500 font-heading text-sm">CBM</span>
        </div>

        <div className="w-full h-full flex items-end justify-end fade-right">
          <h2 className="text-xl font-heading font-semibold text-gray-200">
            {cbmData?.cbm.toFixed(2)}m³
          </h2>
        </div>
      </div>

      <div className="w-24 m-auto h-[2px] bg-gray-900" />
      <div className="w-full h-full flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-gray-700" />
          <span className="w-1/2 text-gray-500 font-heading text-sm">
            Kilos
          </span>
        </div>
        <div className="w-full h-full flex items-end justify-end fade-right">
          <h2 className="text-xl font-heading font-semibold text-gray-200">
            {cbmData?.kilos.toLocaleString("pt-BR")} kg
          </h2>
        </div>
      </div>
      <div className="w-24 m-auto h-[2px] bg-gray-900" />
      <div className="w-full h-full flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-gray-700" />
          <span className="w-1/2 text-gray-500 font-heading text-sm">
            Quantidade de caixas
          </span>
        </div>
        <div className="w-full h-full flex items-end justify-end fade-right">
          <h2 className="text-xl font-heading font-semibold text-gray-200">
            <span className="text-gray-400 font-normal italic text-sm">
              ({cbmData?.quantityPieces.toLocaleString("pt-BR")} peças)
            </span>{" "}
            {cbmData?.quantityBoxes} caixas
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CbmResult;
