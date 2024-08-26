import { ProgressBar } from "@/components/ProgressBar";
import { ExcelFile } from "../ExcelFile";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { EXCEL_ROW_MAP, useExcelState } from "@/pages/excel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/pages/api/trans";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressState } from "@/stores/excel";

export const Generating = () => {
  const [contextValue, setContextValue] = useExcelState();
  const [blobData, setBlobData] = useState<Blob>();

  const excelData = useMemo(() => {
    return contextValue.fileData ? [...contextValue.fileData] : [];
  }, [contextValue]);

  const callApi = useCallback((text: string) => {
    return api.post("", {
      type: "trans",
      text,
      count: "",
      situation: `Act as a professinoal translator working in commerce company.\nTranslate the following text to ${"Korean"}.\nAll Translated sentences must be translated with as much detail as possible\nPrint ONLY Translated text.`,
    });
  }, []);

  const handleCancle = useCallback(() => {
    setContextValue({
      step: "Start",
      fileData: undefined,
      fileInfo: undefined,
    });
  }, [setContextValue]);

  const handleDownload = useCallback(() => {
    if (!blobData) return;
    saveAs(blobData, "상품한글번역");
  }, [blobData]);

  useEffect(() => {
    if (!excelData || excelData.length === 0) return;

    async function handleTranslation() {
      try {
        const targetIndexes = [
          EXCEL_ROW_MAP.findIndex((col) => col === "상품명 일본어"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품 설명 일본어"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품명 한글"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품 설명 한글"),
        ];

        const updateProgress = () => {
          console.log("promise then!!");
        };

        const promises: Promise<any>[] = [];

        excelData.forEach((data, i) => {
          const [key, values] = data;
          if (i === 0) return;
          promises.push(
            Promise.allSettled([
              callApi(values[targetIndexes[0]]).finally(updateProgress),
              callApi(values[targetIndexes[1]]).finally(updateProgress),
            ])
          );
        });

        const result = await Promise.allSettled(promises);

        result.forEach((res, i) => {
          if (res.status === "fulfilled") {
            excelData[i + 1][1][targetIndexes[2]] = res.value[0].value.data;
            excelData[i + 1][1][targetIndexes[3]] = res.value[1].value.data;
          }
        });

        console.log(excelData);

        const wb = new ExcelJS.Workbook();

        const sheet = wb.addWorksheet("번역본");

        excelData.forEach((data) => {
          const [key, values] = data;
          sheet.addRow(values);
        });

        const fileData = await wb.xlsx.writeBuffer();
        const blob = new Blob([fileData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        setBlobData(blob);
        setContextValue((prev) => ({
          ...prev,
          complete: true,
        }));
      } catch (err) {
        throw new Error(`translation error - ${err}`);
      }
    }
    handleTranslation();
  }, []);

  return (
    <div className={styles["generating-wrap"]}>
      <ExcelFile />
      <div className={styles["progress-wrap"]}>
        <ProgressBar />
      </div>
      <div className="flex gap-[0.8rem]">
        {!contextValue.complete ? (
          <Button variant="cancel" label="취소" onClick={handleCancle} />
        ) : (
          <Button
            variant="download"
            label="다운로드"
            icon="download"
            onClick={handleDownload}
          />
        )}
      </div>
    </div>
  );
};
