import { useGetSellersQuery } from "@/redux/api/seller-api";
import { SectionTypography as ContentTitle } from "@/utils";
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";

const Sellers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const { data, isLoading } = useGetSellersQuery({ limit, skip: page - 1 });
  const nextPage = useCallback(
    (value) => {
      setPage(value);
      sessionStorage.setItem("sellerPagination", value.toString());
    },
    [page]
  );
  useEffect(() => {
    let pagination = sessionStorage.getItem("sellerPagination");
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
      <ContentTitle>Sellers</ContentTitle>
      <div>
        <Table
          data={data}
          page={page}
          limit={limit}
          nextPage={nextPage}
          isLoading={isLoading}
          tableHeaders={tableHeaders}
          caption="Sotuvchilarning ma'lumoti"
        />
      </div>
    </div>
  );
};

export default Sellers;
