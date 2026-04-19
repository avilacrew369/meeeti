"use server"
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { requireAuth } from "@/src/lib/auth-server";
import { communityService } from "../services/CommunityService";
import { succeed } from "effect/Config";
import { error } from "console";


export async function createCommunityAction(input: CommunityInput) {
    const data = CommunitySchema.safeParse(input)
    const { session } = await requireAuth()
    if (!session) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    await communityService.createCommunity(data.data, session.user.id)

    return {
        error: '',
        success: 'Communidad creada correctamente'
    }
}

export async function editCommunityAction(input: CommunityInput, id: string) {
    const { session } = await requireAuth()
    if (!session) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const data = CommunitySchema.safeParse(input)
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    await communityService.updateCommunity(data.data, id, session.user)

    return {
        success: 'Comunidad actualizada correctamente',
        error: ''
    }


}