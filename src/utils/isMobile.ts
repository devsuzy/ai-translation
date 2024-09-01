export const checkIsMobile = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return mobile || ("ontouchstart" in window && window.innerWidth <= 1024);
};
