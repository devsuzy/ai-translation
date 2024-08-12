interface Props {
  children: any;
}

export default function Layout(props: Props) {
  return <main className={`w-full h-full`}>{props.children}</main>;
}
