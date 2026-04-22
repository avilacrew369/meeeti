import { User } from "better-auth";


class MembershipService {

    async toggleMembership(communityId: string, user: User){
        console.log('Service --------------')
    }
}

export const membershipService = new MembershipService