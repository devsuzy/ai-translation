import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Default() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/excel");
  });
  return null;
}
