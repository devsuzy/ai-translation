import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import ExcelEmptyIcon from "@/assets/images/icons/ic-excel_empty.svg";
import ExcelJS from "exceljs";
import { useExcelState } from "@/pages/excel";

export const Start = () => {
  const [contextValue, setContextValue] = useExcelState();
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rowMap = new Map();
      const file = e.target.files?.[0];
      if (file && file!.name.split(".").at(-1) === "xlsx") {
        const wb = new ExcelJS.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const buffer = reader.result as ArrayBuffer;
          wb.xlsx
            .load(buffer)
            .then((workbook) => {
              workbook.eachSheet((sheet, id) => {
                sheet.eachRow((row, rowIndex) => {
                  if (!row) return;
                  const filtered = (row.values as any[]).filter((data) => data);
                  rowMap.set(rowIndex, filtered);
                });
              });

              if (rowMap.size > 0) {
                setContextValue({
                  step: "Upload",
                  fileData: rowMap,
                  fileInfo: file,
                });
              }
            })
            .catch((err) => {
              throw new Error(`upload error - ${err}`);
            });
        };
      } else {
        alert("업로드 가능한 파일 형식이 아닙니다.");
      }
    },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1119);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["start-wrap"]}>
      <div>
        <ExcelEmptyIcon width="11.6rem" height="10.4rem" className="m-auto" />
        {isMobile ? (
          <p className="text-[1.8rem] text-center font-semibold pt-6">
            내 PC에서 파일을 첨부해주세요.
          </p>
        ) : (
          <p className="text-[1.8rem] text-center font-semibold pt-6">
            <b className="text-[2rem] text-primary">내 PC에서 첨부</b>
            하거나 문서를 드래그하여 넣어주세요..
          </p>
        )}
      </div>
      <div className={`${"pc-only"} ${styles.divider}`}>
        <p className="text-[1.4rem] text-center text-gray-2">또는</p>
      </div>
      <div>
        <Button
          variant="choice"
          label="파일 선택"
          onClick={() => inputRef.current?.click()}
        />
        <input type="file" hidden onChange={handleFileUpload} ref={inputRef} />
      </div>
    </div>
  );
};
