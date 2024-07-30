import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";
import { Outlet, useSearchParams } from "react-router-dom";
import { useGetSingleCustomerQuery } from "@/redux/api/customers-api";

const Customers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  useEffect(() => {
    let path = {};
    if (!status) {
      for (let i of searchParams.entries()) {
        let [key, value] = i;
        if (key !== "status") {
          path[key] = value;
        }
      }
      setSearchParams(path);
    } else {
      for (let i of searchParams.entries()) {
        let [key, value] = i;
        path[key] = value;
      }
      setSearchParams({ ...path, status });
      setPage(1)
      sessionStorage.setItem("customerPagination", 1);
    }
  }, [status]);

  useEffect(()=>{
    setStatus(searchParams.get("status") || "")
  }, [searchParams])

  const { data, isLoading, isFetching, isError } = useGetCustomersQuery({
    limit,
    skip: page - 1,
    isArchive: status === "Archive",
    isActive: status !== "Disactive",
  });
  const nextPage = useCallback(
    (value) => {
      setPage(value);
      sessionStorage.setItem("customerPagination", value.toString());
    },
    [page]
  );

  const handleLimit = useCallback(
    (value) => {
      const latestPage = Math.ceil((limit * page) / value);
      setLimit(value);
      setPage(latestPage);
      saveToLocalStorage("limit-customer", value);
      sessionStorage.setItem("customerPagination", latestPage.toString());
    },
    [limit, page]
  );

  useEffect(() => {
    let pagination = sessionStorage.getItem("customerPagination");
    let limit = localStorage.getItem("limit-customer");
    if (pagination) {
      setPage(parseInt(pagination));
    }

    if (limit) {
      setLimit(parseInt(limit));
    }
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, [page, limit]);

  const tableHeaders = ["№", "FIO", "Telefon", "Budjet", "Boshqaruv"].map(
    (header, index, arr) => (
      <TableHead
        className={arr.length - 1 === index ? "text-right" : ""}
        key={index}
      >
        {header}
      </TableHead>
    )
  );

  const contextObject = {
    query: useGetSingleCustomerQuery,
    data,
    tableHeaders,
    isLoading,
    isFetching,
    page,
    nextPage,
    limit,
    handleLimit,
    setStatus,
    status,
    isError,
    userType: "customers",
  };

  return <Outlet context={contextObject} />;
};

export default Customers;
