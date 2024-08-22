import Arrow from "@/assets/images/icons/ic-arrow.svg";
import ArrowRight from "@/assets/images/icons/ic-arrow-right.svg";
import Check from "@/assets/images/icons/ic-check.svg";
import Close from "@/assets/images/icons/ic-close.svg";
import Copy from "@/assets/images/icons/ic-copy.svg";
import Download from "@/assets/images/icons/ic-download.svg";
import Reverse from "@/assets/images/icons/ic-reverse.svg";
import Warning from "@/assets/images/icons/ic-warning.svg";
import Translate from "@/assets/images/icons/ic-translate.svg";
import Sheet from "@/assets/images/icons/ic-sheet.svg";

interface CustomIconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  iconType:
    | "arrow"
    | "arrowRight"
    | "check"
    | "close"
    | "copy"
    | "download"
    | "reverse"
    | "warning"
    | "translate"
    | "sheet";
  fill?: string;
  stroke?: string;
  size: "s" | "m" | "l";
  className?: any;
}

const IconSize = {
  s: 16,
  m: 24,
  l: 32,
};

const IconsTypes = {
  arrow: Arrow,
  arrowRight: ArrowRight,
  check: Check,
  close: Close,
  copy: Copy,
  download: Download,
  reverse: Reverse,
  warning: Warning,
  translate: Translate,
  sheet: Sheet,
};

export const CustomIcon = ({ iconType, size, ...props }: CustomIconProps) => {
  const Icon = IconsTypes[iconType];

  return (
    <>
      <Icon width={IconSize[size]} height={IconSize[size]} {...props} />
    </>
  );
};
