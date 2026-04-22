"use client"

import { permission } from "process"
import { CommunityPermissions } from "../types/community.types"
import { useState } from "react"
import { toggleMembershipAction } from "../actions/membership-actions"

type Props = {
    permissions: CommunityPermissions
    communityId: string
}
export default function CommunityMemberShip({permissions, communityId}: Props) {
    const [canJoin, setCanJoin] = useState(permissions.canJoin)
    const [canLeave, setCanLeave] = useState(permissions.canLeave)

    const handleClick = async () => {
        await toggleMembershipAction(communityId)
    }

  return (
    <>
        {canJoin && (
            <button
            className="fond-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600" 
            onClick={handleClick}
            >Inscribirme a esta Comunidad</button>
        )}
        {canLeave && (

            <button
            className="fond-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
            onClick={handleClick}

            >Abandonar esta Comunidad</button>
        )}
    </>
  )
}
