import { User } from "better-auth";
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";

class CommunityService {
    constructor (
        private communityRepository: ICommunityRepository

    ){}
    async createCommunity(data : CommunityInput, userId: string) {
        const community = await this.communityRepository.create({
           ...data,
           creteBy: userId
        })
        return community
    }
     async getUserCommunity(user: User) {

        const communities = await this.communityRepository.findByUser(user.id, 10)
    }

}

export const communityService = new CommunityService(communityRepository)