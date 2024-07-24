import Table from "@/components/table/table";
import { useOutletContext } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";


const TableView = () => {
    const [ ,data, tableHeaders, isLoading, isFetching, page, nextPage, limit, handleLimit, {userType}] = useOutletContext()
    return (
        <div>
            <ContentTitle>{ userType === "sellers" ? "Sotuvchilar" : "Mijozlar"}</ContentTitle>
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
  )
}

export default TableView