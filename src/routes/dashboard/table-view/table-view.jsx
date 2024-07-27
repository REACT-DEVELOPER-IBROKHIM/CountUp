import Table from "@/components/table/table";
import { useOutletContext } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal/modal";
import { useState } from "react";
import CreateUser from "@/components/create-user/create-user";
import { createPortal } from "react-dom";

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
  } = useOutletContext();
  return (
    <div>
      <ContentTitle>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {userType === "sellers" ? "Sotuvchilar" : "Mijozlar"}{" "}
            <Badge>{data?.totalCount}</Badge>
          </div>
          <Button onClick={()=> setOpen(true)} className="flex gap-1">
            <Plus size={18} />
            <span className="">Qo'shish</span>
          </Button>
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
      {
        open ? 
       createPortal( <Modal
        open={open}
        setOpen={setOpen}
        title={"Yangi mijoz qo'shish"}
        description={"Lorem ipsum"}
        size="900px"
    >
        <CreateUser setOpen={setOpen} userType={userType} />
    </Modal>,  document.getElementById("modal-controller"))
        :
        <></>
      } 
    </div>
  );
};

export default TableView;
