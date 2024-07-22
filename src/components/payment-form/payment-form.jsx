import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { memo, useEffect } from "react";
import { usePaymentForCustomerMutation } from "@/redux/api/customers-api";
import { useExpenseForSellersMutation } from "@/redux/api/seller-api";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"


const paymentFormSchema = z.object({
    amount: z.number({
      message: "Miqdor to'g'ri kiritilmadi.",
    }).min(1, {
      message: "Miqdor kamida 1 ta belgidan iborat.",
    }),
    comment: z.string().optional()
  })

const PaymentForm = ({user, userType, setOpen}) => {
    const { toast } = useToast()
    const [paymentForCustomer, { isLoading: paymentLoading, isSuccess: paymentSuccess }] = usePaymentForCustomerMutation();
    const [expenseForSeller, { isLoading: expenseLoading, isSuccess: expenseSuccess }] = useExpenseForSellersMutation();
    const paymentForm = useForm({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
          amount: "",
          comment: ""
        }
    })

    const handleUserPaymentOrExpense = (e) => {
        e.preventDefault();

        switch(userType) {
            case "customers":
                paymentForCustomer({ body: {...paymentForm.getValues(), customerId: user._id}})
                break;
            case "sellers":
                expenseForSeller({ body: {...paymentForm.getValues(), sellerId: user._id}})
                break;
        }
    }

    useEffect(() => {
        if(paymentSuccess || expenseSuccess) {
            setOpen(false)
            paymentForm.reset()
            toast({
                title: "Muvvafiqatli to'lov amalga oshirildi!"
            })
        }
    }, [paymentSuccess, expenseSuccess])

  return (
    <Form {...paymentForm}>
       <form className="space-y-4" onSubmit={handleUserPaymentOrExpense}>
        <FormField
            control={paymentForm.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Miqdor</FormLabel>
                <FormControl>
                    <Input
                    placeholder="Miqdor"
                    {...field}
                    />
                </FormControl>
                </FormItem>
            )}
            />

            <FormField
            control={paymentForm.control}
            name="comment"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Qo'shimcha</FormLabel>
                <FormControl>
                    <Textarea
                    className="resize-none"
                    placeholder="Izoh"
                    {...field}
                    />
                </FormControl>
                </FormItem>
            )}
            />

           
            <Button className="w-full" type="submit" disabled={paymentLoading} > 
            {paymentLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} 
                To'lov qilish
            </Button>
 
       </form>
    </Form>
  )
}

export default memo(PaymentForm)