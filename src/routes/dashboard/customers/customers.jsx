import { SectionTypography as ContentTitle } from "@/utils";
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";

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
  
  return (
    <div>
      <ContentTitle>Xaridorlar</ContentTitle>
      <div>
        <Table
          data={data}
          page={page}
          limit={limit}
          handleLimit={handleLimit}
          nextPage={nextPage}
          isFetching={isFetching}
          isLoading={isLoading}
          tableHeaders={tableHeaders}
          caption="Mijozlarning ma'lumoti"
        />
      </div>
    </div>
  );
};

export default Customers;

{/*
  page: 9,
  limit: 20=>50,
  total:250,
  current: 180-200
  goal: 150-200
*/}