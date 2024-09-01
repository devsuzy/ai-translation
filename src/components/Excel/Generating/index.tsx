import { ProgressBar } from "@/components/ProgressBar";
import { ExcelFile } from "../ExcelFile";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { EXCEL_ROW_MAP, useExcelState } from "@/pages/excel";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { useSetRecoilState } from "recoil";
import { progressState } from "@/stores/excel";
import { sleep } from "@/utils/sleep";
import { api } from "@/lib/api/trans";
import { sendRequestsInBatches } from "@/utils/requestBatches";
import { dismissToast } from "@/utils/toast";
import { Id } from "react-toastify";
import { toastWithResponsive } from "@/utils/toastWithResponsive";

let abortController = new AbortController();
let signal = abortController.signal;

export const callApi = (text: string) => {
  return api.post(
    "",
    {
      type: "trans",
      text,
      count: "",
      situation: `Act as a professinoal translator working in commerce company.\nTranslate the following text to ${"Korean"}.\nAll Translated sentences must be translated with as much detail as possible\nPrint ONLY Translated text.`,
    },
    {
      signal,
    }
  );
};

export const Generating = () => {
  const [contextValue, setContextValue] = useExcelState();
  const setProgressState = useSetRecoilState(progressState);
  const [blobData, setBlobData] = useState<Blob>();

  const toastIdRefs = useRef<Id[]>([]);

  const fileNameSplit = (
    contextValue.fileInfo?.name ? contextValue.fileInfo?.name : "empty.xlsx"
  ).split(".");
  const fileExtension = fileNameSplit.at(-1);
  const downloadFileName =
    fileNameSplit.slice(0, fileNameSplit.length - 1).join() +
    "_번역본" +
    `.${fileExtension}`;

  const excelData = useMemo(() => {
    return contextValue.fileData ? [...contextValue.fileData] : [];
  }, [contextValue]);

  const handleCancle = useCallback(() => {
    setContextValue({
      step: "Start",
      fileData: undefined,
      fileInfo: undefined,
      complete: false,
      wb: undefined,
    });
    setProgressState({
      length: 0,
      count: 0,
    });
    if (toastIdRefs.current.length > 0)
      toastIdRefs.current.forEach((id) => dismissToast(id));
  }, [setContextValue, setProgressState]);

  const handleDownload = useCallback(() => {
    if (!blobData) return;
    saveAs(blobData, downloadFileName);
  }, [blobData]);

  useEffect(() => {
    if (
      contextValue.step !== "Generating" ||
      !excelData ||
      excelData.length === 0
    )
      return;

    let count = 0;

    toastIdRefs.current.push(
      toastWithResponsive("info", <p>번역중 ...</p>, {
        position: "bottom-right",
        autoClose: false,
      })
    );

    async function handleTranslation() {
      try {
        const targetIndexes = [
          EXCEL_ROW_MAP.findIndex((col) => col === "상품명 일본어"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품 설명 일본어"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품명 한글"),
          EXCEL_ROW_MAP.findIndex((col) => col === "상품 설명 한글"),
        ];

        const updateProgress = () => {
          count += 1;
          setProgressState({
            length: promises.length * 2,
            count,
          });
        };

        const promises: any[] = [];

        excelData.forEach((data, i) => {
          const [key, values] = data;
          if (i === 0) return;

          promises.push([
            { value: values[targetIndexes[0]], callback: updateProgress },
            { value: values[targetIndexes[1]], callback: updateProgress },
          ]);
        });

        const result = await sendRequestsInBatches(promises, 50, 3000);
        const resultFlat = result.flat();

        console.log(resultFlat);

        for (let i = 0; i < resultFlat.length; i++) {
          if (resultFlat[i].status === "rejected") {
            throw new Error("AXIOS_CANCLE");
          }
          if (
            (resultFlat[i] as any).value.length > 0 &&
            ((resultFlat[i] as any).value[0].status === "rejected" ||
              (resultFlat[i] as any).value[1].status === "rejected")
          ) {
            throw new Error("AXIOS_CANCLE");
          }
        }

        resultFlat.forEach((res, i) => {
          if (res.status === "fulfilled") {
            excelData[i + 1][1][targetIndexes[2]] = res.value[0].value.data;
            excelData[i + 1][1][targetIndexes[3]] = res.value[1].value.data;
          }
        });

        const wb = contextValue.wb;

        if (!wb) return;

        wb.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            if (rowIndex === 1 || !row) return;
            sheet.getRow(rowIndex).getCell(8).value =
              excelData[rowIndex - 1]?.[1]?.[7];
            sheet.getRow(rowIndex).getCell(9).value =
              excelData[rowIndex - 1]?.[1]?.[8];
          });
        });

        // excelData.forEach((data) => {
        //   const [key, values] = data;
        //   sheet.addRow(values);
        // });

        // sheet.autoFilter = {
        //   from: "A1",
        //   to: "I1",
        // };

        // sheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
        //   cell.font = { bold: true };
        // });

        // sheet.getColumn("F").width = 33;
        // sheet.getColumn("H").width = 33;

        // sheet.getColumn("G").width = 83;
        // sheet.getColumn("I").width = 83;

        // sheet.getCell("F1").fill = {
        //   type: "pattern",
        //   pattern: "solid",
        //   fgColor: { argb: "FFF8CBAD" },
        // };

        // sheet.getCell("G1").fill = {
        //   type: "pattern",
        //   pattern: "solid",
        //   fgColor: { argb: "FFF8CBAD" },
        // };

        // sheet.getCell("H1").fill = {
        //   type: "pattern",
        //   pattern: "solid",
        //   fgColor: { argb: "FF44B3E1" },
        // };

        // sheet.getCell("I1").fill = {
        //   type: "pattern",
        //   pattern: "solid",
        //   fgColor: { argb: "FF44B3E1" },
        // };

        // for (let rowNumber = 1; rowNumber <= sheet.rowCount; rowNumber++) {
        //   sheet.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell) => {
        //     cell.border = {
        //       top: { style: "thin" },
        //       left: { style: "thin" },
        //       bottom: { style: "thin" },
        //       right: { style: "thin" },
        //     };
        //   });
        // }

        const fileData = await wb.xlsx.writeBuffer();
        const blob = new Blob([fileData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        await sleep(1000);

        if (toastIdRefs.current.length > 0)
          toastIdRefs.current.forEach((id) => dismissToast(id));
        toastWithResponsive("success", <p>번역완료</p>, {
          position: "bottom-right",
        });

        setBlobData(blob);
        setContextValue((prev) => ({
          ...prev,
          complete: true,
        }));
      } catch (err) {
        if ((err as any).message === "AXIOS_CANCLE") {
          toastWithResponsive("error", "번역이 취소되었습니다.");
        } else {
          toastWithResponsive("error", "번역에 실패했습니다.");
        }
        handleCancle();
        console.error(`translation error - ${err}`);
        // throw new Error(`translation error - ${err}`);
      }
    }
    handleTranslation();

    return () => {
      abortController.abort();
      abortController = new AbortController();
      signal = abortController.signal;
    };
  }, []);

  return (
    <div className={styles["generating-wrap"]}>
      <ExcelFile />
      <div className={styles["progress-wrap"]}>
        <ProgressBar />
      </div>
      <div className="flex gap-[0.8rem] max-w-[30rem]">
        {!contextValue.complete ? (
          <Button variant="cancel" label="취소" onClick={handleCancle} />
        ) : (
          <>
            <Button
              variant="cancel"
              label="처음으로"
              onClick={handleCancle}
              className={"!px-0 !w-[16rem] justify-center"}
            />
            <Button
              variant="download"
              label="다운로드"
              icon="download"
              onClick={handleDownload}
              className={"!px-0 !w-[16rem] justify-center"}
            />
          </>
        )}
      </div>
    </div>
  );
};
