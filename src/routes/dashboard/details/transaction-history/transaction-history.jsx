import { useGetPaymentByIdQuery } from "@/redux/api/payment-api"
import { SectionTypography as ContentTitle, Loading } from "@/utils";
import TransactionCard from "@/components/payment-card/payment-card";
import { useOutletContext } from "react-router-dom";
import {  useState } from "react";

const TransactionHistory = () => {
  const {data, isLoading} = useOutletContext();
  const [dateOpen, setDateOpen] = useState(false);
  console.log(data)

  return (
    <div>
      <ContentTitle>To'lov tarixi</ContentTitle>
      {
        isLoading ? <div className="w-full h-full min-h-[400px] flex justify-center items-center"><Loading/></div> :
        <div className="grid grid-cols-3 gap-4">
          {
            data?.innerData.map(payment => <TransactionCard key={payment._id} dateOpen={dateOpen} setDateOpen={setDateOpen} payment={payment} />)
          }
        </div> 
      }
    
    </div>
  )
}

export default TransactionHistory