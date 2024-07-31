import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  PhoneOutgoing,
  Pin,
  CircleDollarSign,
} from "lucide-react";
import { Loading } from "@/utils";
import { Fragment, useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  usePinCustomerMutation,
  useUpdateCustomerMutation,
} from "@/redux/api/customers-api";
import {
  usePinSellersMutation,
  useUpdateSellersMutation,
} from "@/redux/api/seller-api";
import { useGetProfileQuery } from "@/redux/api/profile-api";
import Modal from "@/components/modal/modal";
import PaymentForm from "@/components/payment-form/payment-form";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { createPortal } from "react-dom";
import Dropdown from "../dropdown/dropdown";
import Empty from "../empty/empty";

function TableComponent({
  data,
  tableHeaders,
  isLoading,
  caption,
  isFetching,
  nextPage,
  limit,
  handleLimit,
  isError,
}) {
  const [pinCutomer, { isLoading: pinCustomerLoading }] =
    usePinCustomerMutation();
  const [pinSeller, { isLoading: pinSellerLoading }] = usePinSellersMutation();
  const [updateCustomer, { isLoading: updateCustomerLoading }] =
    useUpdateCustomerMutation();
  const [updateSeller, { isLoading: updateSellerLoading }] =
    useUpdateSellersMutation();
  const { data: profile } = useGetProfileQuery();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");
  const skip = +searchParams.get("skip") || 1 
  const today = profile?.innerData?.date.split("T")[0];
  let { pathname } = useLocation();
  
  let userType = useMemo(() => pathname.split("/")[2], [pathname]);
  const total = useMemo(
    () => Math.ceil(data?.totalCount / limit) || 0,
    [data?.totalCount, limit]
  );

  const handlePin = (user) => {
    switch (userType) {
      case "customers":
        pinCutomer({ body: user, _id: user._id });
        break;
      case "sellers":
        pinSeller({ body: user, _id: user._id });
        break;
    }
  };

  const handleArchive = (user) => {
    console.log(user);
    switch (userType) {
      case "customers":
        updateCustomer({body: {isArchive: !user.isArchive}, _id: user._id});
        break;
      case "sellers":
        updateSeller({body: {isArchive: !user.isArchive}, _id: user._id});
        break;
    }
  };

  return (
    <Table className="w-full shadow">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>{tableHeaders.map(
        (header, index, arr) => (
          <TableHead
            className={arr.length - 1 === index ? "text-right" : ""}
            key={index}
          >
          {header}
        </TableHead>
      )
    )}</TableRow>
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
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={tableHeaders.length}>
              <Empty />
            </TableCell>
          </TableRow>
        ) : (
          data?.innerData.map((user, index) => (
            <Fragment key={user._id}>
              <TableRow>
                <TableCell className="font-medium">
                <div className="flex gap-1">
                  {index + 1} 
                  {/* TODO: user index */}
                  {user.pin && <Pin size={14} className="rotate-[30deg] mt-[-5px] fill-black" />}
                </div>
                </TableCell>
                <TableCell>
                  <Link to={`details/${user._id}/d-products`}>
                    <p>{user.fname + " " + user.lname}</p>
                    <p className="text-sm text-slate-500">{user.address}</p>
                  </Link>
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
                    {user?.budget.fprice()}
                  </span>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  {user?.isPaidToday.split("T")[0] === today && (
                    <div>
                      <CircleDollarSign />
                    </div>
                  )}
                  <div className="p-2 cursor-pointer active:bg-slate-100 rounded-full">
                    <Dropdown trigger={<EllipsisVertical />} data={user} menuitems={[user?.pin ? "Unpin" : "Pin", "Tahrirlash", user?.isArchive ? "Arxivdan chiqarish" : "Arxivlash"]} menuactions={[() => handlePin(user), , () => handleArchive(user)]}/>
                  </div>
                  <Button
                    onClick={() => {
                      setUser(user);
                      setOpen(true);
                    }}
                  >
                    To'lov
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          ))
        )}
        {user &&
          createPortal(
            <Modal
              open={open}
              setOpen={setOpen}
              title={`${
                userType === "sellers" ? "Sotuvchi" : "Mijoz"
              } uchun to'lov`}
              description={`To'lov ${user.fname} ${user.lname} uchun`}
            >
              <PaymentForm setOpen={setOpen} user={user} userType={userType} />
            </Modal>,
            document.getElementById("modal-controller")
          )}
        <TableRow>
          <TableCell colSpan={tableHeaders.length}>
            {pinCustomerLoading ||
            pinSellerLoading ||
            updateCustomerLoading ||
            updateSellerLoading ||
            (isFetching && !isLoading) ? (
              <div className="h-full w-full bg-[#ffffffa2] backdrop-blur-[3px] absolute top-0 left-0">
                <div className="w-full min-h-[500px] flex items-center justify-center ">
                  <Loading />
                </div>
              </div>
            ) : null}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={tableHeaders.length}>
            <div className="flex justify-end items-center gap-5">
              <Pagination
                count={isError ? 1 : total}
                page={skip}
                onChange={(_, value) => nextPage(value)}
              />
              <Select disabled={isError} onValueChange={(l) => handleLimit(l)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableComponent;
