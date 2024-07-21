import { SectionTypography as ContentTitle } from "@/utils"
import Table from "@/components/table/table";
import { TableHead } from "@/components/ui/table";
import { useGetCustomersQuery } from "@/redux/api/customers-api"


const Customers = () => {
  const {data, isLoading} = useGetCustomersQuery();
  console.log(data)
  const tableHeaders = ["No", "Name", "Phone", "Budget", "Actions"].map((header, index) => <TableHead className={header === "Actions" ? "text-right" : ""} key={index}>{header}</TableHead>);
  return (
    <div>
      <ContentTitle>Customers</ContentTitle>
      <div>
        <Table data={data} isLoading={isLoading} tableHeaders={tableHeaders}/>
      </div>
    </div>
  )
}

export default Customers