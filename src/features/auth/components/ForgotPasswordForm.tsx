"use client";
import { useForm } from "react-hook-form";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordInput, ForgotPasswordSchema } from "../schemas/authSchema";
import { forgotPasswordAction } from "../actions/auth-actions";
import toast from "react-hot-toast";


export default function ForgotPasswordForm() {
  const {  register, handleSubmit, formState: {errors}}= useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'all'
  })
  const onSubmit = async (data: ForgotPasswordInput) => {
    const {error, success } = await forgotPasswordAction(data)
    if(error) {
      toast.error(error)
    }
    if(success){
      toast.success(success)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}  >

        <FormLabel htmlFor="email"> E-mail</FormLabel>
        <FormInput 
                id="email" 
                type="email" 
                placeholder="Ingresa tu E-mail" required 
                {...register('email')}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        
        <FormSubmit value={'Enviar Instrucciones'}/>
    </Form>
  )
}
