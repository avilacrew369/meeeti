import { db } from "@/src/db"
import { InserCommunity, SelectCommunity } from "../types/community.types"
import { communities, } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export interface ICommunityRepository {
    create(data: InserCommunity) : Promise<SelectCommunity>
    findByUser(userId: string, limit?: number) : Promise<SelectCommunity[]>
    findById(communityId: string) : Promise<SelectCommunity | undefined>
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InserCommunity) {

     const [result ] =   await db.insert(communities).values(data).returning()
     return result 
    }
    async findByUser(userId: string, limit=10): Promise<SelectCommunity[]> {
        const community = await db
                                    .select()
                                    .from(communities)
                                    .where(eq(communities.creteBy, userId) )
                                    .limit(limit)
        return community
    }
    async findById(communityId: string): Promise<SelectCommunity | undefined> {
        const [result] = await db
                    .select()
                    .from(communities)
                    .where(eq(communities.id, communityId))
                    .limit(1)
        return result
    }
    
    
}

export const communityRepository = new CommunityRepository()