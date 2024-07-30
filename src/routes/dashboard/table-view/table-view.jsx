import Table from "@/components/table/table";
import { useOutletContext } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal/modal";
import {  useState } from "react";
import CreateUser from "@/components/create-user/create-user";
import { createPortal } from "react-dom";

const filters = [
  {title: "Aktiv", value:""},
  {title: "Arxiv", value:"Archive"},
  {title: "O'chirilgan", value:"Disactive"},
]

const TableView = () => {
  const [open, setOpen] = useState(false);
  const {
    data,
    page,
    limit,
    handleLimit,
    nextPage,
    isLoading,
    isFetching,
    tableHeaders,
    userType,
    status,
    setStatus,
    isError,
  } = useOutletContext();
  return (
    <div>
      <ContentTitle>
       
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {userType === "sellers" ? "Sotuvchilar" : "Mijozlar"}{" "}
            {!isFetching && !isError  && <Badge>{data?.totalCount}</Badge>}
          </div>
          <Button onClick={() => setOpen(true)} className="flex gap-1">
            <Plus size={18} />
            <span className="">Qo'shish</span>
          </Button>
        </div>
        <div className="h-10 mt-4 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid max-w-[400px] grid-cols-3">
          {
            filters?.map((item) => (
              <button key={item.value} onClick={()=> setStatus(item.value)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${status === item.value ? "bg-white shadow" : ""}`}>{item.title}</button>
            ))
          }
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
        isError={isError}
        caption="Mijozlarning ma'lumoti"
      />
      {open ? (
        createPortal(
          <Modal
            open={open}
            setOpen={setOpen}
            title={"Yangi mijoz qo'shish"}
            description={"Lorem ipsum"}
            size="1000px"
          >
            <CreateUser setOpen={setOpen} userType={userType} />
          </Modal>,
          document.getElementById("modal-controller")
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableView;
