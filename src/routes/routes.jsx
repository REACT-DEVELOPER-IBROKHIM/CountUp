import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
const DetailsPayment = lazy(() => import("@/routes/dashboard/details/payment-history/payment-history"));
const DetailsProfile = lazy(() => import("@/routes/dashboard/details/profile/profile"));
const DetailsProducts = lazy(() => import("@/routes/dashboard/details/products/products"));

const RouteController = () => {
  const auth = useSelector(state => state.auth);
  return (
  <Routes>
    <Route path="" element={<Suspense><Home /></Suspense>} />
    <Route path="login" element={ auth.token ? <Navigate to="/dashboard" /> : <Suspense><Login /></Suspense>} />
    <Route path="dashboard" element={<Suspense><Protected /></Suspense>}>
      <Route path="" element={<Suspense><Dashboard /></Suspense>}>
        <Route path="customers" element={<Suspense><Customers /></Suspense>}>
            <Route path="" element={<Suspense><TableView /></Suspense>} />
            <Route path="details/:id" element={<Suspense><Details userType="customers" /></Suspense>}>
                <Route path="d-products" element={<Suspense><DetailsProducts /></Suspense>} />
                <Route path="d-payments-history" element={<Suspense><DetailsPayment /></Suspense>} />
                <Route path="d-profile" element={<Suspense><DetailsProfile /></Suspense>} />
            </Route>
        </Route>
        <Route path="sellers" element={<Suspense><Sellers /></Suspense>}>
            <Route path="" element={<Suspense><TableView /></Suspense>} />
            <Route path="details/:id" element={<Suspense><Details userType="sellers" /></Suspense>}>
                <Route path="d-products" element={<Suspense><DetailsProducts /></Suspense>} />
                <Route path="d-payments-history" element={<Suspense><DetailsPayment /></Suspense>} />
                <Route path="d-profile" element={<Suspense><DetailsProfile /></Suspense>} />
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