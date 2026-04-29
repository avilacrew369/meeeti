import { User } from "better-auth";
import { IMenbershipRepository, membershipRepository } from "./MembershipRepository";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { INotificationService, notificationServise } from "../../notifications/services/NotificationService";


class MembershipService {
    constructor(
        private membershipRepository: IMenbershipRepository,
        private communityRepository: ICommunityRepository,
        private notificationService: INotificationService
    ) { }

    async toggleMembership(communityId: string, user: User) {
        // revisar si la comunidad existe
        const community = await this.communityRepository.findById(communityId)
        if (!community) return
        const isMember = await this.membershipRepository.isMember(communityId, user.id)

        //si puede unirse
        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id)

            await this.notificationService.createAndNotify({
                userId: community.creteBy,
                actorName: user.name,
                message: 'Se unio a comunidad',
                target: community.name,
               
            })

            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true
                }
            }

        }


        // si puede salirse de la comunidad
        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id)

            return {
                success: true,
                message: `Has abandonado la comunidad ${community.name}`,
                  newPermissions: {
                    canJoin: true,
                    canLeave: false
                }
            }
        }

    }

    async getJoinedCommunities(user: User) {
       const joined = await this.membershipRepository.findJoinedCommunities(user.id)
        const enriched = await Promise.all(joined.map(async ({community}) => {
                   const isMember = true
                   const isAdmin = CommunityPolicy.isAdmin(user, community)
                   const memberCount = await this.membershipRepository.getMemberCount(community.id)
                   return {
                       data: community,
                       memberCount,
                       context: {
                           isMember,
                           isAdmin
                       },
                       permissions: {
                           canEdit: CommunityPolicy.canEdit(user, community),
                           canDelete: CommunityPolicy.canDelete(user, community),
                           canJoin: MembershipPolicy.canJoin(user, community, isMember),
                           canLeave: MembershipPolicy.canLeave(user, community, isMember),
                           canViewMembers: CommunityPolicy.canViewMembers(user, community)
       
                       }
                   }
               }))
               return enriched
    }
}

export const membershipService = new MembershipService(
                    membershipRepository, 
                    communityRepository, 
                    notificationServise )