import { Card, CardContent } from "@/components/ui/card";
import Dropdown from "../dropdown/dropdown";
import { EllipsisIcon } from "lucide-react";

const PaymentCard = ({ payment, dateOpen, setDateOpen }) => {
  return (
    <Card>
      <CardContent className="pt-4 pb-2 flex justify-between items-center gap-3">
        <div>
          <div className="text-2xl font-bold">{payment.amount.fprice()}</div>
          <p className="text-s text-muted-foreground">
            {payment.adminId.fname + " " + payment.adminId.lname}
          </p>
         {payment.comment.trim() && <p className="text-xs text-slate-700 mt-2">{payment.comment}</p>}
        </div>
        <div
          className="relative flex flex-col items-end gap-6"
          
        >
        <Dropdown
            trigger={<EllipsisIcon />}
            data={payment}
            menuitems={["Tahrirlash", "O'chirish"]}
            menuactions={[]}
          />
          <div onClick={() => setDateOpen(!dateOpen)} className="text-s text-slate-700 relative z-[2] bg-white padding-1 cursor-pointer select-none whitespace-nowrap">
            {payment.createdAt.formatDate().date}
          </div>
          <p
            className={`absolute w-full text-right z-[1] ${
              dateOpen ? "top-[40px] opacity-100" : "top-[50px] opacity-0"
            } transition-all`}
          >
            {payment.createdAt.formatDate().time}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
