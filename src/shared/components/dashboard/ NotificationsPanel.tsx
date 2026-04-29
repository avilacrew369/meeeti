import { Suspense, use, useEffect, useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { useSession } from '@/src/lib/auth-client'
import { SelectNotification } from '@/src/features/notifications/types/notifications.types'
import { cons } from 'effect/List'

const notificationPromise = fetch('http://localhost:3000/api/user/notifications').then(res  => res.json())

function NotificationCount() {

  const unreadNotifications : number = use(notificationPromise)

  const [totalNotifications, setTotalNotifications] = useState(unreadNotifications)



  const { data } = useSession()


  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })
    const id = `notification-chanel-${data?.user.id}`
    const channel = pusher.subscribe(id)
    channel.bind('new-notification', (notification: SelectNotification) =>{
       setTotalNotifications((prev) => prev + 1 )
    })
      
  },[data])

  
  return (
    <Link
      href={'/dashboard/notifications'}
      className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon aria-hidden="true" className="size-6" />
      {totalNotifications > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white p-2">
          {totalNotifications}
        </span>
      )}
    </Link>
  )
}

export default function NotificationsPanel() {
  return (
    <Suspense fallback="...loading notifications"  >
      <NotificationCount />
    </Suspense>
  )
}