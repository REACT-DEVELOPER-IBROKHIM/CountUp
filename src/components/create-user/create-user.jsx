import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { memo, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { PatternFormat } from "react-number-format";
import { useCreateSellerMutation } from "@/redux/api/seller-api";
import { useCreateCustomerMutation } from "@/redux/api/customers-api";

const userFormSchema = z.object({
  fname: z.string({
    message: "Ism kiritilmadi",
  }),
  lname: z.string().optional(),
  phone_primary: z.string({
    message: "Telefon raqam kiritilmadi.",
  }),
  //   .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? "")),
  phone_secondary: z.string().optional(),
  address: z.string({
    message: "Manzil kiritilmadi.",
  }),
  budget: z.number().optional(),
});

const CreateUser = ({ userType, setOpen }) => {
  const [createCustomer, {isLoading: customerLoading, isSuccess: customerSuccess}] = useCreateCustomerMutation()
  const [createSeller, {isLoading: sellerLoading, isSuccess: sellerSuccess}] = useCreateSellerMutation()
  const { toast } = useToast();
  const userForm = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      phone_primary: "",
      phone_secondary: "",
      address: "",
      budget: 0,
    },
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    switch(userType) {
        case "customers":
            createCustomer(userForm.getValues())
            break;
        case "sellers":
            createSeller(userForm.getValues())
            break;
    }
  };

  useEffect(
    () => {
      if(customerSuccess || sellerSuccess) {
          setOpen(false)
          userForm.reset()
          toast({
              title: "Muvvafiqatli qo'shildi!"
          })
      }
    },
    [customerSuccess, sellerSuccess]
  );

  return (
    <Form {...userForm}>
      <form className="" onSubmit={handleCreateUser}>
        <div className="grid grid-cols-2 mb-3 gap-3">
          <FormField
            control={userForm.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ism</FormLabel>
                <FormControl>
                  <Input placeholder="Ism" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Familya</FormLabel>
                <FormControl>
                  <Input placeholder="Familya" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="phone_primary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="Telefon" {...field} />
                  {/* <input type="text" /> */}
                  {/* <PatternFormat format="+998 ## ### ## ##" allowEmptyFormatting mask="_"  />; */}
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="phone_secondary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ikkinchi telefon</FormLabel>
                <FormControl>
                  <Input placeholder="Telefon" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manzil</FormLabel>
                <FormControl>
                  <Input placeholder="Manzil" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balans</FormLabel>
                <FormControl>
                  <Input placeholder="Balans" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={customerLoading|| sellerLoading}
        >
          {(customerLoading || sellerLoading )&& <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            } 
          Ro'yhatga olish 
        </Button>
      </form>
    </Form>
  );
};

export default memo(CreateUser);
