import { useEffect } from "react";

import { createBrowserRouter, Outlet, RouteObject, RouterProvider, useLocation } from "react-router-dom";
import { pageRouter } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: pageRouter as RouteObject[],
  },
]);

export default App;
