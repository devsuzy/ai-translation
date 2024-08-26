import { useEffect, useState } from "react";

export default function DelayComponent({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, delay);
  }, []);

  if (!visible) return null;

  return children;
}
