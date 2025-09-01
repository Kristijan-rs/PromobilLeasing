import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Cars from "@/pages/Cars";
import CarDetail from "@/pages/CarDetail";
import Request from "@/pages/Request";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <Cars /> },
      { path: "about", element: <About />},
      { path: "cars/:slug", element: <CarDetail /> },
      { path: "request", element: <Request /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
