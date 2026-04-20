import Link from "next/link"
import { CommunityPermissions } from "../types/community.types"

type Props = {
    permissions: CommunityPermissions
    communityId: string
}


export default function CommunityActionsPanel({permissions, communityId }: Props) {
  return (
    <div className="flex justify-end">

        {permissions.canEdit && (
            <Link
                href={`/dashboard/communities/${communityId}/edit`}
                className="font-bold text-lg bg-orange-600 px-5 py-2 text-white"
                target="-blanc"
            >Editar Comunidad
            
            </Link>
        )}

    </div>
  )
}
