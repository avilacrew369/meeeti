import ForgotPasswordForm from '@/src/features/auth/components/ForgotPasswordForm'
import Heading from '@/src/shared/components/typography/Heading'
import { generatePageTitle } from '@/src/shared/utils/metadata'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: generatePageTitle('Restablecer Password')
}

export default function ForgotPasswordPage() {
  return (
    <>
    <Heading >Recupera tu acceso a Meeti</Heading>

    <ForgotPasswordForm />
     <nav className="flex justify-between mt-20">
        <Link
          href={'/auth/login'}
          className="font-bold"
          >Iniciar Sesión</Link>
        <Link
          href={'/auth/create-account'}
          className="font-bold"
          >Crear Cuenta</Link>

      </nav>
    
    </>
  )
}
