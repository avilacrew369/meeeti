"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormError, FormInput,  FormLabel, FormSubmit} from '@/components/forms'
import { SignInInput, SignInSchema } from '../schemas/authSchema';
import { signInAction } from '../actions/auth-actions';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';


export default function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
  })

 const onSubmit = async (data: SignInInput) => {
    const { error, success } = await signInAction(data)
      if(error) {
       toast.error(error)
      }
      if(success) {
        toast.success(success)
        redirect('/dashboard')
  }
}

  return (
    <Form  
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel htmlFor="mail"> E-mail</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu E-mail"
        {...register('email')}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}


      <FormLabel htmlFor="password"> Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu Password"
        {...register('password')}
      />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <FormSubmit value="Iniciar Sesión"/>
    </Form>
  )
}

