"use client"

import { permission } from "process"
import { CommunityPermissions } from "../types/community.types"
import { useState } from "react"
import { toggleMembershipAction } from "../actions/membership-actions"
import toast from "react-hot-toast"

type Props = {
    permissions: CommunityPermissions
    communityId: string
}
export default function CommunityMemberShip({ permissions, communityId }: Props) {
    const [canJoin, setCanJoin] = useState(permissions.canJoin)
    const [canLeave, setCanLeave] = useState(permissions.canLeave)

    const handleClick = async () => {
        const result = await toggleMembershipAction(communityId)

        if (result?.success) {
            toast.success(result.message)
            setCanJoin(result.newPermissions.canJoin)

        }
    }

    return (
        <>


            <button
                className={` ${canJoin ? 'bg-orange-400' : 'bg-red-400'} font-bold text-lg w-fulL Lg:w-auto px-5 py-2 text-white cursor-pointer  `}
                onClick={handleClick}
            > {canJoin ? 'Inscribirme a esta Comunidad' : 'Abandonar esta Comunidad'} </button >
    </>
  )
}
