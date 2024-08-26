import { useExcelState } from "@/pages/excel";
import { convertBytes } from "@/utils/convertBytes";
import Image from "next/image";

export const ExcelFile = () => {
  const [contextValue] = useExcelState();

  return (
    <div className="text-center">
      <Image
        src={"/images/ic-excel.png"}
        width={68}
        height={68}
        alt=""
        className="mb-[2rem] mx-auto"
      />
      <p className="text-gray-3 text-[1.6rem]">
        {contextValue.fileInfo?.name || "파일명"}
      </p>
      <p className="text-gray-3 opacity-50 text-[1.4rem]">
        ({convertBytes(contextValue.fileInfo?.size || 0)})
      </p>
    </div>
  );
};
