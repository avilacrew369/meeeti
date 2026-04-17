import LoginForm from "@/src/features/auth/components/LoginForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle('Iniciar Sesión')
}

export default function LoginPage() {
  return (
    <>
     <Heading >Iniciar Sesión</Heading>

      <LoginForm />
      <nav className="flex justify-between mt-20">
        <Link
          href={'/auth/create-account'}
          className="font-bold"
          >Crear Cuenta</Link>
        <Link
          href={'/auth/forgot-password'}
          className="font-bold"
          >Olvidé mi contraseña</Link>

      </nav>
    
    </>
  )
}