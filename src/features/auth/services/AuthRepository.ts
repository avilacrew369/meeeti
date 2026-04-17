import { db } from "@/src/db"
import { User } from "../types/auth.types"

export interface IAauthRepository {
    userExists(email: string): Promise<User | undefined>
}

class AuthRepository implements IAauthRepository {
    async userExists(email: string){
        return await db.query.users.findFirst({
            where: {
                email
            }
        })
        // Por ejemplo, podrías hacer una consulta a tu backend API para verificarlo
        // return await api.checkUserExists(email);
      
    }

}

export const authRepository = new AuthRepository()