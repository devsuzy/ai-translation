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
    return contextValue.fileData || [];
  }, [contextValue]);

  const selectAddressArr = contextValue?.selectAddress || [];

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
          // 선택 번역과 기본 번역 분기처리 개선 필요 ....
          if (selectAddressArr.length > 0) {
            setProgressState({
              length: Math.ceil(promises.length),
              count,
            });
          } else {
            setProgressState({
              length: Math.ceil(promises.length * 2),
              count,
            });
          }
        };

        const promises: any[] = [];

        excelData.forEach((dataRow, i) => {
          // 선택 번역과 기본 번역 분기처리 개선 필요 ....
          if (selectAddressArr.length > 0) {
            dataRow.forEach((cell) => {
              if (selectAddressArr.includes(cell.address)) {
                promises.push([
                  {
                    value: cell.value,
                    callback: updateProgress,
                    address: cell.address,
                  },
                ]);
              }
            });
          } else {
            if (i === 0) return;
            promises.push([
              {
                value: dataRow[targetIndexes[0]].value,
                callback: updateProgress,
              },
              {
                value: dataRow[targetIndexes[1]].value,
                callback: updateProgress,
              },
            ]);
          }
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
            ((resultFlat[i] as any).value[0]?.status === "rejected" ||
              (resultFlat[i] as any).value[1]?.status === "rejected")
          ) {
            throw new Error("AXIOS_CANCLE");
          }
        }

        resultFlat.forEach((res, i) => {
          if (res.status === "fulfilled") {
            // 선택 번역과 기본 번역 분기처리 개선 필요 ....
            if (selectAddressArr.length > 0) {
              excelData.forEach((dataRow) => {
                dataRow.forEach((cell) => {
                  if (res.value[0].value.address === cell.address) {
                    cell.value = res.value[0].value.data;
                  }
                });
              });
            } else {
              if (!excelData[i + 1][targetIndexes[2]]) {
                excelData[i + 1][targetIndexes[2]] = {
                  address: "",
                  type: 0,
                  value: "",
                };
              }
              if (!excelData[i + 1][targetIndexes[3]]) {
                excelData[i + 1][targetIndexes[3]] = {
                  address: "",
                  type: 0,
                  value: "",
                };
              }

              excelData[i + 1][targetIndexes[2]].value =
                res.value[0].value.data;
              excelData[i + 1][targetIndexes[3]].value =
                res.value[1].value.data;
            }
          }
        });

        const wb = contextValue.wb;

        if (!wb) return;

        wb.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            if (rowIndex === 1 || !row) return;

            // 선택 번역과 기본 번역 분기처리 개선 필요 ....
            if (selectAddressArr.length === 0) {
              sheet.getRow(rowIndex).getCell(8).value =
                excelData[rowIndex - 1]?.[7].value;
              sheet.getRow(rowIndex).getCell(9).value =
                excelData[rowIndex - 1]?.[8].value;
            }
          });
        });

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
