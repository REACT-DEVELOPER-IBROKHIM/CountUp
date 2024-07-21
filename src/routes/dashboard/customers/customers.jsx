import { SectionTypography as ContentTitle } from "@/utils";
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api";
import { useCallback, useEffect, useState } from "react";

const Customers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetCustomersQuery({ limit, skip: page - 1 });
  const nextPage = useCallback(
    (value) => {
      setPage(value);
      sessionStorage.setItem("customerPagination", value.toString());
    },
    [page]
  );
  useEffect(() => {
    let pagination = sessionStorage.getItem("customerPagination");
    if(pagination){
      setPage(parseInt(pagination))
    }
  }, []);
  const tableHeaders = ["№", "FIO", "Telfon", "Budjet", "Boshqaruv"].map(
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
      <ContentTitle>Customers</ContentTitle>
      <div>
        <Table
          data={data}
          page={page}
          limit={limit}
          nextPage={nextPage}
          isLoading={isLoading}
          tableHeaders={tableHeaders}
          caption="Mijozlarning ma'lumoti"
        />
      </div>
    </div>
  );
};

export default Customers;
