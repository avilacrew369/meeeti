import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";

export class MembershipPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean) : boolean {
        if(isMember) return false

        // el admin no se puede unir
        if(community.creteBy === user.id) return false

        return true
    }
    static canLeave(user: User, community: SelectCommunity, isMember: boolean) : boolean {
        // el ouner no puede salir
        if(community.creteBy === user.id) return false

        return isMember
    }
}