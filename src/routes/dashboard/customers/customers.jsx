import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";
import { Outlet } from "react-router-dom";
import {useGetSingleCustomerQuery} from "@/redux/api/customers-api";

const Customers = () => {  
  const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isLoading, isFetching } = useGetCustomersQuery({ limit, skip: page - 1 });
    const nextPage = useCallback(
      (value) => {
        setPage(value);
        sessionStorage.setItem("customerPagination", value.toString());
      },
      [page]
    );
  
    const handleLimit = useCallback( (value) => {
      const latestPage = Math.ceil(limit * page / value);
      setLimit(value);
      setPage(latestPage)
      saveToLocalStorage("limit-customer", value)
      sessionStorage.setItem("customerPagination", latestPage.toString());
    }, [limit, page])
  
    useEffect(() => {
      let pagination = sessionStorage.getItem("customerPagination");
      let limit = localStorage.getItem("limit-customer");
      if(pagination){
        setPage(parseInt(pagination))
      }
  
      if(limit){
        setLimit(parseInt(limit));
      }
    }, []);
  
    useEffect(() => {
        scrollTo(0,0)
    }, [page, limit])
  
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
  return (<Outlet context={[{query: useGetSingleCustomerQuery}, data, tableHeaders, isLoading, isFetching, page, nextPage, limit, handleLimit, {userType: "customers"}]} />);
};

export default Customers;