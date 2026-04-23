import { db } from "@/src/db"
import { communityMembers } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"
import { JoinedCommunity } from "../types/community.types"

export interface IMenbershipRepository {
    addMember(communityId: string, userId: string) : Promise<void>
    removeMember(communityId: string, userId: string) : Promise<void>
    isMember(communityId: string, userId: string) : Promise<boolean>
    findJoinedCommunities(iserId : string) : Promise <JoinedCommunity[]>
}

class MembershipRepository implements IMenbershipRepository{
   async addMember(communityId: string, userId: string): Promise<void> {
       await db.insert(communityMembers).values({
        communityId,
        userId
       })
   }
   async removeMember(communityId: string, userId: string): Promise<void> {
       await db
            .delete(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId),

                )
            )
   }
    async isMember(communityId: string, userId: string) {
       const [result] = await db  
                            .select()
                            .from(communityMembers)
                            .where(
                                and(
                                    eq(communityMembers.communityId, communityId),
                                    eq(communityMembers.userId, userId)
                                )
                            ).limit(1)

        return !!result
   }

   async findJoinedCommunities(userId: string) {
       const result = await db
                    .query.communityMembers.findMany({
                        where: {
                            userId
                        },
                        with: {
                            community: true,
                            user: true
                        }
                    })
          return result          
   }
}

export const membershipRepository = new MembershipRepository()