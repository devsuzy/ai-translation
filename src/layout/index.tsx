import Header from "@/components/Header";
import { RecoilRoot } from "recoil";

interface Props {
  children: any;
}

export default function Layout(props: Props) {
  return (
    <RecoilRoot>
      <Header />
      <main>{props.children}</main>
    </RecoilRoot>
  );
}
