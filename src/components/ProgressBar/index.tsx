import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useExcelState } from "@/pages/excel";
import Lottie from "react-lottie";
import finishAnimationData from "@/assets/lottie/finish_loader_.json";
import particleAnimationData from "@/assets/lottie/particle.json";
import DelayComponent from "../Delay";

export const ProgressBar = () => {
  const [contextValue] = useExcelState();
  const [progress, setProgress] = useState(20);
  const progressRef = useRef<Lottie>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    console.log(progressRef.current);
    const frames = progressRef.current?.anim.totalFrames;

    console.log(frames);
  }, []);

  if (!contextValue.complete)
    return (
      <>
        <div className="relative w-[30rem]">
          <Lottie
            options={{
              loop: false,
              autoplay: false,
              animationData: finishAnimationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isClickToPauseDisabled={true}
            width={100}
            height={100}
            ref={progressRef}
          />
        </div>
        <p className={styles["progress-text"]}>생성중...</p>
      </>
    );

  if (contextValue.complete)
    return (
      <>
        <div className="relative w-[30rem]">
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: finishAnimationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isClickToPauseDisabled={true}
            width={100}
            height={100}
          />
          <div className="absolute left-[-10rem] top-[-10rem] pointer-events-none">
            <DelayComponent delay={2000}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: particleAnimationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                isClickToPauseDisabled={true}
                width={200}
                height={200}
              />
            </DelayComponent>
          </div>
          <div className="absolute right-[-5rem] top-[-12rem] pointer-events-none">
            <DelayComponent delay={2100}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: particleAnimationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                isClickToPauseDisabled={true}
                width={200}
                height={200}
              />
            </DelayComponent>
          </div>
          <div className="absolute right-[0rem] bottom-[-20rem] pointer-events-none">
            <DelayComponent delay={2200}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: particleAnimationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                isClickToPauseDisabled={true}
                width={200}
                height={200}
              />
            </DelayComponent>
          </div>
        </div>
        <p className={styles["progress-text"]}>생성 작업이 완료되었습니다.</p>
      </>
    );
};
