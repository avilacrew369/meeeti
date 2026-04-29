import { pusher }  from "@/lib/pusher"
import { SelectNotification } from "../types/notifications.types";


export interface INotificationPublisher {
    notify(notification: SelectNotification) : Promise<void>
}

class NotificationPusher implements  INotificationPublisher  {
    async notify(notification: SelectNotification): Promise<void> {
        await pusher.trigger(
            `notifications-chanel-${notification.userId}`,
            'new-notifications',
            notification
        )
    }

}

export const notificationPusher = new NotificationPusher()