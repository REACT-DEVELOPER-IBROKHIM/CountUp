import { lazy } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";

import { Suspense } from "@/utils";

const Home = lazy(() => import("@/routes/home/Home"));
const Login = lazy(() => import("@/routes/auth/Login"));
const Dashboard = lazy(() => import("@/routes/dashboard/Dashboard"));
const Protected = lazy(() => import("@/routes/protected/Protected"));

const Sellers = lazy(() => import("@/routes/dashboard/sellers/seller"));
const Customers = lazy(() => import("@/routes/dashboard/customers/customers"));
const Products = lazy(() => import("@/routes/dashboard/products/products"));
const Profile = lazy(() => import("@/routes/dashboard/profile/profile"));
const Help = lazy(() => import("@/routes/dashboard/help/help"));
const Details = lazy(() => import("@/routes/dashboard/details/details"));
const TableView = lazy(() =>import("@/routes/dashboard/table-view/table-view"));
const Filter = lazy(() => import("@/routes/dashboard/filter/filter"));

const RouteController = () => {
  return (
  <Routes>
    <Route path="" element={<Suspense><Home /><Navigate to="/login" /></Suspense>} />
    <Route path="login" element={<Suspense><Login /></Suspense>} />
    <Route path="dashboard" element={<Suspense><Protected /></Suspense>}>
      <Route path="" element={<Suspense><Dashboard /></Suspense>}>
        <Route path="customers" element={<Suspense><Customers /></Suspense>}>
          <Route path=":filter" element={<Suspense><Filter /></Suspense>} >
            <Route path="" element={<Suspense><TableView /></Suspense>} />
            <Route path="details/:id" element={<Suspense><Details userType="customers" /></Suspense>} />
          </Route>
        </Route>
        
        <Route path="sellers" element={<Suspense><Sellers /></Suspense>}>
          <Route path=":filter" element={<Suspense><Filter /></Suspense>} >
            <Route path="" element={<Suspense><TableView /></Suspense>} />
            <Route path="details/:id" element={<Suspense><Details userType="sellers" /></Suspense>} />
          </Route>
        </Route>
        <Route path="products" element={<Suspense><Products /></Suspense>} />
        <Route path="help" element={<Suspense><Help /></Suspense>} />
        <Route path="profile" element={<Suspense><Profile /></Suspense>} />
      </Route>
    </Route>
  </Routes>)
};

export default RouteController;