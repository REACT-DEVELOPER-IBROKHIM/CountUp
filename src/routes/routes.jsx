import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

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

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense>
          <Home />
          <Navigate to="/login"/>
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ), 
    },
    {
      path: "dashboard",
      element: (
        <Suspense>
          <Protected/>
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Dashboard/>
            </Suspense>
          ),
          children: [
            {
              path: "",
              element: (
                <Suspense>
                  <Customers/>
                </Suspense>
              ),
            },
            {
              path: "sellers",
              element: (
                <Suspense>
                  <Sellers/>
                </Suspense>
              ),
            },
            {
              path: "products",
              element: (
                <Suspense>
                  <Products/>
                </Suspense>
              ),
            },
            {
              path: "help",
              element: (
                <Suspense>
                  <Help/>
                </Suspense>
              ),
            },
            {
              path: "profile",
              element: (
                <Suspense>
                  <Profile/>
                </Suspense>
              ),
            },
          ]
        }
      ],
    }
  ]);
}

export default RouteController