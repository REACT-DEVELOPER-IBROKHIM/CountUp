import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PhoneOutgoing, Pin, PinOff } from "lucide-react";
import { Loading } from "@/utils";
import { Fragment, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { usePinCustomerMutation } from "@/redux/api/customers-api";
import { usePinSellersMutation } from "@/redux/api/seller-api";
import Pagination from '@mui/material/Pagination';


function TableComponent({ data, tableHeaders, isLoading, caption, page, nextPage, limit }) {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[2];
  const [pinCutomer, { isLoading: pinCustomerLoading }] =
    usePinCustomerMutation();
  const [pinSeller, { isLoading: pinSellerLoading }] = usePinSellersMutation();
  const handlePinCustomer = (customer) => {
    if (pathname === "sellers") {
      pinSeller({ body: customer, _id: customer._id });
    } else {
      pinCutomer({ body: customer, _id: customer._id });
    }
  };
  const total = useMemo(() => Math.ceil(data?.totalCount / limit) || 0, [data?.totalCount]);
  return (
    <Table className="w-full shadow">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>{tableHeaders}</TableRow>
      </TableHeader>
      <TableBody className="relative">
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={tableHeaders.length}>
              <div className="h-[500px]">
                <Loading />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          data?.innerData.map((user, index) => (
            <Fragment key={user._id}>
              <TableRow>
                <TableCell className="font-medium ">{index + 1}</TableCell>
                <TableCell>
                  <p>{user.fname + " " + user.lname}</p>
                  <p className="text-sm text-slate-500">{user.address}</p>
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${user.phone_primary}`}
                    className="flex items-center gap-2"
                  >
                    <span className="p-2 cursor-pointer active:bg-slate-100 rounded-full inline-block">
                      <PhoneOutgoing size={18} className="text-green-700" />
                    </span>
                    {user.phone_primary}{" "}
                  </a>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      "font-bold " +
                      (user.budget > 0
                        ? "text-black"
                        : user.budget === 0
                        ? "text-slate-500"
                        : "text-red-500")
                    }
                  >
                    {user?.budget.fprice()} UZS
                  </span>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <div
                    className="p-2 cursor-pointer active:bg-slate-100 rounded-full"
                    onDoubleClick={() => handlePinCustomer(user)}
                  >
                    {user.pin ? (
                      <PinOff size={18} className="rotate-[30deg]" />
                    ) : (
                      <Pin size={18} className="rotate-[30deg]" />
                    )}
                  </div>
                  <div className="p-2 cursor-pointer active:bg-slate-100 rounded-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <EllipsisVertical />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-md cursor-pointer">
                          Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-md cursor-pointer">
                          Arxivlash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button>To'lov</Button>
                </TableCell>
              </TableRow>
            </Fragment>
          ))
        )}
        <>
          {pinCustomerLoading || pinSellerLoading ? (
            <div className="h-full w-full bg-[#ffffffa2] backdrop-blur-[3px] absolute top-0 left-0">
              <div className="w-full min-h-[500px] flex items-center justify-center ">
                <Loading />
              </div>
            </div>
          ) : null}
        </>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={tableHeaders.length}>
          <div className="flex justify-end">
          <Pagination count={total} page={page} 
          onChange={(_, value) => nextPage(value)} 
          />
          </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableComponent;
