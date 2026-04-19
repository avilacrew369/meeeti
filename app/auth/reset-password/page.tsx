import SetPasswordForm from '@/src/features/auth/components/SetPasswordForm'
import Heading from '@/src/shared/components/typography/Heading'
import { generatePageTitle } from '@/src/shared/utils/metadata'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: generatePageTitle('Definir Nuevo Password')
}

export default function ForgotPasswordPage() {
  return (
    <>
    <Heading >Definir Nuevo Password</Heading>
    <Suspense fallback={<p className="text-muted-foreground">Cargando…</p>}>
      <SetPasswordForm />
    </Suspense>

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
