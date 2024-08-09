import { RouteObject } from "react-router-dom";
import { Word } from "./word";
import { Excel } from "./excel";

type PageRouterItem = Omit<RouteObject, "children"> & {
  title?: string;
  children?: PageRouterItem[];
};

export const pageRouter: PageRouterItem[] = [
  {
    path: "",
    id: "word",
    element: <Word />,
  },
  {
    path: "excel",
    id: "excel",
    element: <Excel />,
  },
];
