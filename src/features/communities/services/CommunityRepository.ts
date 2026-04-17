import { db } from "@/src/db"
import { InserCommunity, SelectCommunity } from "../types/community.types"
import { communities } from "@/src/db/schema"

export interface ICommunityRepository {
    create(data: InserCommunity) : Promise<SelectCommunity>
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InserCommunity) {

     const [result ] =   await db.insert(communities).values(data).returning()
     return result 
    }
}

export const communityRepository = new CommunityRepository()