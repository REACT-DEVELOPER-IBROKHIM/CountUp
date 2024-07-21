import { SectionTypography as ContentTitle } from "@/utils"
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api"


const Customers = () => {
  const {data, isLoading} = useGetCustomersQuery();
  console.log(data)
  const tableHeaders = ["№", "FIO", "Telfon", "Budjet", "Boshqaruv"].map((header, index, arr) => <TableHead className={arr.length - 1 === index ? "text-right" : ""} key={index}>{header}</TableHead>);
  return (
    <div>
      <ContentTitle>Customers</ContentTitle>
      <div>
        <Table data={data} isLoading={isLoading} tableHeaders={tableHeaders} caption="Mijozlarning ma'lumoti"/>
      </div>
    </div>
  )
}

export default Customers