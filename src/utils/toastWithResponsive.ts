/* eslint-disable react-hooks/rules-of-hooks */
import { useIsMobile } from "@/hooks/useIsMobile";
import { checkIsMobile } from "@/utils/isMobile";
import { showToast } from "@/utils/toast";
import { ToastPosition } from "react-toastify";

export const toastWithResponsive: typeof showToast = (
  type,
  content,
  options
) => {
  const isMobile = checkIsMobile();
  const isPosition = options?.position;
  let responsiveOption = {
    ...options,
  };
  if (isMobile && isPosition !== undefined) {
    responsiveOption = {
      ...options,
      position: isPosition.replace("bottom", "top") as ToastPosition,
      autoClose: options?.autoClose ? options?.autoClose : 2000,
    };
  }

  return showToast(type, content, responsiveOption);
};
