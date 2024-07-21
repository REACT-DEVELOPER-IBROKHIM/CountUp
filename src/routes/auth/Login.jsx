import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useSignInMutation } from "@/redux/api/user-api";
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  username: z.string().min(4, {
    message: "Foydalanuvchi nomi kamida 4 ta belgidan iborat.",
  }),
  password: z.string().min(8, {
    message: "Parol kamida 8 ta belgidan iborat" }
  ).max(32, { 
    message: 
      "Parol ko'pi bilangi 32 ta belgidan iborat." 
  }),
})
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "@/redux/slices/auth-slice";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const dispatch = useDispatch();
  const [signInUser, {data, isError, isLoading, isSuccess, error}] = useSignInMutation();
  const loginForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const handleLoginFormSubmit = (data) => {
    signInUser(data)
  }

  useEffect(() => {
    if(isSuccess){
      dispatch(loginUser(data.innerData))
      toast({
        title: "Muvvafiqatli tizimga kirtingiz!"
      })
      navigate("/dashboard");
    }
  }, [isSuccess])

  return (
   <div className="w-full h-screen grid place-items-center">
    <div className="max-w-md w-full mx-auto border-2 border-gray-200 p-[16px] rounded-lg">
     <h1 className="text-3xl font-bold mb-4">Tizimga kirish</h1>
     <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleLoginFormSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foydalanuvchi nomi</FormLabel>
              <FormControl>
                <Input placeholder="Foydalanuvchi nomini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foydalanuvchi paroli</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Foydalanuvchi parolini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button  className="w-full" type="submit" disabled={isLoading}> 
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Tizimga kirish
          </Button>
        </div>
      </form>
    </Form>
    </div>
   </div>
  )
}

export default Login