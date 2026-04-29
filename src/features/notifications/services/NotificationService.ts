import { no } from "zod/locales";
import { InsertNotification, SelectNotification } from "../types/notifications.types";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";
import { INotificationPublisher, notificationPusher } from "./NotificationPusher";

export interface INotificationService {
    createAndNotify(data: InsertNotification) : Promise<void>
    getUreadCount(userId: string) : Promise<number> 
    getUserNotifications(userId: string) : Promise<SelectNotification[]>
    clearNotifications(userId: string) : Promise<void>
}




class NotificationService implements INotificationService  {
    constructor(
        private notifacationRepository: INotificationRepository,
        private notificationPusher: INotificationPublisher
    ) {}

    async createAndNotify(data: InsertNotification) {
            const notification = await this.notifacationRepository.create(data)
            await this.notificationPusher.notify(notification)

    }

    async getUreadCount(userId: string) : Promise<number> {
       return await this.notifacationRepository.getUnreadCount(userId)
    
    }

    async getUserNotifications(userId: string) : Promise<SelectNotification[]>{
        return await  this.notifacationRepository.findByUserId(userId)

    }

    async clearNotifications(userId: string) : Promise<void> {
        return await this.notifacationRepository.delete(userId)
    }



}

export const notificationServise  = new NotificationService(
    notificationRepository,
    notificationPusher);