import { communities } from '@/src/db/schema/'

export type InserCommunity = typeof communities.$inferInsert
export type SelectCommunity = typeof communities.$inferSelect
