import { ProgressBar } from "@/components/ProgressBar";
import { ExcelFile } from "../ExcelFile";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { EXCEL_ROW_MAP, useExcelState } from "@/pages/excel";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/pages/api/trans";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressState } from "@/stores/excel";
import { CustomIcon } from "@/components/CustomIcon";

export const Generating = () => {
  const [contextValue, setContextValue] = useExcelState();
  const [blobData, setBlobData] = useState<Blob>();
  const [complete, setComplete] = useState<boolean>(false);
  const excelData = contextValue.fileData ? [...contextValue.fileData] : [];

  const setProgress = useSetRecoilState(progressState);
  const progress = useRecoilValue(progressState);

  const callApi = useCallback((text: string) => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 99) {
          return prev + 10;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 100);

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
  }, []);

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

        const promises: Promise<any>[] = [];

        excelData.forEach((data, i) => {
          const [key, values] = data;
          if (i === 0) return;
          promises.push(
            Promise.allSettled([
              callApi(values[targetIndexes[0]]),
              callApi(values[targetIndexes[1]]),
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
        setComplete(true);
        setProgress(100);
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
        {!complete ? (
          <ProgressBar text={"생성 중..."} value={`${progress}%`} />
        ) : (
          <ProgressBar
            text={"생성 작업이 완료되었습니다."}
            value={<CustomIcon iconType={"check"} size={"m"} stroke="white" />}
          />
        )}
      </div>
      <div className="flex gap-[0.8rem]">
        {!complete ? (
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
