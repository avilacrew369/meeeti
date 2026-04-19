import { communities } from '@/src/db/schema/'

export type InserCommunity = typeof communities.$inferInsert
export type SelectCommunity = typeof communities.$inferSelect

export type CommunityPermissions = {
    canEdit: boolean
    canDelete: boolean
    canJoin: boolean
    canLeave: boolean
    canViewMembers: boolean

}
export type CommunityContext = {
    isAdmin: boolean
    isMember: boolean
}
export type CommunityWithPermissios = {
    data: SelectCommunity
    context: CommunityContext
    permissions: CommunityPermissions
}