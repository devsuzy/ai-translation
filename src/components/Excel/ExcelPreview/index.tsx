import { useExcelState } from "@/pages/excel";

export const ExcelPreview = () => {
  const [contextValue, setContextValue] = useExcelState();

  if (!contextValue?.fileData) {
    return (
      <div className="excel-preview-area fixed left-[2rem] top-[10rem] max-w-[60rem] max-h-[40rem] overflow-auto z-100"></div>
    );
  }

  const selectAddressArr = contextValue?.selectAddress || [];

  const handleSelectAddress = (address: string) => () => {
    let updateSelectAddressArr = [...selectAddressArr, address];
    if (selectAddressArr.includes(address)) {
      updateSelectAddressArr = selectAddressArr.filter((v) => v !== address);
    }
    setContextValue((prev) => ({
      ...prev,
      selectAddress: updateSelectAddressArr,
    }));
  };

  return (
    <div className="excel-preview-area fixed left-[2rem] top-[10rem] max-w-[60rem] max-h-[40rem] overflow-auto z-100">
      <div className="border-l border-b border-black bg-white/30">
        {contextValue.fileData.map((row, i) => {
          return (
            <div
              className="flex border-t border-black overflow-hidden w-max"
              key={i}
            >
              {row.map((cell) => {
                return (
                  <div
                    className="flex flex-col w-[5.4rem] h-[4.6rem] overflow-hidden border-r border-black text-[1rem]"
                    key={cell.address}
                  >
                    <button
                      onClick={handleSelectAddress(cell.address)}
                      className={`border-b border-black ${
                        selectAddressArr.includes(cell.address)
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      {cell?.address}
                    </button>
                    {typeof cell.value !== "object" && cell.value ? (
                      <button
                        onClick={handleSelectAddress(cell.address)}
                        className={`flex-1 break-keep ${
                          selectAddressArr.includes(cell.address)
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {cell.value}
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
