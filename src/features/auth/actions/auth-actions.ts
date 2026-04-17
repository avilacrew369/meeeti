"use server"

import { error } from "console"
import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SignInInput, SignInSchema, SignUpInput, SignUpSchema,  } from "../schemas/authSchema"
import { success } from "zod"
import { authService } from "../services/AuthService"
import { da } from "zod/locales"
import { sign } from "crypto"

export async function signUpAction(input: SignUpInput){
    const data = SignUpSchema.safeParse(input)

    if(!data.success) {
        return  {
            error: "Error en la validación de los datos",
            success: " "
        }
    }
    const response = await authService.register(data.data)
    return response
}

export async function signInAction(input: SignInInput){
   
    const data = SignInSchema.safeParse(input)
    if(!data.success) {
        return {
            error: "Error en la validación de los datos",
            success: " "
        }
    }
    const response = await authService.login(data.data)
    return response
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
    const data = ForgotPasswordSchema.safeParse(input)
    if(!data.success) {
        return{
            error: 'hubo un error...',
            success: ''
        }
    }
    const response = await authService.requestPasswordReset(data.data)
    return response

}

export async function setPasswordAction(input: SetPasswordInput, token: string) {
    const data = SetPasswordSchema.safeParse(input)
    if(!data.success){
        return {
            error: 'Hubo un Error',
            success: ''
        }
    }
    const response = await authService.confirmPasswordReset(data.data, token)
    return response
}