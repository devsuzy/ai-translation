import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import ExcelJS from "exceljs";
import { useExcelState } from "@/pages/excel";
import { showToast } from "@/utils/toast";
import Image from "next/image";
import { basePath } from "@/config";

export const Start = () => {
  const [contextValue, setContextValue] = useExcelState();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const activateDropzone = useCallback(() => {
    dropzoneRef.current?.classList.add(styles["is-draggable"]);
  }, []);

  const inactiveDropzone = useCallback(() => {
    dropzoneRef.current?.classList.remove(styles["is-draggable"]);
  }, []);

  const setFileData = useCallback(
    (file: File) => {
      const rowMap = new Map();
      if (file!.name.split(".").at(-1) === "xlsx") {
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
                  rowMap.set(rowIndex, row.model);
                });
              });

              if (rowMap.size > 0) {
                const fileData = [...rowMap].map(([_, v], i) => {
                  return v.cells;
                });

                setContextValue({
                  step: "Upload",
                  fileData: fileData,
                  fileInfo: file,
                  wb: workbook,
                });
              }
            })
            .catch((err) => {
              throw new Error(`upload error - ${err}`);
            });
        };
      } else {
        showToast("error", <p>업로드 가능한 파일 형식이 아닙니다.</p>);
        inactiveDropzone();
      }
    },
    [setContextValue, inactiveDropzone]
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileData(file);
      }
    },
    [setFileData]
  );

  const handleDropOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.target === dropzoneRef.current) {
        activateDropzone();
      }
    },
    [activateDropzone]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      inactiveDropzone();
    },
    [inactiveDropzone]
  );

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 1) {
        showToast("error", <p>한 개의 파일만 업로드 해주세요.</p>);
        inactiveDropzone();
        return;
      }
      const file = e.dataTransfer.files[0];
      setFileData(file);
    },
    [inactiveDropzone, setFileData]
  );

  return (
    <div
      className={styles["start-wrap"]}
      onDragOver={handleDropOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
      ref={dropzoneRef}
    >
      <div>
        <Image
          src={`${basePath}/images/ic-excel_empty.png`}
          width={128}
          height={118}
          alt=""
          className="m-auto"
        />
        <p className="lg:hidden text-[1.8rem] text-center font-semibold pt-6">
          내 PC에서 파일을 첨부해주세요.
        </p>
        <p className="hidden lg:block text-[1.8rem] text-center font-semibold pt-6">
          <b className="text-[2rem] text-primary">내 PC에서 첨부</b>
          하거나 문서를 드래그하여 넣어주세요.
        </p>
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
        <input
          type="file"
          accept=".xlsx"
          hidden
          onChange={handleFileUpload}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
