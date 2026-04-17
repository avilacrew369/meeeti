import { auth } from "@/src/lib/auth"
import { ForgotPasswordInput, SetPasswordInput, SignInInput, SignUpInput } from "../schemas/authSchema"
import { APIError, success } from "better-auth"
import { authRepository, IAauthRepository } from "./AuthRepository"
import { headers } from "next/headers"

class AuthService {

    constructor(
        private authRepository : IAauthRepository
    ){}

    async register(credentials: SignUpInput) {

        // Implementation for user registration
        const { name, email, password } = credentials
        
        // Existe usuario con ese email
       const user =await this.authRepository.userExists(email)
         if(user) {
            return {
                error: "El email ya está registrado",
                success: " "
            }
         }
        // Manejar el registro del usuario
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: '/dashboard'
            },
             headers: await headers()
        })
     return {
        error: '',
        success: "Cuenta creada correctamente, revisa tu correo."
     }
    }
    async login(credentials: SignInInput) {
           const { email, password } = credentials
        
        // Existe usuario con ese email
       const user =await this.authRepository.userExists(email)
         if(!user) {
            return {
                error: "El email no está registrado",
                success: " "
            }
         }
         // Validar contraseña y si confirmo su cuenta
         try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: '/dashboard'
                },
                headers: await headers()
            })
            return {
                error: '',
                success: 'Sesion iniciadea correctamente'
            }
         }
         catch(error){
            if(error instanceof APIError) {
                const messages : Record<number, string> = {
                    401: 'Password Incorrecto',
                    403: 'Tu cuenta no ha sido confirmada revisa tu email'
                }
                const errorMessage = messages[error.statusCode]
                if(errorMessage){
                    return {
                        error: errorMessage,
                        success: ''
                    }
                }
            }

        }
         // Validar contraseña
         return {
            error: "",
            success: ""
         }

}
    async requestPasswordReset(input: ForgotPasswordInput) {
        const user = await this.authRepository.userExists(input.email)
        if(!user){
            return {
                error: 'El usuario no existe...',
                success: ''
            }
        }
        const { email } = input
        await auth.api.requestPasswordReset({
            body: {
                email
            }
        })
        return {
            error: '',
            success: 'Hemos enviado un email con instrucciones'
        }

    }
    async confirmPasswordReset(input: SetPasswordInput, token: string) {
        const { newPassword } = input
        try {
            await auth.api.resetPassword({
                body: {
                    newPassword,
                    token
                }
            })
            return {
                error: '',
                success: 'Password restablecido corectamente.'

            }
        } catch (error) {
            if(error instanceof APIError) {
                return {
                    error: 'Token no valido o Expirado',
                    success: ''
                }
            }
        }
        return {
            error: '',
            success: ''
        }
    }
}

export const authService = new AuthService(authRepository)