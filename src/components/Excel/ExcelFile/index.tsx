import ExcelIcon from "@/assets/images/icons/ic-excel.svg";
import { useExcelState } from "@/pages/excel";
import { convertBytes } from "@/utiles/convertBytes";

export const ExcelFile = () => {
  const [contextValue] = useExcelState();

  return (
    <div className="text-center">
      <ExcelIcon width="5.7rem" height="5.6rem" className="mb-[2rem] mx-auto" />
      <p className="text-gray-3 text-[1.6rem]">
        {contextValue.fileInfo?.name || "파일명"}
      </p>
      <p className="text-gray-3 opacity-50 text-[1.4rem]">
        ({convertBytes(contextValue.fileInfo?.size)})
      </p>
    </div>
  );
};
