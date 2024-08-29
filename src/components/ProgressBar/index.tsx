import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useExcelState } from "@/pages/excel";
import Lottie from "lottie-react";
import finishAnimationData from "@/assets/lottie/finish_loader_.json";
import particleAnimationData from "@/assets/lottie/particle.json";
import particleBlueAnimationData from "@/assets/lottie/particle_blue.json";
import particleYellowAnimationData from "@/assets/lottie/particle_yellow.json";
import DelayComponent from "../Delay";
import { useRecoilValue } from "recoil";
import { progressState } from "@/stores/excel";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressBar = () => {
  const [contextValue] = useExcelState();
  const progressStateValue = useRecoilValue(progressState);

  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function updateProgressBar() {
      let updateProgress = progress;
      let increment = 1;
      const intervalDuration = 100;

      intervalRef.current = setInterval(() => {
        if (updateProgress >= 50) {
          increment *= 0.98;
        }

        if (updateProgress >= 99.9) {
          clearInterval(intervalRef.current);
        } else {
          updateProgress += increment;

          if (updateProgress > 99.9) updateProgress = 99.9;

          setProgress(updateProgress);
        }
      }, intervalDuration);
    }

    // updateProgressBar();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progressStateValue.length === 0) return;
    if (progressStateValue.length === progressStateValue.count) {
      // clearInterval(intervalRef.current);
      setProgress(100);
      return;
    }
    setProgress((progressStateValue.count / progressStateValue.length) * 100);
  }, [progressStateValue]);

  if (!contextValue.complete)
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-[10rem] h-[10rem]">
            <CircularProgressbar
              className="overflow-visible"
              strokeWidth={18}
              background={true}
              backgroundPadding={-18}
              styles={{
                root: {
                  width: 76,
                  height: 76,
                },
                path: {
                  stroke: "#deecff",
                },
                trail: {
                  stroke: "transparent",
                },
                background: {
                  fill: "#228dfd",
                },
                text: {
                  fill: "#fff",
                  fontSize: 22,
                  fontWeight: "bold",
                },
              }}
              value={progress}
              text={`${progress.toFixed(1)}%`}
            />
          </div>
          <p className={styles["progress-text"]}>생성중...</p>
        </div>
      </>
    );

  if (contextValue.complete)
    return (
      <>
        <div className="relative w-[30rem]">
          <Lottie
            className="w-[10rem] h-[10rem] mx-auto"
            loop={false}
            animationData={finishAnimationData}
          />
          <div className="absolute left-[-10rem] top-[-10rem] pointer-events-none">
            <DelayComponent delay={2000}>
              <Lottie
                className="w-[20rem] h-[20rem]"
                loop={true}
                autoplay={true}
                animationData={particleAnimationData}
              />
            </DelayComponent>
          </div>
          <div className="absolute right-[-5rem] top-[-12rem] pointer-events-none">
            <DelayComponent delay={2100}>
              <Lottie
                className="w-[20rem] h-[20rem]"
                loop={true}
                autoplay={true}
                animationData={particleBlueAnimationData}
              />
            </DelayComponent>
          </div>
          <div className="absolute right-[0rem] bottom-[-20rem] pointer-events-none">
            <DelayComponent delay={2200}>
              <Lottie
                className="w-[20rem] h-[20rem]"
                loop={true}
                autoplay={true}
                animationData={particleYellowAnimationData}
              />
            </DelayComponent>
          </div>
        </div>
        <p className={styles["progress-text"]}>생성 작업이 완료되었습니다.</p>
      </>
    );
};
