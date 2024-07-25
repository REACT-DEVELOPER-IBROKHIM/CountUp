import Table from "@/components/table/table";
import { useOutletContext } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";
import { Badge } from "@/components/ui/badge";

const TableView = () => {
    const [,data, tableHeaders, isLoading, isFetching, page, nextPage, limit, handleLimit, userType] = useOutletContext();
    console.log(data)
    console
    return (
        <div>
            <ContentTitle>
                    <div className="flex items-center gap-4">
                        { userType === "sellers" ? "Sotuvchilar" : "Mijozlar"} <Badge>{data?.totalCount}</Badge>
                    </div>
            </ContentTitle>
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