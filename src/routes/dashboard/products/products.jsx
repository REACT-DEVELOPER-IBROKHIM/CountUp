import { saveToLocalStorage } from "@/helpers";
import { useGetProductsQuery, useGetSingleProductQuery } from "@/redux/api/products-api";
import { SectionTypography as ContentTitle } from "@/utils";
import { TableHead } from "@/components/ui/table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ProductTable from "@/components/product-table/product-table";

const Products = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  let { data, isLoading, isFetching } = useGetProductsQuery({
    limit,
    skip: page - 1,
  });
  const nextPage = useCallback(
    (value) => {
      setPage(value);
      sessionStorage.setItem("productPagination", value.toString());
    },
    [page]
  );
  const handleLimit = useCallback(
    (value) => {
      const latestPage = Math.ceil((limit * page) / value);
      setLimit(value);
      setPage(latestPage);
      saveToLocalStorage("limit-product", value);
      sessionStorage.setItem("productPagination", latestPage.toString());
    },
    [limit, page]
  );

  useEffect(() => {
    let pagination = sessionStorage.getItem("productPagination");
    let limit = localStorage.getItem("limit-product");
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


  const tableHeaders = ["№", "Nomi", "Miqdori", "Narxi", "Jami"].map(
    (header, index, arr) => (
      <TableHead
        key={index}
      >
        {header}
      </TableHead>
    )
  );

  const contextObject = {
    query: useGetSingleProductQuery,
    data,
    tableHeaders,
    isLoading,
    isFetching,
    page,
    nextPage,
    limit,
    handleLimit,
    userType: "products"
  }
  return (
    <div>
      <ProductTable {...contextObject}/>
    </div>
  );
};

export default Products;
