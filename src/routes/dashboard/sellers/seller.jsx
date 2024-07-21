import { useGetSellersQuery } from "@/redux/api/seller-api";
import { SectionTypography as ContentTitle } from "@/utils"
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";

const Sellers = () => {
  const {data, isLoading} = useGetSellersQuery();
  console.log(data)
  const tableHeaders = ["№", "FIO", "Telfon", "Budjet", "Boshqaruv"].map((header, index, arr) => <TableHead className={arr.length - 1 === index ? "text-right" : ""} key={index}>{header}</TableHead>);
  return (
    <div>
      <ContentTitle>Sellers</ContentTitle>
      <div>
        <Table data={data} isLoading={isLoading} tableHeaders={tableHeaders} caption="Sotuvchilarning ma'lumoti"/>
      </div>
    </div>
  )
}

export default Sellers