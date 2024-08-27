import { basePath } from "@/config";
import Image from "next/image";

export default function BackgroundEffect() {
  return (
    <div className="fixed left-0 top-0 w-full h-full z-[-1]">
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(9,122,255,0.4)] mix-blend-lighten z-[2]"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-white/40 backdrop-blur-[16px] mix-blend-lighten z-[1]"></div>
      <div className="absolute left-1/2 bottom-[10%] w-[137.7rem] h-[54.8rem] -translate-x-1/2 z-10">
        <Image
          src={`${basePath}/video/video_mask.svg`}
          alt=""
          width={1377}
          height={548}
          className="absolute left-0 top-0 w-full h-full"
        />
        <Image
          src={`${basePath}/video/video_mask.svg`}
          alt=""
          width={1377}
          height={548}
          className="absolute left-0 top-0 w-full h-full"
        />
        <Image
          src={`${basePath}/video/video_mask.svg`}
          alt=""
          width={1377}
          height={548}
          className="absolute left-0 top-0 w-full h-full"
        />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 w-full h-full object-cover"
      >
        <source
          src={`${basePath}/video/background_video.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
