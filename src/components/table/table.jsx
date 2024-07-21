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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pin, PinOff } from "lucide-react";
import { Loading } from "@/utils";
import { Fragment } from "react";
import {usePinCustomerMutation} from "@/redux/api/customers-api"

function TableComponent({ data, tableHeaders, isLoading }) {
  const [pinUser, {isLoading: pinLoading, error}] = usePinCustomerMutation();

  const handlePinCustomer = (customer) => {
    pinUser({body: customer, _id: customer._id})
  }
  return (
    <Table className="w-full shadow">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>{tableHeaders}</TableRow>
      </TableHeader>
      <TableBody className="relative">
        {
        data?.innerData.map((customer, index) => (
          <Fragment key={customer._id}>
            <TableRow >
            <TableCell className="font-medium ">{index + 1}</TableCell>
            <TableCell>
              <p>{customer.fname + " " + customer.lname}</p>
              <p className="text-sm text-slate-500">{customer.address}</p>
            </TableCell>
            <TableCell>{customer.phone_primary}</TableCell>
            <TableCell>{customer?.budget.fprice()}</TableCell>
            <TableCell className="text-right flex items-center justify-end gap-2">
            <div className="p-2 cursor-pointer active:bg-slate-100 rounded-full" onClick={() =>handlePinCustomer(customer)}>
               {customer.pin ? <PinOff size={18} className="rotate-[30deg]" /> : <Pin  size={18} className="rotate-[30deg]" /> 
                }
              </div>
              <div className="p-2 cursor-pointer active:bg-slate-100 rounded-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <EllipsisVertical />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-md cursor-pointer">Tahrirlash</DropdownMenuItem>
                    <DropdownMenuItem className="text-md cursor-pointer">Arxivlash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button>To'lov</Button>
            </TableCell>
          </TableRow>
          
          </Fragment>
           
        ))}
        <>
            {
            true || pinLoading ? <div className="h-full w-full bg-[#ffffffa2] backdrop-blur-[3px] absolute top-0 left-0">
           <div className="w-full min-h-[500px] flex items-center justify-center fixed bg-red-400">
            <Loading/>
           </div>
           </div>
           : null
          }
          </>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableComponent;
