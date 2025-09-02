import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Cars from "@/pages/Cars";
import CarDetail from "@/pages/CarDetail";
import Request from "@/pages/Request";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import LeasingInfos  from "@/pages/LeasingInfos";
import FAQ from "@/pages/FAQ";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <Cars /> },
      { path: "leasing-info", element: <LeasingInfos  />},
      { path: "cars/:slug", element: <CarDetail /> },
      { path: "request", element: <Request /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ />},
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
