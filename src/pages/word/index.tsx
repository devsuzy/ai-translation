import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Input, LangBar, Output } from "../../components/Word";
import styles from "./styles.module.scss";
import { progressState } from "@/stores/excel";
import { useRecoilValue } from "recoil";
import Head from "next/head";

export default function Word() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    setDesktop(isDesktop);
  }, [isDesktop]);

  return (
    <>
      <Head>
        <title>단어번역 | AI Translation</title>
      </Head>
      <div className={styles["word-wrap"]}>
        <LangBar />
        <Input desktop={desktop} />
        <Output desktop={desktop} />
      </div>
    </>
  );
}
