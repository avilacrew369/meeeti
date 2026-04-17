import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: generatePageTitle('Crear Cuenta')
}

export default function RegisterPage() {
  return (
    <>
       <Heading >Crear Cuenta</Heading>
       <RegisterForm />
        <nav className="flex justify-between mt-20">
        <Link
          href={'/auth/login'}
          className="font-bold"
          >Iniciar Sesión</Link>
        <Link
          href={'/auth/forgot-password'}
          className="font-bold"
          >Olvidé mi contraseña</Link>

      </nav>
    </>
  )
}