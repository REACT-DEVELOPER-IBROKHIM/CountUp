import { useGetCustomersQuery } from "@/redux/api/customers-api";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";
import { Outlet, useSearchParams } from "react-router-dom";
import { useGetSingleCustomerQuery } from "@/redux/api/customers-api";

const Customers = () => {
  const [limit, setLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams("");
  const skip = +searchParams.get("skip") || 1;
  const status = searchParams.get("status");

  const { data, isLoading, isFetching, isError } = useGetCustomersQuery({
    limit,
    skip: skip - 1,
    isArchive: status === "archive",
    isActive: status !== "inactive",
  });

  const nextPage = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams);
      if (+value === 1) {
        params.delete("skip");
      } else {
        params.set("skip", value);
      }
      setSearchParams(params);
    },
    [searchParams]
  );

  const handleLimit = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams);
      const latestPage = Math.ceil((limit * skip) / value);
      params.set("skip", latestPage);
      setLimit(value);
      saveToLocalStorage("limit-customer", value);
      setSearchParams(params);
    },
    [limit]
  );

  useEffect(() => {
    let limit = localStorage.getItem("limit-customer");
    if (limit) {
      setLimit(parseInt(limit));
    }
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, [limit, skip]);

  const tableHeaders = [
    {
      title: "№",
      dataIndex: "id",  
    },
    {
      title: "FIO",
      dataIndex: "fname",
    },
    {
      title: "Telfon",
      dataIndex: "phone_primary",
    },
    {
      title: "Budjet",
      dataIndex: "budget",
    },
    {
      title: "Boshqaruv",
      dataIndex: "isArchive",
    },
  ];

  const contextObject = {
    query: useGetSingleCustomerQuery,
    data,
    tableHeaders,
    sortingOptions: ["fname", "budget"],
    isLoading,
    isFetching,
    nextPage,
    limit,
    handleLimit,
    isError,
    userType: "customers",
  };

  return <Outlet context={contextObject} />;
};

export default Customers;
