import { useGetSellersQuery } from "@/redux/api/seller-api";
import { TableHead } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {useGetSingleSellerQuery} from "@/redux/api/seller-api";


const Sellers = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching } = useGetSellersQuery({
    limit,
    skip: page - 1,
  });
  const nextPage = useCallback(
    (value) => {
      setPage(value);
      sessionStorage.setItem("sellerPagination", value.toString());
    },
    [page]
  );
  useEffect(() => {
    let pagination = sessionStorage.getItem("sellerPagination");
    let limit = localStorage.getItem("limit-seller");
    if (pagination) {
      setPage(parseInt(pagination));
    }

    if(limit){
      setLimit(parseInt(limit));
    }
  }, []);

  const handleLimit = useCallback(
    (value) => {
      const latestPage = Math.ceil(limit * page / value)
      setLimit(value);
      setPage(latestPage)
      saveToLocalStorage("limit-seller", value);
      sessionStorage.setItem("sellerPagination", latestPage.toString());
    },
    [limit]
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, [page, limit]);




  const contextObject = {
    query: useGetSingleSellerQuery,
    data,
    tableHeaders: ["№", "FIO", "Telfon", "Budjet", "Boshqaruv"],
    isLoading,
    isFetching,
    page,
    nextPage,
    limit,
    handleLimit,
    userType: "sellers"
  };

  return (<Outlet context={contextObject} />);
};

export default Sellers;
