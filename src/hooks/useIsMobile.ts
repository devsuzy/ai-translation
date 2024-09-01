import { checkIsMobile } from "@/utils/isMobile";
import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleIsMobile() {
      setIsMobile(checkIsMobile());
    }

    handleIsMobile();
    window.addEventListener("resize", handleIsMobile);
    return () => window.removeEventListener("resize", handleIsMobile);
  }, []);

  return isMobile;
};
