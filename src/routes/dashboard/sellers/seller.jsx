import { useGetSellersQuery } from "@/redux/api/seller-api";
import { SectionTypography as ContentTitle } from "@/utils";
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/helpers";

const Sellers = () => {
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

  return (
    <div>
      <ContentTitle>Sotuvchilar</ContentTitle>
      <div>
        <Table
          data={data}
          page={page}
          limit={limit}
          handleLimit={handleLimit}
          nextPage={nextPage}
          isLoading={isLoading}
          isFetching={isFetching}
          tableHeaders={tableHeaders}
          caption="Sotuvchilarning ma'lumoti"
        />
      </div>
    </div>
  );
};

export default Sellers;
