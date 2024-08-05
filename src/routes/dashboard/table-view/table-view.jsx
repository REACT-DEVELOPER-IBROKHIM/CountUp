import Table from "@/components/table/table";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal/modal";
import { useState } from "react";
import CreateUser from "@/components/create-user/create-user";
import { createPortal } from "react-dom";
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover" 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

const filters = [
  { title: "Aktiv", value: "" },
  { title: "Arxiv", value: "archive" },
  { title: "O'chirilgan", value: "inactive" },
];

const TableView = () => {
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
 
  const [searchParams, setSearchParams] = useSearchParams("");
  let status = searchParams.get("status") || ""
  
  const [open, setOpen] = useState(false);
  const {
    data,
    limit,
    handleLimit,
    nextPage,
    isLoading,
    isFetching,
    sortingOptions,
    tableHeaders,
    userType,
    isError,
  } = useOutletContext();

  const handleChangleParams = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("skip", 1)
    if (value === "") {
      params.delete("status");
      params.delete("skip")
    } else {
      params.set("status", value);
    }
    setSearchParams(params);
  };

  return (
    <div>
      <ContentTitle>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {userType === "sellers" ? "Sotuvchilar" : "Mijozlar"}{" "}
            {!isFetching && !isError && <Badge>{data?.totalCount}</Badge>}
          </div>
          <Button onClick={() => setOpen(true)} className="flex gap-1">
            <Plus size={18} />
            <span className="">Qo'shish</span>
          </Button>
        </div>
        <div className="flex items-center mt-4  gap-8">
        <div className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid max-w-[400px] grid-cols-3 sticky top-0">
          {filters?.map((item) => (
            <button
              key={item.value}
              disabled={status === item.value}
              onClick={() => handleChangleParams(item.value)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
                status === item.value ? "bg-white shadow" : ""
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className={cn("grid gap-2", userType === "sellers" ? "grid-cols-3" : "grid-cols-4")}>
      <Popover >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
        </div>
      </ContentTitle>
      <Table
        data={data}
        limit={limit}
        handleLimit={handleLimit}
        nextPage={nextPage}
        sortingOptions={sortingOptions}
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
            description={""}
            size="800px"
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
